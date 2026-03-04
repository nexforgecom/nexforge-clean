'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
          NexForge v2
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition">Dashboard</Link>
          <ConnectButton 
            label="Connect Wallet"
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </div>
    </nav>
  );
}
