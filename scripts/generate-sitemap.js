#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://www.ongevag.com';
const lastmod = '2026-06-08';

const projectIds = [
  'fitness-retention-analysis',
  'omnistock',
  'faro-art-shop',
  'generador-presupuestos',
  'form-invent',
];

function extractBlogSlugs() {
  try {
    const blogDataPath = path.join(__dirname, '../src/features/blog/data/blogData.js');
    const content = fs.readFileSync(blogDataPath, 'utf-8');
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const slugs = [];
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return slugs;
  } catch (error) {
    console.error('Error reading blog data:', error);
    return [];
  }
}

function url(path, changefreq, priority) {
  return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const blogSlugs = extractBlogSlugs();

  const entries = [
    // Home
    url('/', 'monthly', 0.9),
    url('/es', 'monthly', 0.9),

    // Blog lists
    url('/en/blog', 'weekly', 0.8),
    url('/es/blog', 'weekly', 0.8),

    // Blog posts EN
    ...blogSlugs.map(slug => url(`/en/blog/${slug}`, 'monthly', 0.7)),

    // Blog posts ES
    ...blogSlugs.map(slug => url(`/es/blog/${slug}`, 'monthly', 0.7)),

    // Projects list
    url('/proyecto', 'weekly', 0.8),

    // Projects EN
    ...projectIds.map(id => url(`/proyecto/${id}`, 'monthly', 0.7)),

    // Projects ES
    ...projectIds.map(id => url(`/es/proyecto/${id}`, 'monthly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n\n')}

</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  const blogCount = blogSlugs.length;
  const projectCount = projectIds.length;
  const total = 2 + 2 + blogCount * 2 + 1 + projectCount * 2;
  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`✓ URLs included: ${total} (2 home + 2 blog lists + ${blogCount * 2} posts + 1 projects list + ${projectCount * 2} projects)`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
