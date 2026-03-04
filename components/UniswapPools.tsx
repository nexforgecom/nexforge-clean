'use client';

import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const GET_UNISWAP_POOLS = gql`
  query GetPools($orderBy: Pool_orderBy, $orderDirection: OrderDirection, $first: Int) {
    pools(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      token0 {
        symbol
        id
      }
      token1 {
        symbol
        id
      }
      feeTier
      liquidity
      token0Price
      token1Price
      volumeUSD
      txCount
    }
  }
`;

export default function UniswapPools() {
  const [orderBy, setOrderBy] = useState('volumeUSD');
  const [orderDirection, setOrderDirection] = useState('desc');
  const { loading, error, data } = useQuery(GET_UNISWAP_POOLS, {
    variables: { first: 10, orderBy, orderDirection },
    pollInterval: 60000, // Refresh every 60 seconds
  });

  if (loading) return <p className="text-center text-gray-500">Loading Uniswap pools...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error.message}</p>;

  const pools = data?.pools || [];

  return (
    <div className="mt-16 w-full">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Uniswap Pools on Base</h2>
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="bg-gray-800 border border-cyan-500/50 rounded-lg px-4 py-2 text-white"
        >
          <option value="volumeUSD">Volume USD</option>
          <option value="txCount">Transaction Count</option>
          <option value="liquidity">Liquidity</option>
        </select>
        <select
          value={orderDirection}
          onChange={(e) => setOrderDirection(e.target.value)}
          className="bg-gray-800 border border-cyan-500/50 rounded-lg px-4 py-2 text-white"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pools.map((pool: any) => (
          <div key={pool.id} className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20 hover:border-teal-400 transition-all">
            <h3 className="text-xl font-bold text-teal-300">{pool.token0.symbol} / {pool.token1.symbol}</h3>
            <p className="text-sm text-gray-400 mt-2">Pool ID: {pool.id.slice(0, 6)}...{pool.id.slice(-4)}</p>
            <p className="text-sm text-gray-500 mt-1">Fee Tier: {pool.feeTier}</p>
            <p className="text-2xl font-semibold text-white mt-4">${Number(pool.volumeUSD).toLocaleString()} Volume USD</p>
            <p className="text-sm text-gray-400">Liquidity: ${Number(pool.liquidity).toLocaleString()}</p>
            <p className="text-sm text-gray-400">Tx Count: {pool.txCount}</p>
            <p className="text-sm text-gray-400">Token0 Price: ${Number(pool.token0Price).toFixed(6)}</p>
            <p className="text-sm text-gray-400">Token1 Price: ${Number(pool.token1Price).toFixed(6)}</p>
            <a
              href={`https://basescan.org/address/${pool.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View on Basescan →
            </a>
          </div>
        ))}
      </div>
      {pools.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No pools found. Try different sorting.</p>
      )}
    </div>
  );
            }
