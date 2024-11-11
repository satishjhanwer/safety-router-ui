import { NextResponse } from "next/server";
import { initializeDatabase } from "../lib/init";

export async function GET() {
  try {
    console.log("📡 Starting initialization request...");
    await initializeDatabase();

    return NextResponse.json({
      status: "success",
      message: "Database initialized successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Initialization failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
