import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const scriptPath = join(process.cwd(), 'public', 'scripts', 'onboard.sh');
        const scriptContent = await readFile(scriptPath, 'utf-8');

        return new NextResponse(scriptContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/x-shellscript',
                'Content-Disposition': 'attachment; filename="onboard.sh"',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Error reading Linux install script:', error);
        return NextResponse.json(
            { error: 'Failed to load installation script' },
            { status: 500 }
        );
    }
}
