'use client';

import { useEffect, useState } from 'react';

interface Pair {
  baseToken: { symbol: string };
  priceUsd: string;
  volume: { h24: number };
  priceChange: { h24: number };
  dexId: string;
  pairAddress: string;
}

export default function TrendingSection() {
  const [trending, setTrending] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://api.dexscreener.com/latest/dex/search?q=base');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const pairs = data.pairs
          ?.filter((p: any) => p.chainId === 'base' && p.volume?.h24 > 50000)
          ?.sort((a: any, b: any) => b.volume.h24 - a.volume.h24)
          ?.slice(0, 6) || [];
        setTrending(pairs);
      } catch (err) {
        setError('Failed to load trending data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (loading) return <p className="text-center text-gray-500">Loading trending memes...</p>;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Trending Memes on Base</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map((pair, i) => (
          <div
            key={i}
            className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20 hover:border-teal-400 hover:shadow-cyan-500/10 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-teal-300">{pair.baseToken.symbol}</h3>
              <span className="text-xs text-gray-500">{pair.dexId}</span>
            </div>
            <p className="text-2xl font-semibold text-white mb-2">
              ${Number(pair.priceUsd).toFixed(6)}
            </p>
            <p className={`text-lg font-medium ${pair.priceChange.h24 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {pair.priceChange.h24 >= 0 ? '+' : ''}{pair.priceChange.h24.toFixed(2)}% (24h)
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Vol 24h: ${Math.round(pair.volume.h24 / 1000).toLocaleString()}k
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
      {trending.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No trending pairs with sufficient volume right now.</p>
      )}
    </div>
  );
                  }
