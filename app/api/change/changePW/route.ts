import { NextRequest, NextResponse } from "next/server";
import { passwordCheck, updatePassword } from "@/app/utils/database";
export async function POST(request: NextRequest) {
  let req = await request.json();
  let PWcheck = await passwordCheck(req.empid, req.username, req.oldPW);
  if (PWcheck) {
    let Change = await updatePassword(req.empid, req.username, req.newPW);
    if (Change) return NextResponse.json({ success: true });
  } 
  return NextResponse.json({
    success: false,
    message: "Wrong Password Provided",
  });
}
