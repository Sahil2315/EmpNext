import { searchFor } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const req = await Request.json();
  const searchList = await searchFor(req.searchVal);
  if (searchList) {
    return NextResponse.json({
      success: true,
      list: searchList,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
