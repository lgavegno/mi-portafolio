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
    const blogDataPath = path.join(__dirname, '../src/features/blog/data/blogData.es.js');
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

function url(loc, changefreq, priority) {
  return `  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const blogSlugs = extractBlogSlugs();

  const entries = [
    // Home — ES canonical (no prefix), EN (/en), PT (/pt)
    url('/', 'monthly', 0.9),
    url('/en', 'monthly', 0.9),
    url('/pt', 'monthly', 0.9),

    // Agencies
    url('/agencias', 'monthly', 0.9),
    url('/en/agencies', 'monthly', 0.9),
    url('/pt/agencias', 'monthly', 0.9),

    // Blog lists — ES (/blog), EN (/en/blog), PT (/pt/blog)
    url('/blog', 'weekly', 0.8),
    url('/en/blog', 'weekly', 0.8),
    url('/pt/blog', 'weekly', 0.8),

    // Blog posts ES
    ...blogSlugs.map(slug => url(`/blog/${slug}`, 'monthly', 0.7)),

    // Blog posts EN
    ...blogSlugs.map(slug => url(`/en/blog/${slug}`, 'monthly', 0.7)),

    // Blog posts PT
    ...blogSlugs.map(slug => url(`/pt/blog/${slug}`, 'monthly', 0.7)),

    // Projects ES (/proyecto/:id)
    ...projectIds.map(id => url(`/proyecto/${id}`, 'monthly', 0.7)),

    // Projects EN (/en/proyecto/:id)
    ...projectIds.map(id => url(`/en/proyecto/${id}`, 'monthly', 0.7)),

    // Projects PT (/pt/proyecto/:id)
    ...projectIds.map(id => url(`/pt/proyecto/${id}`, 'monthly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n\n')}

</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  const blogCount = blogSlugs.length;
  const projectCount = projectIds.length;
  const total = 3 + 3 + 3 + blogCount * 3 + projectCount * 3;
  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`✓ URLs included: ${total} (3 home + 3 agencies + 3 blog lists + ${blogCount * 3} posts + ${projectCount * 3} projects)`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}