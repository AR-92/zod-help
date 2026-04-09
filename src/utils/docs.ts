/**
 * Content collection utilities - Cached helpers for help center navigation
 * Prevents repeated getCollection() calls in dev mode
 */

import { getCollection } from 'astro:content';

// Cache for the docs collection - persists across page renders in dev mode
let docsCache: Array<any> | null = null;
let groupedCache: Record<string, Array<any>> | null = null;

const CATEGORY_ORDER = [
  'GETTING STARTED',
  'ACCOUNT & BILLING',
  'FEATURES',
  'TROUBLESHOOTING',
  'FAQS',
  'ADVANCED',
];

/**
 * Get all docs documents with caching
 */
export async function getAllDocs() {
  if (!docsCache) {
    docsCache = await getCollection('docs');
  }
  return docsCache;
}

/**
 * Get docs grouped by category with caching
 */
export async function getGroupedDocs() {
  if (!groupedCache) {
    const allDocs = await getAllDocs();
    groupedCache = allDocs.reduce((acc, doc) => {
      const category = doc.data.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    }, {} as Record<string, typeof allDocs>);

    // Sort each category by order
    Object.values(groupedCache).forEach(categoryDocs => {
      categoryDocs.sort((a, b) => a.data.order - b.data.order);
    });
  }
  return groupedCache;
}

/**
 * Find previous and next docs documents for navigation
 */
export async function getPrevNextDocs(currentSlug: string) {
  const groupedByCategory = await getGroupedDocs();
  const categories = CATEGORY_ORDER.filter(cat => groupedByCategory[cat]);

  let prevDoc = null;
  let nextDoc = null;

  for (let i = 0; i < categories.length; i++) {
    const categoryDocs = groupedByCategory[categories[i]];
    const currentIndex = categoryDocs.findIndex(d => d.slug === currentSlug);

    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        prevDoc = categoryDocs[currentIndex - 1];
      } else if (i > 0) {
        const prevCategory = categories[i - 1];
        prevDoc = groupedByCategory[prevCategory][groupedByCategory[prevCategory].length - 1];
      }

      if (currentIndex < categoryDocs.length - 1) {
        nextDoc = categoryDocs[currentIndex + 1];
      } else if (i < categories.length - 1) {
        const nextCategory = categories[i + 1];
        nextDoc = groupedByCategory[nextCategory][0];
      }
      break;
    }
  }

  return { prevDoc, nextDoc };
}

/**
 * Clear the cache (useful during development when content changes)
 */
export function clearDocsCache() {
  docsCache = null;
  groupedCache = null;
}
