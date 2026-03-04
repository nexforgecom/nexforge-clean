'use client';

import { useQuery, gql } from '@apollo/client';

const GET_RECENT_TOKENS = gql`
  query GetRecentTokens {
    tokens(
      first: 10
      orderBy: createdAt
      orderDirection: desc
      where: { chainId: "base" }
    ) {
      id
      name
      symbol
      address
      createdAt
      totalSupply
      launchType
      creator {
        id
      }
      auction {
        id
        status
        currentPrice
      }
    }
  }
`;

export default function TrendingSection() {
  const { loading, error, data } = useQuery(GET_RECENT_TOKENS, {
    pollInterval: 15000,
  });

  if (loading) return <p className="text-center text-gray-500">Loading Doppler tokens...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error.message}</p>;

  const tokens = data?.tokens || [];

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">New Tokens on Base (via Doppler)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token: any) => (
          <div
            key={token.id}
            className="bg-gray-800/60 rounded-xl p-6 border border-teal-500/20 hover:border-teal-400 transition-all"
          >
            <h3 className="text-xl font-bold text-teal-300">{token.symbol} ({token.name})</h3>
            <p className="text-sm text-gray-400 mt-2">
              Address: {token.address.slice(0, 6)}...{token.address.slice(-4)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Launched: {new Date(token.createdAt * 1000).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Launch Type: {token.launchType || 'Unknown'}
            </p>
            {token.auction && (
              <p className="text-sm text-cyan-300 mt-2">
                Current Price: ${token.auction.currentPrice || 'N/A'}
              </p>
            )}
            <a
              href={`https://dexscreener.com/base/${token.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View on DexScreener →
            </a>
          </div>
        ))}
      </div>
      {tokens.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No new tokens detected right now. Check{' '}
          <a href="https://app.doppler.lol/" target="_blank" className="text-cyan-400 hover:text-cyan-300">
            Doppler App →
          </a>
        </p>
      )}
    </div>
  );
}
