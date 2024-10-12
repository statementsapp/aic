import { NextResponse } from 'next/server';
import axios from 'axios';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await axios.post(
      CLAUDE_API_ENDPOINT,
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return NextResponse.json({ content: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json({ error: 'Failed to generate response from Claude' }, { status: 500 });
  }
}
