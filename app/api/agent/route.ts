import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const grok = new OpenAI({
  apiKey: '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',
  baseURL: 'https://api.x.ai/v1',
});

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const completion = await grok.chat.completions.create({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: 'Kamu Base Meme Agent, ahli alpha meme coin di Base. Jawab santai, kasih CA, % change, volume, link DexScreener kalau relevan. Gunakan real-time search kalau perlu.',
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || 'No response';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal konek ke Grok API' }, { status: 500 });
  }
}
