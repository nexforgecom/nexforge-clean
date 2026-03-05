'use client';

import { useState, useEffect } from 'react';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import TrendingSection from '@/components/TrendingSection';
import NewLaunchesSection from '@/components/NewLaunchesSection';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trending' | 'new'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<'5m' | '1h' | '6h' | '24h'>('24h');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('memeFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('memeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pairAddress: string) => {
    setFavorites((prev) =>
      prev.includes(pairAddress)
        ? prev.filter((addr) => addr !== pairAddress)
        : [...prev, pairAddress]
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-950 text-white">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
        Base Meme Radar
      </h1>
      <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
        Wallet dashboard + real-time meme scanner on Base
      </p>

      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-16">
          <ConnectWalletButton />
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari token (symbol, name, atau address)..."
            className="w-full p-4 bg-gray-800 border border-cyan-500/50 rounded-xl text-white focus:outline-none focus:border-cyan-400 placeholder-gray-500"
          />
        </div>

        {/* Tab + Timeframe Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeTab === 'trending' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeTab === 'new' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              New Launches
            </button>
          </div>

          {activeTab === 'trending' && (
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as '5m' | '1h' | '6h' | '24h')}
              className="bg-gray-800 border border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:outline-none"
            >
              <option value="5m">5 Menit</option>
              <option value="1h">1 Jam</option>
              <option value="6h">6 Jam</option>
              <option value="24h">24 Jam</option>
            </select>
          )}
        </div>

        {/* Konten Tab */}
        {activeTab === 'trending' && (
          <TrendingSection 
            searchQuery={searchQuery} 
            timeframe={timeframe} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
          />
        )}
        {activeTab === 'new' && (
          <NewLaunchesSection 
            searchQuery={searchQuery} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
          />
        )}
      </div>
    </main>
  );
          }
