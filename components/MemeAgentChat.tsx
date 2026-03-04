'use client';

import { useState, useEffect } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

export default function MemeAgentChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initEngine = async () => {
      setLoading(true);
      try {
        const mlcEngine = await CreateMLCEngine(
          'https://webllm.mlc.ai/models/',
          {
            initProgressCallback: (report) => console.log(report.text),
          }
        );
        await mlcEngine.reload('Llama-3.1-8B-Instruct-q4f16_1-MLC');
        setEngine(mlcEngine);
      } catch (err) {
        console.error(err);
        setError('Gagal load model AI offline. Coba browser Chrome/Edge atau refresh.');
      } finally {
        setLoading(false);
      }
    };
    initEngine();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !engine) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMsg, { role: 'agent' as const, content: '' }]);
    setInput('');
    setLoading(true);

    try {
      const reply = await engine.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Kamu Base Meme Agent, ahli alpha meme coin di Base. Jawab pintar, santai, kasih CA, % change, volume, link DexScreener kalau relevan. Gunakan real-time search kalau perlu.',
          },
          ...messages,
          { role: 'user', content: input },
        ],
        temperature: 0.7,
        max_tokens: 400,
      });

      const agentReply = reply.choices[0].message.content || 'No response';
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = agentReply;
        return newMessages;
      });
    } catch (err) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = 'Error: Model offline gagal load.';
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 w-full max-w-2xl mx-auto bg-gray-900/80 rounded-2xl border border-cyan-500/30 overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400">Offline Base Meme Agent</h3>
        <p className="text-sm text-gray-400">100% di browser, tanpa limit API</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-cyan-600/30 text-white' : 'bg-gray-800 text-gray-200'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-400">Agent mikir... (load model pertama kali bisa 30-120 detik)</div>}
        {error && <p className="text-center text-red-400">{error}</p>}
      </div>

      <div className="p-4 border-t border-cyan-500/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Cari meme pump hari ini..."
          className="flex-1 bg-gray-900 border border-cyan-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
          disabled={loading || !engine}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !engine}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
