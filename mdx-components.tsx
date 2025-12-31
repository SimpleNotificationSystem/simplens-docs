import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './components/mdx/mermaid';
import { LLMCopyButton, ViewOptions } from './components/page-actions';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Mermaid,
    LLMCopyButton,
    ViewOptions,
    ...components,
    img: (props) => <ImageZoom {...(props as any)} />,
  };
}