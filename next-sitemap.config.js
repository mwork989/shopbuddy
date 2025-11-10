/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  outDir: "public",
  transform: async (config, path) => {
    if (path.includes("/dashboard")) return null;

    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `${config.siteUrl}/en`, hreflang: "en" },
        { href: `${config.siteUrl}/es`, hreflang: "es" },
      ],
    };
  },
  additionalPaths: async () => [{ loc: "/en" }, { loc: "/es" }],
  exclude: ["/en/dashboard", "/es/dashboard"],
};
