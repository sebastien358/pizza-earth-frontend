import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
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
                hostname: 'api-pizzeria.sebastien-petit.fr',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
