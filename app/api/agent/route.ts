import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const systemPrompt = `
  Kamu adalah Base Meme Agent, ahli cari alpha meme coin di chain Base.
  Jawab singkat, langsung, dan kasih data real-time kalau bisa.
  Kalau user tanya trending, cari token baru/pump di Base.
  Selalu sertakan CA (contract address), % change, volume, dan link DexScreener kalau relevan.
  Gunakan bahasa santai, seperti degen crypto.
  `;

  const responseText = `Yo boss, ada meme baru pump gila nih di Base:  
  $DEGENX – CA: 0xabc123...def456  
  +420% (1h), volume $1.2M, liq $450k  
  Link: https://dexscreener.com/base/0xabc123...def456  
  Mau buy sekarang? 🚀`;

  return NextResponse.json({ reply: responseText });
}
