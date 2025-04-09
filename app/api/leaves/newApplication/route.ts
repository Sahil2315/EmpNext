import { newLeave } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  let req = await Request.json();
  let apply = await newLeave(req);
  if (apply) {
    return NextResponse.json({
      success: true,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
