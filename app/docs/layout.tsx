import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import {Blocks, Code, Cpu} from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
    tree={source.pageTree} {...baseOptions()}
    sidebar={
      {
        tabs: [
          {
            title: "SimpleNS Core",
            description: "The orchestration engine for notifications",
            url: "/docs/core",
            icon: <Cpu className='text-blue-500 h-5'/>
          },
          {
            title: "SimpleNS SDK",
            description: "SDK for building simplens-plugins",
            url: "/docs/sdk",
            icon: <Code className='text-blue-500 h-5'/>
          },
          {
            title: "SimpleNS Plugins",
            description: "Official Plugins for SimpleNS",
            url: "/docs/plugins",
            icon: <Blocks className='text-blue-500 h-5'/>
          }
        ]
      }
    }
    >
      {children}
    </DocsLayout>
  );
}