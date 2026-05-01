/**
 * Utilitários de SEO para Cartas do Prompt Mage
 */

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const defaultSEO: SEOConfig = {
  title: "Cartas do Prompt Mage - IA + Código em Produção",
  description: "Histórias reais sobre o que funciona com IA e código em produção. Luiz, Minas Gerais, Brasil.",
  canonical: "https://cartas-do-prompt-mage.com",
  ogType: "website",
};

export function updateDocumentTitle(title: string) {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
}

export function updateMetaTags(config: SEOConfig) {
  if (typeof document === 'undefined') return;

  // Title
  const titleTag = document.querySelector('title');
  if (titleTag) {
    titleTag.textContent = config.title;
  }

  // Description
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.setAttribute('name', 'description');
    document.head.appendChild(descriptionTag);
  }
  descriptionTag.setAttribute('content', config.description);

  // Canonical
  if (config.canonical) {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', config.canonical);
  }

  // OG Tags
  if (config.ogImage) {
    let ogImageTag = document.querySelector('meta[property="og:image"]');
    if (!ogImageTag) {
      ogImageTag = document.createElement('meta');
      ogImageTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageTag);
    }
    ogImageTag.setAttribute('content', config.ogImage);
  }

  if (config.ogType) {
    let ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (!ogTypeTag) {
      ogTypeTag = document.createElement('meta');
      ogTypeTag.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeTag);
    }
    ogTypeTag.setAttribute('content', config.ogType);
  }

  // OG Title
  let ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (!ogTitleTag) {
    ogTitleTag = document.createElement('meta');
    ogTitleTag.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitleTag);
  }
  ogTitleTag.setAttribute('content', config.title);

  // OG Description
  let ogDescTag = document.querySelector('meta[property="og:description"]');
  if (!ogDescTag) {
    ogDescTag = document.createElement('meta');
    ogDescTag.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescTag);
  }
  ogDescTag.setAttribute('content', config.description);
}

export function generatePostSEO(title: string, excerpt: string, slug: string): SEOConfig {
  return {
    title: `${title} | Cartas do Prompt Mage`,
    description: excerpt.substring(0, 160),
    canonical: `https://cartas-do-prompt-mage.com/carta/${slug}`,
    ogType: "article",
  };
}
