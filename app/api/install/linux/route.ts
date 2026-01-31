import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const scriptPath = join(process.cwd(), 'public', 'scripts', 'onboard.sh');
        let scriptContent = await readFile(scriptPath, 'utf-8');

        // Normalize line endings to LF for Unix compatibility
        scriptContent = scriptContent.replace(/\r\n/g, '\n');

        // Wrap the script to redirect stdin from /dev/tty for interactive prompts
        // This allows `read` commands to work when piped via curl | bash
        const wrappedScript = `#!/bin/bash
# Wrapper to enable interactive input when piped via curl | bash
exec < /dev/tty

${scriptContent}
`;

        return new NextResponse(wrappedScript, {
            status: 200,
            headers: {
                'Content-Type': 'text/x-shellscript; charset=utf-8',
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

