'use client';

import { useState } from 'react';

export default function CreateToken() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleLaunch = () => {
    if (!name.trim() || !symbol.trim()) {
      alert('Token name and symbol are required');
      return;
    }
    alert(`Launching ${name} (${symbol}) - This is a test`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black p-6">
      <h1 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent text-center">
        Launch Token
      </h1>

      <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Token Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. MoltFastTokenV1"
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 mb-2 font-medium">Symbol (max 8 chars)</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. MFTV1"
            maxLength={8}
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        <button
          onClick={handleLaunch}
          className="w-full py-4 font-bold text-lg rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:scale-105 transition"
        >
          Launch Test
        </button>
      </div>
    </div>
  );
            }
