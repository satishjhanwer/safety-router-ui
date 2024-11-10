/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['nextjs.org'], // Add any other domains you need
    },
    // Add any environment variables you want to expose to the browser
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    logging: {
        level: 'info',
        fetches: {
            fullUrl: true,
        },
    },
    experimental: {
        serverComponentsExternalPackages: ['mongoose']
    }
};

export default nextConfig;
