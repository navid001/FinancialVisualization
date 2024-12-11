import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
      {
          url: "https://financial-visualization.vercel.app",
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 1,
      },
  ];
}