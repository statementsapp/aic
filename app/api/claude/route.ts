import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const requestBody = {
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }],
      system: "You are a helpful AI assistant."
    };

    console.log('Sending request to Claude API:', requestBody);

    const response = await axios.post(
      CLAUDE_API_ENDPOINT,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    console.log('Claude API response:', response.data);

    return NextResponse.json({ content: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios error details:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
        headers: axiosError.response?.headers
      });
      return NextResponse.json({ 
        error: `Claude API Error: ${axiosError.message}`,
        details: axiosError.response?.data
      }, { status: axiosError.response?.status || 500 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to generate response from Claude',
      details: (error as Error).message
    }, { status: 500 });
  }
}
