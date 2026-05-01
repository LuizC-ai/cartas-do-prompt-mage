/**
 * Hook customizado para gerenciar SEO
 */

import { useEffect } from 'react';
import { updateMetaTags, SEOConfig } from '@/lib/seo';

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    updateMetaTags(config);
  }, [config]);
}
