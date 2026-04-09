/**
 * Extract headings from MDX content for table of contents
 */

interface Heading {
  depth: number;
  text: string;
  slug: string;
}

/**
 * Extract headings from MDX content
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    headings.push({ depth, text, slug });
  }

  return headings;
}

/**
 * Render a TOC item as HTML
 */
export function renderTocItem(heading: Heading): string {
  const indent = '  '.repeat(heading.depth - 2);
  return `${indent}<li><a href="#${heading.slug}" class="block border-l border-transparent pl-4 text-sm/6 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-400 dark:hover:border-white/25 dark:hover:text-white">${heading.text}</a></li>`;
}
