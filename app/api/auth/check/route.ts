import { NextResponse } from 'next/server';
import { authenticateToken } from '../../middleware/auth';

export async function GET(request: Request) {
  try {
    const decoded = await authenticateToken(request);
    
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: decoded.userId,
        username: decoded.username
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 