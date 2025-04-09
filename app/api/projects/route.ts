import { getProjectModules, getTeamProject } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const requestFull = await req.json()
    const project = await getTeamProject(requestFull.team)
    const modules = await getProjectModules(project?.projectid as number)
    return NextResponse.json({
        'success': true,
        'project': project,
        'modules': modules
    })
}