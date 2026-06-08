// src/data/projects.en.js
// Featured projects data for portfolio (English)
import fitnessImg from '../assets/fig_clusters_ai.webp';
import omnistock1Img from '../assets/omnistock1.webp';
import faroart1Img from '../assets/faroart1.webp';
import generador1Img from '../assets/generador1.webp';

export const featuredProjects = [
  {
    id: 'fitness-retention-analysis',
    title: 'Retention Analysis & ML - FitNess App',
    description: 'Technical refactoring and data modeling to reduce Churn from 65% to 45%. Integrity audit across 1,168 records and risk profile segmentation using K-Means Clustering.',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Power BI'],
    progress: 100,
    progressLabel: 'Completed: Insights report delivered',
    status: 'completed',
    image: fitnessImg,
    link: 'https://github.com/lgavegno/proyecto-fitNess-retencion',
    featured: true,
    category: 'ai-ml',
    highlights: ['Data Integrity', 'K-Means Clustering', 'DAU/MAU Metrics'],
    longDescription: 'The project involved a deep analysis of a database with 11,600 records and an initial churn rate of 65%. After detecting massive inconsistencies (89% noise), an ETL process was performed to consolidate a true dataset of 1,168 users. Unsupervised learning was applied to segment users and predict early abandonment.',
    methodology: ['Referential Integrity Audit', 'ETL & Data Cleansing', 'K-Means Clustering Modeling', 'Sticky Factor Analysis (DAU/MAU)'],
    results: ['Projected churn reduction to 45%', 'HIIT/Strength identified as retention drivers', 'Detection of Day 0 activation failure'],
    notionLink: 'https://wind-texture-7af.notion.site/FitNess-App-Estrategia-de-Retenci-n-basada-en-Datos-Machine-Learning-2fea3541aceb80598ae3d60e469ca31b'
  },
  {
    id: 'omnistock',
    title: 'OmniStock — Desktop Inventory System',
    description: 'Desktop application for stock control, quotations, suppliers, recipes, and internal audit. Offline-first architecture with local SQLite database.',
    stack: ['Tauri', 'React', 'Rust', 'SQLite', 'TypeScript'],
    progress: 70,
    progressLabel: 'In active development — v2.0 alpha',
    status: 'in-progress',
    image: omnistock1Img,
    link: null,
    featured: true,
    category: 'fullstack',
    highlights: ['Cross-platform native app', 'Offline-first with SQLite', 'Commercial software with HWID licensing'],
    longDescription: 'Inventory and commercial management system for SMEs developed with Tauri. Enables stock control, point of sale, quotations, supplier management, BOM recipes, and internal audit. Runs 100% offline with local SQLite database. Commercial product in active development under SDD methodology.',
    methodology: ['Spec-Driven Development (SDD)', 'Modular architecture by logical blocks', 'Unit testing in Rust', 'HWID licensing'],
    results: ['Native app for Windows, macOS, and Linux', 'Modules: POS, Inventory, Quotations, Suppliers, Recipes & BOM', 'Product ready for commercialization on MercadoLibre'],
    notionLink: null
  },
  {
    id: 'faro-art-shop',
    title: 'Faro Art Shop — Online Store',
    description: 'E-commerce store for String Art kits. Complete setup on Tienda Nube with custom domain, personalized CSS, and conversion optimization.',
    stack: ['Tienda Nube', 'CSS3', 'Hostinger DNS', 'MercadoPago'],
    progress: 100,
    progressLabel: 'Completed: Store in production with active sales',
    status: 'completed',
    image: faroart1Img,
    link: 'https://faroartshop.com',
    linkLabel: 'Visit online store',
    featured: true,
    category: 'frontend',
    highlights: ['Production store with active sales', 'Custom domain configured', 'Custom CSS over Tienda Nube'],
    longDescription: 'Design, configuration, and launch of online store on Tienda Nube for sale of handmade String Art kits. Includes complete theme customization via advanced CSS editor, DNS configuration with Hostinger for custom domain, product card optimization, and MercadoPago payment gateway configuration.',
    methodology: ['Complete Tienda Nube setup', 'Advanced CSS customization', 'DNS configuration and custom domain', 'Conversion optimization'],
    results: ['Operational store at faroartshop.com', 'MercadoPago integration working', 'Custom domain with active SSL'],
    notionLink: null
  },
  {
    id: 'generador-presupuestos',
    title: 'Web Quotation Generator',
    description: 'Real-time quotation tool for web projects. Serverless backend with Google Apps Script, storage in Google Sheets, and email notifications.',
    stack: ['Vanilla JS', 'Google Apps Script', 'Google Sheets API', 'HTML5', 'CSS3'],
    progress: 100,
    progressLabel: 'Completed: In production — v2.2.0',
    status: 'completed',
    image: generador1Img,
    link: 'https://lgavegno.github.io/generador-presupuestos/presupuestador/',
    featured: true,
    category: 'fullstack',
    highlights: ['$0/month infrastructure — serverless', 'Automatic flow to Google Sheets', 'Custom project mode with referral'],
    longDescription: 'Quotation calculator for web development services. The client configures site type, sections, and premium features — the system calculates the price in real-time, sends the data to Google Apps Script, and notifies the owner by email. Includes special mode for custom projects that automatically refers to technical interview.',
    methodology: ['Spec-Driven Development (SDD)', 'Serverless architecture without backend', 'Google Apps Script as webhook', 'Google Sheets as database'],
    results: ['$0/month infrastructure using free Google services', 'Automatic email notifications to owner', 'Complete technical documentation in repository /docs'],
    notionLink: null
  },
  {
    id: 'form-invent',
    title: 'form-invent — Excel Inventory System',
    description: 'Commercial inventory system in Excel with VBA. Control of entries, exits, real-time stock, and dashboard with monthly filters. Product for sale on MercadoLibre.',
    stack: ['Excel', 'VBA', 'Macros', 'Dashboard'],
    progress: 100,
    progressLabel: 'Completed: Available on MercadoLibre',
    status: 'completed',
    image: null,
    link: null,
    featured: true,
    category: 'tools',
    highlights: ['Complete system with VBA macros', 'Dashboard with dynamic monthly filters', 'Commercial product on MercadoLibre'],
    longDescription: 'Inventory system developed in Excel with VBA macros for SMEs that don\'t require specialized software. Includes modules for stock entries and exits, automatic validations, dashboard with dynamic monthly filters, and deactivation of inactive products. Commercialized as a digital product on MercadoLibre.',
    methodology: ['Development in pure Excel + VBA', 'Architecture with structured tables (tbl_Stock)', 'SUMIFS formulas for reports', 'Exhaustive manual testing'],
    results: ['Complete inventory control without additional software', 'Monthly dashboard with dynamic filters', 'Product ready for sale on MercadoLibre'],
    notionLink: null
  }
];

export const allProjects = [
  ...featuredProjects
];

// Project categories
export const projectCategories = [
  { id: 'all', label: 'All', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'Data Science / ML', icon: '🤖' },
  { id: 'tools', label: 'Tools', icon: '🔧' }
];

export default featuredProjects;
