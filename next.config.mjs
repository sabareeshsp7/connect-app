/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["img.clerk.com", "utfs.io"],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/conversations',
                permanent: true,
            },
        ];
    }
};

export default nextConfig;
