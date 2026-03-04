'use client';

import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';

export default function PortfolioSection() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address, chainId: 8453 });
  const [loading, setLoading] = useState(false);

  if (!isConnected) return null;

  return (
    <div className="mt-16 w-full">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Your Portfolio on Base</h2>
      <div className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20">
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full" />
            <span className="font-medium text-lg">ETH</span>
          </div>
          <div className="text-right max-w-[50%]">
            <p className="text-teal-300 text-xl font-semibold truncate">
              {ethBalance ? formatEther(ethBalance.value) : '0'} ETH
            </p>
            <p className="text-sm text-gray-400">USD value not available</p>
          </div>
        </div>

        <p className="text-center text-gray-500 py-8 mt-4">Token holdings coming soon</p>
      </div>
    </div>
  );
}
