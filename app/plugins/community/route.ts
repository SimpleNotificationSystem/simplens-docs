import { NextResponse } from "next/server";
import { communityPlugins } from "@/data/plugins";

export async function GET() {
    return NextResponse.json(communityPlugins);
}
