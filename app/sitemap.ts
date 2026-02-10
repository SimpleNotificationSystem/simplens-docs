import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://simplens.in';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/changelog`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/plugins/official`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/plugins/community`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Documentation pages - Core
    const corePages = [
        'getting-started',
        'configuration',
        'core-concepts',
        'api-reference',
        'architecture',
        'admin-dashboard',
        'self-hosting',
        'local-development',
        'troubleshooting',
    ];

    const coreDocs: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/docs/core`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...corePages.map((page) => ({
            url: `${BASE_URL}/docs/core/${page}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];

    // Documentation pages - SDK
    const sdkPages = [
        'api-reference',
        'building-plugin',
        'manifest',
        'plugin-interface',
        'schemas',
        'utilities',
    ];

    const sdkDocs: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/docs/sdk`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...sdkPages.map((page) => ({
            url: `${BASE_URL}/docs/sdk/${page}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ];

    // Documentation pages - Plugins
    const pluginPages = [
        'official-plugins/mock',
        'official-plugins/nodemailer-gmail',
        'official-plugins/resend',
    ];

    const pluginDocs: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/docs/plugins`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...pluginPages.map((page) => ({
            url: `${BASE_URL}/docs/plugins/${page}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];

    return [...staticPages, ...coreDocs, ...sdkDocs, ...pluginDocs];
}
