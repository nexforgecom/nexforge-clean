import ConnectWalletButton from '@/components/ConnectWalletButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold text-cyan-400">NexxForge v2</h1>
      <p className="mt-4 text-lg">Your personal Base wallet dashboard + trending meme tracker.</p>
      <div className="mt-8">
        <ConnectWalletButton />
      </div>
    </main>
  );
}
