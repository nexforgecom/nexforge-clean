import ConnectWalletButton from '@/components/ConnectWalletButton';
import MemeAgentChat from '@/components/MemeAgentChat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-950 text-white">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
        NexxForge v2
      </h1>
      <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
        Your personal Base wallet dashboard + Offline AI Meme Agent
      </p>

      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-16">
          <ConnectWalletButton />
        </div>

        <MemeAgentChat />
      </div>
    </main>
  );
}
