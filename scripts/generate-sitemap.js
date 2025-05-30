const episodes = require('../public/episodes/database.json');

const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, '../public/sitemap.xml');
const baseUrl = 'https://adamscast.ir';

const paths = [
    '/',
    '/donate',
    '/about',
    '/how',
    ...episodes.map(episode => {
        return `/episode/${episode.slug}`;
    })
];

const generateSitemap = () => {
    const urls = paths.map(path => {
        return `<url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
</url>`;
    }
    ).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync(output, sitemap, 'utf8');
    console.log(`Sitemap generated at ${output}`);
}

if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output), { recursive: true });
}

generateSitemap();