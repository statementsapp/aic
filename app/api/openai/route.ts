import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({ content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
