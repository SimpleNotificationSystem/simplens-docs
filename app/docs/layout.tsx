import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import {Cpu} from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
    tree={source.pageTree} {...baseOptions()}
    sidebar={
      {
        tabs: [
          {
            title: "SimpleNS-Core",
            description: "The orchestration engine for notifications",
            url: "/docs",
            icon: <Cpu className='text-blue-500 h-5'/>
          }
        ]
      }
    }
    >
      {children}
    </DocsLayout>
  );
}