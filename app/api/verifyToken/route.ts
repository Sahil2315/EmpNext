import { headers } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { completeDetails } from "@/app/utils/database";

type contextFromToken = {
    empid: string,
    username: string,
    email: string,
    admin: string
}

export async function GET(request: NextRequest){
    let headerList = await request.headers
    let userToken = headerList.get('userToken')
    let Prefix = userToken?.slice(0, 38)
    let Postfix = userToken?.slice(-38)
    if (Prefix == process.env.JWT_HEADER_PRE || Postfix == process.env.JWT_HEADER_POST){
        let token = userToken?.slice(38, -38)
        try{
            let decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as contextFromToken
            let details = await completeDetails(decoded.empid)
            return NextResponse.json({
                'success': true,
                'user': details
            })
        }
        catch(e){
            console.log(e)
            return NextResponse.json({'success': false})
        }
    }
    else{
        return NextResponse.json({'success': false})
    }
}