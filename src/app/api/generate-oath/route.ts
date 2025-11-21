import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert at creating accountability challenges called "Oaths". Based on a user's description of what they want to improve, you create structured challenges with:
- A clear, specific challenge title (short and actionable)
- A category (Fitness, Health, Productivity, Finance, Learning, Mindfulness, Social, or Creative)
- A type (Habit for repeated behaviors, Goal for one-time achievements, Avoidance for things to stop doing)
- A frequency/duration (how often and for how long, e.g., "3x per week for 2 weeks", "Daily for 7 days", "14-day streak")
- A suggested monetary stake (between $10-$50 based on difficulty)
- A risk level (Low, Medium, or High based on how challenging it is)

Respond ONLY with a valid JSON object in this exact format:
{
  "challenge": "Title of the challenge",
  "category": "Category name",
  "type": "Habit|Goal|Avoidance",
  "frequency": "Frequency and duration",
  "stake": 25,
  "risk": "Low|Medium|High"
}`,
        },
        {
          role: 'user',
          content: description,
        },
      ],
      temperature: 0.8,
      max_tokens: 300,
      response_format: { type: 'json_object' },
    });

    const generatedText = completion.choices[0]?.message?.content;
    
    if (!generatedText) {
      throw new Error('No response from OpenAI');
    }

    const oathData = JSON.parse(generatedText);

    // Validate the response structure
    if (!oathData.challenge || !oathData.category || !oathData.type || 
        !oathData.frequency || !oathData.stake || !oathData.risk) {
      throw new Error('Invalid oath data structure');
    }

    return NextResponse.json(oathData);
  } catch (error: any) {
    console.error('Error generating oath:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate oath' },
      { status: 500 }
    );
  }
}

