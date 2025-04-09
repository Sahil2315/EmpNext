import { setChangeRecord, setChangeQuery } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  let req = await Request.json();
  if (req.org) {
    console.log(req.field);
    let apply = await setChangeRecord(req.empid, req.field, req.value);
  } else {
    let apply = await setChangeQuery(req.empid, req.field, req.value);
  }
  return NextResponse.json({
    success: true,
  });
}
