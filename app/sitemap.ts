import { MetadataRoute } from 'next';

// This data structure should ideally be fetched or imported from a shared source of truth
// (e.g., a lib/posts.ts file or an API).
// For now, it's based on the example from your app/blog/[slug]/page.tsx.
// Please ensure this array is kept up-to-date with all your blog posts.
const blogPostSlugsAndDates: Array<{ slug: string; date: string }> = [
  {
    slug: "resolving-cursor-ai-client-closed-error-mcp-guide",
    date: "2024-05-12", // Make sure this is the publication or last significant update date
  },
  // Add other blog posts here, for example:
  // { slug: "another-post-slug", date: "2024-04-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://huikai.tech';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/card-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 }, // Blog listing page
    { url: `${baseUrl}/books`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reminder`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tech-stack`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPostSlugsAndDates.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date), // Uses the date from blogPostSlugsAndDates
    changeFrequency: 'yearly', // Adjust if posts are updated more frequently
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogPages,
  ];
}
