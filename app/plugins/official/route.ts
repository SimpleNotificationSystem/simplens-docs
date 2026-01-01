import { NextResponse } from "next/server";
import { officialPlugins } from "@/data/plugins";

export async function GET() {
    return NextResponse.json(officialPlugins);
}
