'use client';

import { useEffect, useState } from 'react';

interface Pair {
  baseToken: { symbol: string; address: string; name?: string };
  quoteToken: { symbol: string; address: string; name?: string };
  priceUsd: string;
  volume: { h24: number };
  priceChange: { h24: number };
  pairAddress: string;
  age: number;
}

interface NewLaunchesProps {
  searchQuery: string;
  favorites: string[];
  toggleFavorite: (pairAddress: string) => void;
}

export default function NewLaunchesSection({ searchQuery, favorites, toggleFavorite }: NewLaunchesProps) {
  const [newPairs, setNewPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNew = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://api.dexscreener.com/latest/dex/search?q=base');
        if (!res.ok) throw new Error('DexScreener fetch failed');
        const data = await res.json();

        let pairs = data.pairs
          ?.filter((p: any) => p.chainId === 'base' && (p.age || 0) < 3600)
          ?.sort((a: any, b: any) => b.volume.h24 - a.volume.h24) || [];

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          pairs = pairs.filter((p: any) =>
            p.baseToken.symbol?.toLowerCase().includes(query) ||
            p.quoteToken.symbol?.toLowerCase().includes(query) ||
            p.baseToken.address.toLowerCase().includes(query)
          );
        }

        pairs = pairs.map((p: any) => ({
          ...p,
          baseToken: {
            ...p.baseToken,
            symbol: p.baseToken.symbol || p.quoteToken.symbol || p.baseToken.name || p.quoteToken.name || p.baseToken.address.slice(0, 6) + '...' || 'UNKNOWN',
          },
        }));

        setNewPairs(pairs.slice(0, 12));
      } catch (err) {
        setError('Gagal load new launches');
      } finally {
        setLoading(false);
      }
    };

    fetchNew();
    const interval = setInterval(fetchNew, 60000);
    return () => clearInterval(interval);
  }, [searchQuery]);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">New Launches on Base</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newPairs.map((pair, i) => (
          <div
            key={i}
            className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20 hover:border-teal-400 transition-all relative"
          >
            <button
              onClick={() => toggleFavorite(pair.pairAddress)}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 text-2xl"
            >
              {favorites.includes(pair.pairAddress) ? '★' : '☆'}
            </button>
            <h3 className="text-xl font-bold text-teal-300">{pair.baseToken.symbol}</h3>
            <p className="text-2xl font-semibold text-white mt-2">
              ${Number(pair.priceUsd).toFixed(6)}
            </p>
            <p className={`text-lg ${pair.priceChange.h24 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {pair.priceChange.h24 >= 0 ? '+' : ''}{pair.priceChange.h24.toFixed(2)}% (24h)
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Age: {Math.round(pair.age / 60)} min ago
            </p>
            <a
              href={`https://dexscreener.com/base/${pair.pairAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View on DexScreener →
            </a>
          </div>
        ))}
      </div>
      {newPairs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Tidak ada launch baru saat ini. Coba refresh atau tunggu aktivitas tinggi!</p>
      )}
    </div>
  );
                   }
