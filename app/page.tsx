export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black p-6">
      <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent text-center">
        NexForge v2
      </h1>
      <p className="mt-6 text-xl text-gray-300 text-center max-w-2xl">
        Your personal Base wallet dashboard + trending meme tracker.
      </p>
      <a
        href="/dashboard"
        className="mt-10 px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold text-xl rounded-xl hover:scale-105 transition"
      >
        Open Dashboard
      </a>
    </div>
  );
}
