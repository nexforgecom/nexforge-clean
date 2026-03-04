'use client';

import { useState } from 'react';

export default function MemeAgentChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const { reply } = await res.json();

      setMessages((prev) => [...prev, { role: 'agent', content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'agent', content: 'Error: Gagal konek agent. Coba lagi nanti.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 w-full max-w-2xl mx-auto bg-gray-900/80 rounded-2xl border border-cyan-500/30 overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400">Base Meme Agent</h3>
        <p className="text-sm text-gray-400">Tanya apa aja tentang meme di Base!</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-cyan-600/30 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-xl text-gray-400">Agent mikir...</div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-cyan-500/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Cari meme pump hari ini..."
          className="flex-1 bg-gray-900 border border-cyan-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
        }
