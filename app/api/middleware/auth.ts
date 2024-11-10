import { NextResponse } from 'next/server';
import { verify, JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

interface DecodedToken extends JwtPayload {
  userId: string;
  username: string;
}

export async function authenticateToken(request: Request): Promise<DecodedToken | NextResponse> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
} 