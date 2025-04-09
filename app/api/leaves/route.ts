import { olderLeaves } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  let req = await Request.json();
  let leaves = await olderLeaves(req.empid);
  if (leaves) {
    return NextResponse.json({
      success: true,
      leaves: leaves,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
