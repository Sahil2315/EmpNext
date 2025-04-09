import { getUsername } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const requestFull = await req.json()
    const username: {username: string} = await getUsername(requestFull.empid) as {username: string}
    if (!username){
        return NextResponse.json({
            'success': false
        })    
    }
    return NextResponse.json({
        'success': true,
        'username': username.username
    })
}