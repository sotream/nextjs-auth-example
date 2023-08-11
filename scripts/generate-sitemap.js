/* eslint-disable */
const fs = require('fs');
const { format } = require('date-fns');
const prettier = require('prettier');

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc');

    // Dynamic import globby
    const { globby } = await import('globby');

    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        'src/pages/**/*{.tsx,.mdx}',
        '!src/pages/_*.tsx',
        '!src/pages/api'
    ]);

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
            .map((page) => {
                const path = page
                    .replace('src/pages', '')
                    .replace('.tsx', '')
                    .replace('.mdx', '')
                    .replace('/index', '');
                const route = path === '/index' ? '' : path;
                let routePriority = '0.7';

                if (route.includes('/courses')) {
                    routePriority = '0.9';
                } else if (!route) {
                    routePriority = '1.0'
                } else {
                    routePriority = '0.8';
                }

                return `
                        <url>
                            <loc>${`https://example.com${route}`}</loc>
                             <lastmod>${`${format(new Date(), 'yyyy-MM-dd')}`}</lastmod>
                            <changefreq>monthly</changefreq>
                            <priority>${routePriority}</priority>
                        </url>
                    `;
            })
            .join('')}
        </urlset>
    `;

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    fs.writeFileSync('public/sitemap.xml', formatted);
})();
