import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import {Blocks, Code, Cpu, Plug} from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
    tree={source.pageTree} {...baseOptions()}
    sidebar={
      {
        tabs: [
          {
            title: "Core",
            description: "The orchestration engine for notifications",
            url: "/docs/core",
            icon: <Cpu className='text-blue-500 h-5'/>
          },
          {
            title: "SDK",
            description: "SDK for building simplens-plugins",
            url: "/docs/sdk",
            icon: <Code className='text-blue-500 h-5'/>
          },
          {
            title: "Plugins",
            description: "Official Plugins for SimpleNS",
            url: "/docs/plugins",
            icon: <Blocks className='text-blue-500 h-5'/>
          },
          {
            title: "MCP",
            description: "MCP Server for your SimpleNS instance",
            url: "/docs/mcp",
            icon: <Plug className='text-blue-500 h-5'/>
          }
        ]
      }
    }
    >
      {children}
    </DocsLayout>
  );
}