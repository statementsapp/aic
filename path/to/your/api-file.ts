import axios from 'axios';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      CLAUDE_API_ENDPOINT,
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to generate response from Claude');
  }
}
