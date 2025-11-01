/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "4000",
                pathname: "/uploads/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/uploads/**",
            },
            {
                protocol: "http",
                hostname: "20.6.131.175", // AZURE VM Public URL
                port: "5000",
                pathname: "/uploads/**",
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_API_STATIC_URL: process.env.NEXT_PUBLIC_API_STATIC_URL,
    },
};

export default nextConfig;
