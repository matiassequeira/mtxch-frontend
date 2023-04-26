/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['i.seadn.io', 'via.placeholder.com', 'ipfs.io'],
    },
};

module.exports = nextConfig;
