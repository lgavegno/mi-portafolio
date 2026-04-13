#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://ongevag.vercel.app';

// Static routes (only real React Router routes)
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/blog', changefreq: 'daily', priority: 0.9 },
];

// Function to extract blog slugs from blogData.js
function extractBlogSlugs() {
  try {
    const blogDataPath = path.join(__dirname, '../src/features/blog/data/blogData.js');
    const content = fs.readFileSync(blogDataPath, 'utf-8');

    // Match slug properties in the blog posts array
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

// Function to generate sitemap XML
function generateSitemap() {
  const blogSlugs = extractBlogSlugs();

  // Combine static routes with dynamic blog posts
  const allRoutes = [
    ...staticRoutes,
    ...blogSlugs.map(slug => ({
      path: `/blog/${slug}`,
      changefreq: 'never',
      priority: 0.7
    }))
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public/sitemap.xml
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  console.log(`✓ Sitemap generated: ${outputPath}`);
  console.log(`✓ Routes included: ${allRoutes.length} (${staticRoutes.length} static + ${blogSlugs.length} blog posts)`);
}

// Execute
try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
