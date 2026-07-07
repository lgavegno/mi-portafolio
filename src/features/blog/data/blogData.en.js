// src/features/blog/data/blogData.en.js
// Blog posts data (English)

export const blogPosts = [
  // TODO(leo): revisar traducción
  {
    id: 'como-conectamos-excel-con-un-erp',
    title: 'How We Turned an Excel Spreadsheet into a Tool Connected to an ERP',
    excerpt: 'How we connected an Excel spreadsheet to a company\'s management system without changing the sales team\'s workflow — and the technical problems we solved along the way.',
    category: 'Automation',
    readTime: 7,
    date: '2026-07-07',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Excel', 'ERP', 'VBA', 'Automation', 'API', 'Integrations'],
    featured: false,
    slug: 'como-conectamos-excel-con-un-erp',
    content: `
<h2>The problem: two systems that didn't talk to each other</h2>
<p>A sales team worked every day with an Excel spreadsheet to build orders. It was the tool they knew, the one they'd always used, and the one they didn't want to give up. The problem was that real stock levels and official product data lived somewhere else: a separate ERP system, with no connection to that spreadsheet.</p>
<p>Every salesperson had to enter the order in Excel and, in parallel, manually check the ERP to see if the product still had stock available. That double work caused wasted time, data-entry errors and — the worst case — confirmed orders for quantities that no longer existed.</p>

<h2>The constraint that shaped everything: don't touch the workflow</h2>
<p>The obvious solution would have been to replace the spreadsheet with a new application. But that meant training an entire team on an unfamiliar tool, with all the resistance and adoption time that implies. The decision went the other way: keep the Excel spreadsheet exactly as they knew it, but connect it to the management system behind the scenes, transparently.</p>

<h2>The architecture of the solution</h2>
<p>An integration was built using VBA macros that periodically query each product's information from the external system and automatically update the available stock inside the spreadsheet itself. The salesperson still sees an Excel row — it just now holds real-time data.</p>
<p>The external system enforced a rate limit on queries, so the sync couldn't simply request the entire catalog at once. A controlled execution strategy — batches spaced over time — was designed to update the full catalog without triggering blocks or exceeding that limit.</p>

<h2>The most interesting challenge: quantities changing mid-order</h2>
<p>While building an order, the salesperson tries out different quantities before confirming. If every quantity change recalculated available stock by subtracting from the last computed value, a couple of successive corrections would end up dragging accumulated errors — the displayed stock no longer reflected reality.</p>
<p>The fix was conceptually simple but key: internally store a copy of the original stock obtained at sync time, and always use that base value — never the result of a previous calculation — to recompute availability on every quantity change. Zero accumulated errors, no matter how many times the salesperson adjusted the order.</p>
<p>On top of that, an automatic, periodic sync refresh was added to minimize the risk of working with stale information, with no manual action required from the user.</p>

<h2>Results</h2>
<ul>
  <li>Eliminated manual lookups in the management system during the sale.</li>
  <li>Significant reduction in errors caused by stock discrepancies.</li>
  <li>Faster order creation.</li>
  <li>Zero learning curve: the team kept using the same spreadsheet, now with visual stock indicators and automatic calculations.</li>
  <li>Transparent integration between Excel and the management system, with no need to replace existing processes.</li>
</ul>

<h2>What I took away from this project</h2>
<p>The most effective automations are the ones that respect the user's existing workflow instead of forcing them to learn a new tool. Performance limits or external service quotas need to be considered from the integration's design phase, not patched in afterward. And whenever there are calculations derived from synced data, it's worth keeping an immutable base value — it prevents accumulated errors that are very hard to catch later.</p>
<p>A good integration doesn't just connect systems: it also improves the reliability of information and reduces the day-to-day operational load for the team using it.</p>
<p>Do you have a similar manual process — a spreadsheet, a legacy system, a workflow that "works but isn't connected"? Let's talk about how to automate it without your team having to change the way they work.</p>
`
  },
  {
    id: 'google-sheets-backend-serverless',
    title: 'How I Set Up Google Sheets as a Serverless Backend',
    excerpt: 'No server, no database, no monthly cost. How I built a quotation system with Google Apps Script, Sheets, and Gmail that processes forms in real-time.',
    category: 'Development',
    readTime: 8,
    date: '2026-04-16',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    tags: ['Google Sheets', 'Apps Script', 'Serverless', 'Vanilla JS'],
    featured: true,
    slug: 'google-sheets-backend-serverless',
    content: `
<h2>The problem I wanted to solve</h2>
<p>I needed clients to be able to generate web project quotations in real-time and for me to receive that information automatically — without setting up a server, without paying for backend hosting, without maintaining a database.</p>
<p>The solution was to use infrastructure that already exists and is free: <strong>Google Sheets as a database, Google Apps Script as a server, and Gmail as a notification system.</strong></p>

<h2>The complete architecture</h2>
<p>The flow has four layers that communicate with each other:</p>
<pre><code>Frontend (Vanilla JS)
    ↓ POST JSON
Google Apps Script (Webhook)
    ↓              ↓
Google Sheets    Gmail
(storage)        (notification)</code></pre>
<p>The client completes the form, the frontend JavaScript calculates the price in real-time, and when submitting it does a <code>fetch()</code> POST to the Apps Script webhook. The script validates the data, saves it to Sheets, and sends me an email with the complete details.</p>

<h2>Step 1 — The frontend calculates, not the server</h2>
<p>The first decision was to move all pricing logic to the client. Each time the user selects a site type or functionality, JavaScript recalculates the total instantly without making any server call.</p>
<p>This has two advantages: the experience is immediate (no latency), and the server only receives the final result, it doesn't have to process anything complex.</p>
<pre><code>function calculateQuote() {
  const base = PRICES[siteType] || 0;
  const extras = selectedSections * 50000;
  const features = selectedFeatures * 60000;
  return base + extras + features;
}</code></pre>

<h2>Step 2 — Google Apps Script as a webhook</h2>
<p>Apps Script allows you to publish a function as a publicly accessible HTTP endpoint. The <code>doPost()</code> function is the equivalent of a <code>POST /api/quotation</code> route in Express, but without a server.</p>
<pre><code>function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Save to Sheets
  const sheet = SpreadsheetApp.openById(SHEET_ID)
    .getSheetByName('SUBMISSIONS');
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.site_type,
    data.quote.total
  ]);

  // Notify by email
  MailApp.sendEmail({
    to: 'your@email.com',
    subject: 'New quotation — ' + data.name,
    body: formatEmail(data)
  });

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}</code></pre>

<h2>Step 3 — The CORS problem and how to solve it</h2>
<p>Here's a trap that took me time: Apps Script doesn't support CORS correctly when using <code>fetch()</code> with <code>mode: 'cors'</code>. The solution is to use <code>mode: 'no-cors'</code> on the frontend.</p>
<p>The trade-off is that you can't read the server response, but for this case it doesn't matter — if the script fails, the user sees a generic network error, not a custom message.</p>
<pre><code>await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // necessary for Apps Script
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});</code></pre>

<h2>Step 4 — Google Sheets as a database</h2>
<p>Sheets has four sheets with specific functions: <strong>SUBMISSIONS</strong> saves each quotation with timestamp and all fields, <strong>STATISTICS</strong> has formulas that automatically calculate metrics like total quotations and average budget, <strong>LOGS</strong> records each script event for debugging, and <strong>TEMPLATE</strong> defines the email format.</p>
<p>The advantage of Sheets over a real database is that you can view, filter, and export data without writing a single query.</p>

<h2>The special case: custom projects</h2>
<p>The form has two modes: the standard one with fixed prices, and a "custom project" mode for complex systems where the price can't be calculated without a technical interview.</p>
<p>When the user activates that mode, sections and features are disabled, the total shows "To be quoted" and the email I receive has subject <code>CUSTOM PROJECT REQUEST</code> to differentiate it visually in my inbox.</p>

<h2>Result and metrics</h2>
<p>The system has been in production for several weeks without incidents. The infrastructure cost is <strong>$0/month</strong> — everything runs on Google's free tier. The webhook response time is 800ms to 2 seconds, acceptable for a contact form.</p>
<p>The most valuable part was the learning: understanding that you don't always need complex architecture. Sometimes the simplest and cheapest solution is the correct one.</p>

<h2>When to use this approach and when not to</h2>
<p>This pattern works well for contact forms, quote generators, lead registrations, or any case where the volume is low (less than 100 submissions per day) and you don't need authentication or data relationships.</p>
<p>Don't use it if you need complex queries, transactions, user authentication, or more than 1000 daily operations. For those cases, a real backend on Railway or Render with PostgreSQL is the right choice.</p>
`
  },
  {
    id: 'fitness-data-integrity-refactor',
    title: 'Data Integrity & ML: Cleaning 11,600 Records with Python',
    excerpt: 'How to transform a dataset with 89% noise into a true churn prediction engine through audit and clustering techniques.',
    category: 'Data Science',
    readTime: 10,
    date: '2026-02-06',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    tags: ['Python', 'Clustering', 'ETL', 'Audit'],
    featured: true,
    slug: 'fitness-data-integrity-refactor',
    content: `
      <h2>The Integrity Challenge</h2>
      <p>In my recent refactoring of the <strong>FitNess App</strong> project, I encountered a scenario common in the industry: a massive but deeply corrupted dataset. Of 11,600 records, only 1,168 met referential integrity standards.</p>

      <h3>Senior Methodology</h3>
      <p>I implemented an ETL pipeline that prioritized <strong>data truthfulness</strong> over quantity. The result was reducing statistical noise by 89%, allowing the <strong>K-Means Clustering</strong> model to identify real churn risk profiles instead of data artifacts.</p>

      <h2>Business Insights</h2>
      <p>The analysis revealed that 45% of users abandoned by day 7 due to a failure in the onboarding flow, not lack of interest in HIIT or Strength content.</p>
    `
  },
  {
    id: 'python-data-analytics-guide',
    title: 'Python for Data Analytics: Survival Guide',
    excerpt: 'Master the essential tools of pandas and numpy to transform raw data into actionable insights.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Python', 'Pandas', 'KPIs', 'Analytics'],
    featured: true,
    slug: 'python-for-data-analytics-guide',
    content: `
      <h2>Introduction to Modern Data Analysis</h2>
      <p>In the era of Big Data, <strong>Python</strong> has established itself as the lingua franca of data science. Its syntactic simplicity combined with the raw power of libraries optimized in C and Fortran make it unbeatable. For a modern data analyst, it's not just a language, it's a Swiss Army knife capable of everything: from cleaning terabytes of logs to automating executive reports.</p>

      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop" alt="Data Analytics Dashboard" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <p>In this article, we'll focus on the <strong>Pandas</strong> and <strong>Numpy</strong> ecosystem, the cornerstones of any data pipeline, and how to use them to extract real value from information chaos.</p>

      <h2>Essential Pandas and Numpy Functions</h2>
      <p>After analyzing hundreds of production scripts, I've concluded that mastering these three functions will allow you to solve 80% of your daily data manipulation problems:</p>
      <ul>
        <li><strong>describe()</strong>: Your first contact with the dataset. Offers immediate statistical summary (mean, standard deviation, quartiles).</li>
        <li><strong>groupby()</strong>: The ultimate segmentation tool. Fundamental for cohort analysis and complex aggregations.</li>
        <li><strong>std()</strong> (Numpy): Calculating standard deviation is crucial for understanding volatility and detecting statistical anomalies that could skew your model.</li>
      </ul>

      <h3>Practical Implementation</h3>
      <p>To analyze a sales dataset and detect underperforming but high-volatility products, we use the following key functions:</p>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">🔧 Essential Functions</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li><strong class="text-primary">pd.read_csv()</strong> — Load data from CSV files</li>
          <li><strong class="text-primary">df.groupby()</strong> — Group data by category for cohort analysis</li>
          <li><strong class="text-primary">.agg()</strong> — Apply multiple aggregation functions (sum, mean, std)</li>
          <li><strong class="text-primary">np.std</strong> — Calculate standard deviation to detect volatility</li>
          <li><strong class="text-primary">.reset_index()</strong> — Convert grouped index into normal columns</li>
        </ul>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400 italic">💡 Tip: Filter products with margin < 15% to identify optimization opportunities</p>
      </div>

      <h2>The Analysis Lifecycle</h2>
      <p>A professional workflow is not linear, but follows rigorous steps to ensure insight integrity:</p>
      <ol>
        <li><strong>Cleaning (Cleaning)</strong>: 60% of the time. Handling null values (<code>fillna</code>, <code>dropna</code>) and correcting data types that often arrive corrupted from the source.</li>
        <li><strong>EDA (Exploratory Data Analysis)</strong>: Preliminary visualization and pattern detection using histograms and scatter plots.</li>
        <li><strong>Feature Engineering</strong>: Transform raw data into meaningful variables for the business.</li>
        <li><strong>Modeling</strong>: Application of statistical or Machine Learning algorithms.</li>
      </ol>

      <h2>Critical KPIs for Business</h2>
      <p>At the end of the day, business leaders don't consume code, they consume metrics. Your job is to translate bits into money or efficiency. Focus on calculating:</p>
      <ul>
        <li><strong>ROI (Return on Investment)</strong>: (Net Benefit / Cost) * 100. The king metric.</li>
        <li><strong>Conversion Rate</strong>: Percentage of users who perform a desired action. Vital for product.</li>
        <li><strong>Churn Rate</strong>: Customer cancellation rate. In SaaS models, reducing Churn is more profitable than acquiring new users.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>Python is the tool, but <strong>statistical thinking</strong> is the key skill.</li>
        <li>Don't underestimate the power of a simple <code>groupby()</code> to find hidden patterns.</li>
        <li>Clean your data obsessively; <em>Garbage In, Garbage Out</em>.</li>
        <li>Communicate your findings in the language of business (KPIs), not the language of programmers (Functions).</li>
      </ul>
    `
  },
  {
    id: 'estadistica-pareto-viz',
    title: 'Interpreting Statistical Graphs and Pareto Principle',
    excerpt: 'How to use data visualization to identify the 20% of causes that generate 80% of problems.',
    category: 'Performance',
    readTime: 8,
    date: '2025-01-02',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop',
    tags: ['Visualization', 'Statistics', 'Pareto', 'DataViz'],
    featured: true,
    slug: 'interpreting-graphs-pareto-principle',
    content: `
      <h2>Effective Data Visualization</h2>
      <p>The human brain processes images 60,000 times faster than text. One visualization is worth more than a thousand tables, but choosing the right graph is the difference between confusing your audience with "visual noise" or persuading them with clear data. In web performance and systems analysis, visualization is our primary diagnostic tool.</p>

      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Data analysis dashboard" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Visual Diagnostic Tools</h2>
      <p>There are hundreds of graph types, but these three are the workhorses of statistical analysis:</p>
      <ul>
        <li><strong>Histograms</strong>: Ideal for seeing the distribution of a numeric variable. Do your server response times follow a normal curve or have a long tail?</li>
        <li><strong>Boxplots (Box Diagrams)</strong>: Perfect for comparing distributions between groups and detecting <em>outliers</em> (atypical values) at a glance. Indispensable for comparing performance between app versions.</li>
        <li><strong>Scatter Plots (Scatter Diagrams)</strong>: The best option for visualizing the correlation between two continuous variables. Does CPU usage increase linearly with requests per second?</li>
      </ul>

      <h2>The Pareto Diagram: The 80/20 Rule</h2>
      <p>The Pareto principle, formulated by Vilfredo Pareto, states that often 80% of effects come from 20% of causes. In software engineering, this is a universal law:</p>
      <blockquote>
        80% of software errors are caused by 20% of bugs. 80% of traffic is handled by 20% of code.
      </blockquote>
      <p>A Pareto Diagram combines a bar chart (individual causes ordered by frequency) with a cumulative line (total percentage). Use it to prioritize which <em>bugs</em> to fix first or which endpoints to optimize for maximum impact with minimum effort.</p>



      <h2>Bars or Lines?</h2>
      <p>A common confusion. The rule is simple:</p>
      <ul>
        <li>Use <strong>Bar Charts</strong> to compare discrete categories (e.g. Sales by Country, Errors by Type).</li>
        <li>Use <strong>Line Charts</strong> exclusively for time series or continuous trends (e.g. User evolution by month, Latency over time).</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>Always prioritize based on data: Apply Pareto to identify where to invest your engineering resources.</li>
        <li>Context matters: A number without comparison (benchmark or historical) says nothing.</li>
        <li>Simplify: Remove every graphical element that doesn't convey information (Chartjunk).</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h3>The Visual Arsenal: 12 Graphs to Tell Stories</h3>
      <p>Having the best predictive model doesn't help much if no one understands what it says. Visualization is the language we use to translate complex math into clear business decisions.</p>

      <p class="mb-4">Here's the fundamental toolbox so your analyses don't end up forgotten in a drawer:</p>

      <ul class="list-disc pl-5 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Bars</strong>: The reliable classic. Use it to compare quantities between categories without complications (A vs B).</li>
        <li><strong>Histogram</strong>: To see the "shape" of your data. Is it a normal bell curve or is something weird?</li>
        <li><strong>Boxplot (Box and Whiskers)</strong>: The lie detector. Shows you where your data really is and exposes outliers without mercy.</li>
        <li><strong>Lines</strong>: Essential to see the past and project the future (time series).</li>
        <li><strong>Scatter Plot (Dispersion)</strong>: Do these two variables have a relationship or is it pure coincidence? You see it clearly here.</li>
        <li><strong>Heatmap (Heat Map)</strong>: Ideal for correlation matrices. Where it's intense red, there's a strong relationship.</li>
        <li><strong>Stacked Bars</strong>: To see the "whole" and its "parts" at the same time. Useful for compositions.</li>
        <li><strong>Pie (Pie Chart)</strong>: Use with great caution. Humans are bad at comparing angles; only use it for very obvious differences.</li>
        <li><strong>Violin Plot</strong>: Like a Boxplot but with more detail about density. Elegant, but sometimes confuses non-technical people.</li>
        <li><strong>Pair Plot</strong>: A bird's eye view of all possible relationships between your variables at once.</li>
        <li><strong>Area</strong>: Similar to line charts, but emphasizes accumulated volume over time.</li>
        <li><strong>Tree Map</strong>: Perfect for visualizing hierarchies and relative sizes at a glance.</li>
      </ul>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Pro Tip</h4>
        <p class="text-slate-700 dark:text-slate-300">Before opening Matplotlib, Seaborn, or Tableau, ask yourself: <strong>"What do I want the other person to see?"</strong>.</p>
        <p class="mt-4 text-slate-700 dark:text-slate-300">If the answer isn't clear, no graph will save you. The purpose of visualizing is to reduce the cognitive load of the person reading you so they can make a decision quickly.</p>
      </div>
    `
  },
  {
    id: 'react-vs-native-comparison',
    title: 'React vs React Native: The Definitive Comparison',
    excerpt: 'We analyze the architectural and performance differences to help you choose the right stack for your next project.',
    category: 'Frontend',
    readTime: 12,
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    tags: ['React', 'React Native', 'Mobile', 'Web'],
    featured: false,
    slug: 'react-vs-react-native-comparison',
    content: `
      <h2>Architecture and Fundamentals</h2>
      <p>Although they share the same DNA (and logo), React and React Native are different beasts under the hood. Choosing between a PWA (Progressive Web App) with React or a Native App with React Native is one of the most critical decisions at the start of a startup.</p>

      <p><strong>React</strong> (for web) manipulates the <em>Virtual DOM</em>, an in-memory representation of the UI, which is finally synced with the real DOM of the browser. It's universal, accessible from any device with internet.</p>

      <p><strong>React Native</strong>, on the other hand, doesn't use HTML or CSS. It uses a JavaScript thread that communicates through a "bridge" (Bridge) —or the new JSI architecture (JavaScript Interface)— to invoke real native components of iOS (UIKit/SwiftUI) and Android (Android Views/Jetpack Compose). The result is an app that feels, looks, and performs like a native.</p>

      <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Coding React Component" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Technical Comparison Table</h2>
      <div class="table-wrapper">
      <table class="w-full border-collapse border border-slate-700 my-6 text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="border border-slate-700 p-3">Feature</th>
            <th class="border border-slate-700 p-3">React (Web)</th>
            <th class="border border-slate-700 p-3">React Native</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Rendering</td>
            <td class="p-3">HTML/CSS in the browser (Virtual DOM).</td>
            <td class="p-3">Native Components (UIView, android.view).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Styles</td>
            <td class="p-3">Traditional CSS, CSS-in-JS, Tailwind.</td>
            <td class="p-3">StyleSheet (JS object) or NativeWind.</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Navigation</td>
            <td class="p-3">URL-based (React Router).</td>
            <td class="p-3">Stack/Screen-based (React Navigation).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Hardware Access</td>
            <td class="p-3">Limited by Web APIs of the browser (Bluetooth, Geo).</td>
            <td class="p-3">Full access (Native) to sensors, camera, AR, GPU.</td>
          </tr>
        </tbody>
      </table>
      </div>



      <h2>Conclusion</h2>
      <p>There's no absolute winner, just the right tool for the job.</p>
      <ul>
        <li>If you need <strong>SEO</strong>, instant distribution, and low acquisition costs: <strong>Web (React)</strong>.</li>
        <li>If you need <strong>native performance</strong>, reliable push notifications, deep hardware access, and presence in Stores: <strong>Mobile (React Native)</strong>.</li>
        <li>Best of both worlds? Investigate <strong>Expo Router</strong> and <strong>React Native Web</strong> to share up to 90% of the code.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>React Native renders real native views, it's not a WebView (like Ionic/Cordova).</li>
        <li>The learning curve is smooth if you already know React, but it requires learning about mobile ecosystems (XCode, Android Studio).</li>
        <li>The "Bridge" architecture is being replaced by JSI (direct C++ communication), making RN faster than ever.</li>
      </ul>
    `
  },
  {
    id: 'guia-estadistica-data-analyst',
    title: 'Statistics Guide for Data Analyst',
    excerpt: '45 concepts with real examples — everything I used in the FitNess App analysis',
    category: 'Data Science',
    readTime: 15,
    date: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Statistics', 'Data Science', 'Analytics', 'FitNess'],
    featured: true,
    slug: 'statistics-guide-data-analyst',
    content: `
      <h2>How to use this guide</h2>
      <p>Organized in 7 thematic blocks. Each concept has four sections: what it is, when to use it, a real example, and how it appears in interviews. Study 5 concepts per session — read, close, explain out loud.</p>
      <p><em>All concepts marked with ⚡ were applied directly in the FitNess App retention analysis.</em></p>

      <h2>Block 1 — Data Exploration (EDA)</h2>

      <h3>Mean (Average)</h3>
      <p>The sum of all values divided by the number of values. The 'center' of the data. Use it when you want to summarize a set of numeric data into a single representative value.</p>
      <p><strong>Real example:</strong> Your average customer ticket is $4,200. That's the mean of all tickets for the month.</p>

      <h3>Median</h3>
      <p>The central value of an ordered set. Half the data is above it, half below. More robust than the mean when there are outliers.</p>
      <p><strong>Real example:</strong> 9 employees earn $100K and 1 earns $1M — the average is $190K but the median is $100K. The median better reflects reality.</p>

      <h3>Mode</h3>
      <p>The value that appears most frequently. Useful for categorical data.</p>
      <p><strong>Real example:</strong> The most chosen subscription plan by users is monthly. That's the mode.</p>

      <h3>Variance and Standard Deviation</h3>
      <p>Measure how spread out the data is around the mean. High deviation indicates spread data, unpredictable behavior.</p>
      <p><strong>Real example:</strong> Average time in app: 30 min, deviation: 2 min → very consistent users. Deviation of 15 min → very variable behavior.</p>

      <h3>Range</h3>
      <p>Difference between the maximum and minimum value. First quick look at dispersion.</p>

      <h3>Percentiles and Quartiles</h3>
      <p>Divide ordered data into 100 equal parts (percentiles) or 4 equal parts (Q1=25%, Q2=50%, Q3=75%).</p>
      <p><strong>Real example:</strong> If the 90th percentile spending is $500, 90% of customers spend less than $500. Useful for identifying high-value customers.</p>

      <h3>Histogram</h3>
      <p>Bar graph showing the frequency distribution of a continuous numeric variable. First EDA tool.</p>

      <h3>Boxplot (Box and Whiskers Diagram)</h3>
      <p>Visualization showing median, Q1, Q3, and outliers in one graph. Ideal for comparing distributions between groups.</p>

      <h3>Outliers (Atypical Values) ⚡</h3>
      <p>Values that differ significantly from the rest. In the FitNess App analysis, 10,432 records with noise out of 11,600 total were detected — 89% outliers that invalidated the original dataset. The integrity audit reduced the dataset to 1,168 valid records.</p>

      <h2>Block 2 — Distribution Shape</h2>

      <h3>Normal Distribution</h3>
      <p>Symmetric distribution in bell shape. 68% of data falls within ±1 deviation, 95% within ±2, 99.7% within ±3. Basis of 80% of statistical tests.</p>

      <h3>Kurtosis: Leptokurtic</h3>
      <p>Distribution with high peak and heavy tails. Typical behavior with occasional extreme events.</p>

      <h3>Kurtosis: Mesokurtic</h3>
      <p>The standard normal distribution. Balanced and predictable behavior.</p>

      <h3>Kurtosis: Platykurtic</h3>
      <p>Flat distribution. Data very spread out without a clear typical value — you need to segment before drawing conclusions.</p>

      <h3>Positive and Negative Skewness</h3>
      <p>Positive: long tail to the right (few very high values). Negative: tail to the left. User incomes usually have positive skewness — most earn little, few earn a lot. Use median instead of mean.</p>

      <h2>Block 3 — Relationships Between Variables</h2>

      <h3>Pearson Correlation</h3>
      <p>Measures the strength and direction of the linear relationship between two numeric variables. Ranges from -1 to +1.</p>
      <p><strong>Real example:</strong> r=0.85 between exercise hours and user retention. More exercise, less abandonment.</p>

      <h3>Scatter Diagram</h3>
      <p>Graph showing the relationship between two numeric variables. Always visualize before calculating correlation.</p>

      <h3>Linear Regression</h3>
      <p>Models the relationship between a dependent variable (Y) and one or more independent variables (X). For predicting numeric values.</p>

      <h3>Logistic Regression ⚡</h3>
      <p>Predicts the probability of a binary event occurring (Yes/No). In FitNess App it was conceptually used to identify churn risk profiles (abandonment = 1, retention = 0).</p>

      <h3>Chi-squared</h3>
      <p>Test for categorical variables. Evaluates if there's an association between two categories. Example: does gender influence the chosen plan?</p>

      <h2>Block 4 — Group Comparison</h2>

      <h3>Student's t-test</h3>
      <p>Compares if the mean of a numeric variable is significantly different between two groups.</p>

      <h3>ANOVA</h3>
      <p>Extends the t-test to three or more groups. Detects if at least one group is significantly different.</p>

      <h3>Null Hypothesis (H₀) and Alternative (H₁) ⚡</h3>
      <p>H₀: no real difference. H₁: there is a difference. In FitNess App: H₀ = HIIT and Strength activities don't retain more users. H₁ = they do. The data rejected H₀ with p < 0.05.</p>

      <h3>P-value and Significance Level ⚡</h3>
      <p>The p-value is the probability of seeing your data if H₀ were true. Standard: p < 0.05. In the retention analysis, it was statistically validated that HIIT and Strength are retention drivers with p < 0.05.</p>

      <h3>Confidence Interval</h3>
      <p>Range of values within which the true population parameter falls with certain probability (usually 95%). Don't just say "the average is X" — say "the average is X with CI95% [min, max]".</p>

      <h2>Block 5 — Sampling and Inference</h2>

      <h3>Population vs Sample ⚡</h3>
      <p>In FitNess App the original dataset had 11,600 records but only 1,168 were valid (10%). The analysis was done on that representative sample after ETL audit.</p>

      <h3>Central Limit Theorem (CLT)</h3>
      <p>With samples of size n≥30, the distribution of their means follows a normal distribution regardless of the original distribution. Justifies using normal tests with non-normal data.</p>

      <h3>Random and Stratified Sampling</h3>
      <p>Stratified: you divide into groups and sample proportionally. Useful when you want to represent important subgroups (by age, plan, region).</p>

      <h2>Block 6 — Analysis Process</h2>

      <h3>EDA (Exploratory Analysis) ⚡</h3>
      <p>First phase of any analysis. In FitNess App: raw dataset exploration, detection of inconsistencies (89% of corrupted records), analysis of activity distribution and sessions per user.</p>

      <h3>ETL (Extract, Transform, Load) ⚡</h3>
      <p>In FitNess App: raw CSV extraction → detection of 10,432 inconsistent records → cleansing and consolidation of 1,168 valid records → DAU/MAU metrics and Sticky Factor analysis.</p>

      <h3>Referential Integrity Audit ⚡</h3>
      <p>Systematic verification that data complies with consistency rules: unique IDs, valid ranges, field relationships. In FitNess App it was applied to 11,600 records and 89% were found to have corrupted or inconsistent data.</p>

      <h3>Null Values and Data Cleaning ⚡</h3>
      <p>In FitNess App nulls and out-of-range values were the main cause of the 10,432 discarded records. The rule: never impute when the null has business meaning.</p>

      <h3>Normalization and Standardization ⚡</h3>
      <p>Before K-Means, variables were standardized (usage frequency, activity type, active days) with z-score so no variable dominated clustering by its scale.</p>

      <h2>Block 7 — Basic Machine Learning</h2>

      <h3>K-Means Clustering ⚡</h3>
      <p>Algorithm that groups data into k clusters minimizing distance to centroid. In FitNess App it was applied to 1,168 valid users to segment churn risk profiles. Three profiles were identified: high retention (HIIT/Strength), medium risk, and high abandonment risk.</p>

      <h3>Elbow Method ⚡</h3>
      <p>Technique for choosing the optimal number of clusters k. In FitNess App, inertia was plotted for k=2 to k=6 and the elbow appeared at k=3, mathematically justifying the three segments.</p>

      <h3>Coefficient of Variability</h3>
      <p>Standard deviation divided by the mean. Allows comparing variability between sets with different scales.</p>

      <h3>Analysis Types: Descriptive, Diagnostic, Predictive, Prescriptive ⚡</h3>
      <p>The FitNess App analysis covered all 4 levels: <strong>Descriptive</strong> (churn is 65%), <strong>Diagnostic</strong> (cause is Day 0 activation failure and low HIIT/Strength frequency), <strong>Predictive</strong> (users without HIIT activity in first 2 weeks have 80% abandonment probability), <strong>Prescriptive</strong> (Day 0 onboarding program with guided HIIT session).</p>

      <h2>Additional concepts from FitNess App analysis</h2>

      <h3>Sticky Factor (DAU/MAU) ⚡</h3>
      <p>Metric that measures real app engagement: daily active users divided by monthly active users. 20% Sticky Factor means the average user uses the app 6 days per month. In FitNess App it was used to identify "sticky" users (high frequency) as a reference for desired behavior.</p>

      <h3>Churn Rate ⚡</h3>
      <p>Percentage of users abandoning the service in a period. In FitNess App: initial 65% churn, goal to reduce to 45% through segmentation and early activation strategies.</p>

      <h3>Activation Failure (Day 0) ⚡</h3>
      <p>Product analytics concept: the critical moment where the new user doesn't experience product value. In FitNess App it was detected that users without guided session on their first day had 3x higher abandonment probability than those with one.</p>

      <h3>DAU / MAU (Daily / Monthly Active Users) ⚡</h3>
      <p>Standard engagement metrics in digital products. DAU: unique active users in a day. MAU: unique active users in a month. The DAU/MAU relationship defines the Sticky Factor.</p>

      <h2>Quick decision table</h2>
      <table>
        <thead>
          <tr><th>Business Question</th><th>Variable Type</th><th>Tool</th></tr>
        </thead>
        <tbody>
          <tr><td>What do our users earn on average?</td><td>Numeric, 1 group</td><td>Mean / Median</td></tr>
          <tr><td>Which plan do they choose most?</td><td>Categorical, 1 variable</td><td>Mode / Frequency</td></tr>
          <tr><td>More marketing, more sales?</td><td>2 numeric variables</td><td>Correlation + Regression</td></tr>
          <tr><td>Difference between group A and B?</td><td>Numeric, 2 groups</td><td>t-test</td></tr>
          <tr><td>Difference between A, B and C?</td><td>Numeric, 3+ groups</td><td>ANOVA</td></tr>
          <tr><td>Does gender influence chosen plan?</td><td>2 categorical variables</td><td>Chi-squared</td></tr>
          <tr><td>Who will churn?</td><td>Binary dependent variable</td><td>Logistic regression</td></tr>
          <tr><td>How do I segment my users?</td><td>No previous labels</td><td>K-Means</td></tr>
          <tr><td>Is this difference real or chance?</td><td>Any</td><td>P-value + Hypothesis</td></tr>
          <tr><td>What was my abandonment rate?</td><td>Active users</td><td>Churn Rate + DAU/MAU</td></tr>
        </tbody>
      </table>
    `
  }
];

export const featuredPosts = blogPosts.filter(post => post.featured);

// Dynamic category calculation
export const categories = [
  { id: 'all', label: 'All', count: blogPosts.length },
  ...Array.from(new Set(blogPosts.map(post => post.category))).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat,
    count: blogPosts.filter(post => post.category === cat).length
  }))
];

export default blogPosts;
