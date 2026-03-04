'use client';

import { useState } from 'react';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import TrendingSection from '@/components/TrendingSection';
import NewLaunchesSection from '@/components/NewLaunchesSection';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trending' | 'new'>('trending');

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

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'trending' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Trending Now
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'new' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            New Launches
          </button>
        </div>

        {activeTab === 'trending' && <TrendingSection />}
        {activeTab === 'new' && <NewLaunchesSection />}
      </div>
    </main>
  );
}
