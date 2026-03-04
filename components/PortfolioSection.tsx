'use client';

import { useAccount, useBalance, useToken } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { LineChart, Line, ResponsiveContainer } from 'recharts'; // Import dari recharts

interface TokenHolding {
  address: `0x${string}`;
  symbol: string;
  balance: string;
  usdValue: number;
  priceHistory: { time: number; price: number }[]; // Untuk sparkline
}

export default function PortfolioSection() {
  const { address, isConnected } = useAccount();
  const [holdings, setHoldings] = useState<TokenHolding[]>([]);
  const [loading, setLoading] = useState(false);

  // Native ETH balance
  const { data: ethBalance } = useBalance({ address, chainId: 8453 }); // Base chainId

  useEffect(() => {
    if (!isConnected || !address) return;

    const fetchHoldings = async () => {
      setLoading(true);
      try {
        // Contoh token populer di Base (tambah lebih banyak atau fetch dynamic via API seperti Alchemy/Zapper)
        const tokens = [
          { address: '0x4200000000000000000000000000000000000006' as `0x${string}`, symbol: 'WETH' }, // WETH di Base
          // Tambah meme contoh: { address: '0x...meme_ca', symbol: 'MEME' },
        ];

        const promises = tokens.map(async (token) => {
          const { data: tokenData } = useToken({ address: token.address });
          const { data: balance } = useBalance({ address, token: token.address });

          // Fetch price & history dummy (real: integrate Coingecko API atau DexScreener)
          const usdValue = 0; // Placeholder, fetch real via API
          const priceHistory = Array.from({ length: 30 }, (_, i) => ({ time: i, price: Math.random() * 100 })); // Dummy sparkline

          return {
            address: token.address,
            symbol: tokenData?.symbol || token.symbol,
            balance: balance ? formatEther(balance.value) : '0',
            usdValue,
            priceHistory,
          };
        });

        const results = await Promise.all(promises);
        setHoldings(results.filter((h) => Number(h.balance) > 0));
      } catch (err) {
        console.error('Error fetching holdings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [isConnected, address]);

  if (!isConnected) return null;
  if (loading) return <p className="text-center text-gray-500 mt-8">Loading portfolio...</p>;

  return (
    <div className="mt-16 w-full">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Your Portfolio on Base</h2>
      <div className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20">
        <div className="flex justify-between mb-4">
          <span className="text-lg font-medium">Native ETH</span>
          <span className="text-teal-300">{ethBalance ? formatEther(ethBalance.value) : '0'} ETH</span>
        </div>
        {holdings.map((holding, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full" /> {/* Token logo placeholder */}
              <span className="font-medium">{holding.symbol}</span>
            </div>
            <div className="text-right">
              <p className="text-teal-300">{holding.balance}</p>
              <p className="text-sm text-gray-400">${holding.usdValue.toFixed(2)} USD</p>
            </div>
            <div className="w-24 h-12 ml-4">
              <ResponsiveContainer>
                <LineChart data={holding.priceHistory}>
                  <Line type="monotone" dataKey="price" stroke="#00f5d4" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
        {holdings.length === 0 && <p className="text-center text-gray-500">No tokens held yet.</p>}
      </div>
    </div>
  );
        }
