import { NextResponse } from 'next/server';
import { connectDB } from '../lib/db';
import { Prompt } from '../models/prompt';
import { authenticateToken } from '../middleware/auth';

export async function POST(request: Request) {
  try {
    const decoded = await authenticateToken(request);
    
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await connectDB();
    const { prompt } = await request.json();

    // Mock analysis logic - replace with actual AI model analysis
    const analysis = {
      models: [
        { name: "ChatGPT", probability: 0.7 },
        { name: "Claude", probability: 0.2 },
        { name: "Gemini", probability: 0.1 },
      ],
      selectedModel: "ChatGPT"
    };

    // Store the prompt and analysis in database
    const promptRecord = await Prompt.create({
      userId: decoded.userId,
      promptText: prompt,
      responseMatrix: analysis
    });

    return NextResponse.json({
      ...analysis,
      promptId: promptRecord._id
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 