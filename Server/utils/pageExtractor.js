import axios from "axios";
import robotsParser from "robots-parser";
import Sitemapper from "sitemapper";

const USER_AGENT = "Compana/1.0";

async function getAllAllowedPages(siteUrl) {
  const robotsUrl = `${siteUrl}/robots.txt`;
  const robotsTxt = await axios.get(robotsUrl).then(r => r.data);
  const robots = robotsParser(robotsUrl, robotsTxt);

  const sitemaps = robots.getSitemaps();

  if (!sitemaps.length) {
    console.warn("⚠️ No sitemap found in robots.txt");
    return [];
  }

  const allowedUrls = new Set();

  for (const sitemapUrl of sitemaps) {
    const sitemap = new Sitemapper({
      url: sitemapUrl,
      timeout: 15000
    });

    const { sites } = await sitemap.fetch();

    for (const url of sites) {
      if (robots.isAllowed(url, USER_AGENT)) {
        allowedUrls.add(url);
      }
    }
  }

  //   let category = pageCategories.find(cat => url.includes(cat));
    
  //   // Handle home page
  //   if (!category && (url === siteUrl || url === `${siteUrl}/`)) {
  //     category = "home";
  //   }
    
  //   return { url, category: category || "other" };
  // })

  // const categoryGroup = categorizedUrls.reduce((acc, curr) => {
  //   if (!acc[curr.category]) {
  //     acc[curr.category] = [];
  //   }
  //   acc[curr.category].push(curr.url);
  //   return acc;
  // }, {});

  return allowedUrls;
}

export default getAllAllowedPages;