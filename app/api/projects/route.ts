import { getProjectModules, getTeamProject } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    let requestFull = await req.json()
    let project = await getTeamProject(requestFull.team)
    let modules = await getProjectModules(project?.projectid as number)
    return NextResponse.json({
        'success': true,
        'project': project,
        'modules': modules
    })
}