import { NextResponse } from "next/server"
import matter from "gray-matter"
import fs from "fs"
import path from "path"

export async function GET() {
    try {
        const changelogPath = path.join(process.cwd(), "content", "changelog.mdx")
        const fileContents = fs.readFileSync(changelogPath, "utf8")
        const { data } = matter(fileContents)

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ releases: [] }, { status: 500 })
    }
}
