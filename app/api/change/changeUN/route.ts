import { NextRequest, NextResponse } from "next/server";
import { passwordCheck, updateUsername } from "@/app/utils/database";
export async function POST(request: NextRequest) {
  let req = await request.json();
  let PWcheck = await passwordCheck(req.empid, req.username, req.password);
  if (PWcheck) {
    let Change = await updateUsername(req.empid, req.username, req.newUN);
    if(Change) return NextResponse.json({success: true})
  } else {
    return NextResponse.json({ success: false, message: "Wrong Password" });
  }
}
