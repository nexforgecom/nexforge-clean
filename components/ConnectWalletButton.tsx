'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function ConnectWalletButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              type="button"
              className="px-8 py-4 text-xl font-bold text-gray-900 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full hover:from-cyan-400 hover:to-teal-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              Connect Wallet
            </button>
          );
        }

        if (chain?.unsupported) {
          return (
            <button
              onClick={openChainModal}
              type="button"
              className="px-8 py-4 text-xl font-bold bg-red-600 rounded-full hover:bg-red-500 transition"
            >
              Wrong Network - Switch to Base
            </button>
          );
        }

        return (
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800/70 px-6 py-4 rounded-2xl border border-cyan-500/40 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {chain?.hasIcon && chain.iconUrl && (
                <img src={chain.iconUrl} alt={chain.name} className="w-8 h-8" />
              )}
              <span className="text-cyan-300 font-medium">{chain?.name || 'Base'}</span>
            </div>

            <div
              className="group relative cursor-pointer bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-700 hover:border-cyan-500 transition"
              onClick={copyAddress}
            >
              <span className="text-gray-300">
                {account?.displayName || `${address?.slice(0,6)}...${address?.slice(-4)}`}
              </span>
              {account?.displayBalance && (
                <span className="ml-2 text-teal-400 font-semibold">{account.displayBalance}</span>
              )}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {copied ? 'Copied!' : 'Click to copy full address'}
              </div>
            </div>

            <button
              onClick={() => disconnect()}
              className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition"
            >
              Disconnect
            </button>

            <button
              onClick={openAccountModal}
              className="px-5 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 rounded-lg text-cyan-300 transition"
            >
              Account
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
            }
