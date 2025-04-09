import { olderChanges } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const req = await Request.json();
  const changes = await olderChanges(req.empid);
  if (changes) {
    return NextResponse.json({
      success: true,
      changes: changes,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
