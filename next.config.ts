import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    allowedDevOrigins: ['192.168.*.*'],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'api-pizza-earth.sebastien-petit.fr',
                pathname: '/images/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.pizza-earth.sebastien-petit.fr' }],
                destination: 'https://pizza-earth.sebastien-petit.fr/:path*',
                permanent: true,
            },
        ]
    }
};

export default nextConfig;
