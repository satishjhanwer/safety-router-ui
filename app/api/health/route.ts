import { NextResponse } from 'next/server';
import { checkConnection } from '../lib/db';

export async function GET() {
  try {
    const dbStatus = await checkConnection();
    
    return NextResponse.json({
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: 'Failed to check system health',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 