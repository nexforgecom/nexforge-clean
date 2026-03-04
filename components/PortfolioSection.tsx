'use client';

import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';

interface TokenHolding {
  symbol: string;
  balance: string;
  usdValue: number;
}

export default function PortfolioSection() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address, chainId: 8453 });
  const [holdings, setHoldings] = useState<TokenHolding[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) return;

    const fetchHoldings = async () => {
      setLoading(true);
      try {
        const tokens = [
          { address: '0x4200000000000000000000000000000000000006' as `0x${string}`, symbol: 'WETH' },
        ];

        const results: TokenHolding[] = [];

        for (const token of tokens) {
          const balance = '0';
          const usdValue = 0;

          if (Number(balance) > 0) {
            results.push({
              symbol: token.symbol,
              balance,
              usdValue,
            });
          }
        }

        setHoldings(results);
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

  const hasNoHoldings =
    holdings.length === 0 &&
    (!ethBalance || ethBalance.value === BigInt(0));

  return (
    <div className="mt-16 w-full">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Your Portfolio on Base</h2>
      <div className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20">
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full" />
            <span className="font-medium text-lg">ETH</span>
          </div>
          <div className="text-right">
            <p className="text-teal-300 text-xl font-semibold truncate">
              {ethBalance ? formatEther(ethBalance.value) : '0'} ETH
            </p>
            <p className="text-sm text-gray-400">$0.00 USD</p>
          </div>
        </div>

        {holdings.map((holding, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-gray-700 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
              <span className="font-medium text-lg">{holding.symbol}</span>
            </div>
            <div className="text-right">
              <p className="text-teal-300 text-xl font-semibold">{holding.balance}</p>
              <p className="text-sm text-gray-400">${holding.usdValue.toFixed(2)} USD</p>
            </div>
          </div>
        ))}

        {hasNoHoldings && (
          <p className="text-center text-gray-500 py-8">No holdings detected yet.</p>
        )}
      </div>
    </div>
  );
          }
