import { empLoginDB } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(Request: NextRequest) {
  let req = await Request.json()
  let user = await empLoginDB({entry: req.uname, pword: req.pword})
  if (user){
    let userToken = jwt.sign(user, process.env.JWT_SECRET as string)
    let headerToken = process.env.JWT_HEADER_PRE + userToken + process.env.JWT_HEADER_POST
    return NextResponse.json({
      'success': true,
      'token': headerToken
    })
  }
  else{
    return NextResponse.json({
      'success': false
    })
  }
}
