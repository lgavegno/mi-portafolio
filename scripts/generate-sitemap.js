#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://www.ongevag.com';
const lastmod = new Date().toISOString().split('T')[0];

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
    // Home — ES canonical (no prefix), EN (/en)
    url('/', 'monthly', 0.9),
    url('/en', 'monthly', 0.9),

    // Blog lists — ES (/blog), EN (/en/blog)
    url('/blog', 'weekly', 0.8),
    url('/en/blog', 'weekly', 0.8),

    // Blog posts ES
    ...blogSlugs.map(slug => url(`/blog/${slug}`, 'monthly', 0.7)),

    // Blog posts EN
    ...blogSlugs.map(slug => url(`/en/blog/${slug}`, 'monthly', 0.7)),

    // Projects ES (/proyecto/:id)
    ...projectIds.map(id => url(`/proyecto/${id}`, 'monthly', 0.7)),

    // Projects EN (/en/proyecto/:id)
    ...projectIds.map(id => url(`/en/proyecto/${id}`, 'monthly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n\n')}

</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  const blogCount = blogSlugs.length;
  const projectCount = projectIds.length;
  const total = 2 + 2 + blogCount * 2 + projectCount * 2;
  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`✓ URLs included: ${total} (2 home + 2 blog lists + ${blogCount * 2} posts + ${projectCount * 2} projects)`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
