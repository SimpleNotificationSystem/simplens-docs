import { div } from 'framer-motion/client';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 
      <div className='flex flex-row justify-center items-center gap-3 text-xl font-bold'>
          <Image
            src="/SimpleNSLogo.png"
            height={100}
            width={100}
            alt='SimpleNS Logo'
          />Docs
      </div>   
    },
  };
}