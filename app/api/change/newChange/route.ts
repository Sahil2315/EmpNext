import { setChangeRecord, setChangeQuery } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  const req = await Request.json();
  if (req.org) {
    console.log(req.field);
    await setChangeRecord(req.empid, req.field, req.value);
  } else {
    await setChangeQuery(req.empid, req.field, req.value);
  }
  return NextResponse.json({
    success: true,
  });
}
