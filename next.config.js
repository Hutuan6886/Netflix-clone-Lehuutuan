/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  eslint: { ignoreduringbuilds: true },
  images: {
    domains: ["upload.wikimedia.org","uhdtv.io","mango.blender.org","download.blender.org","i.ytimg.com","cdn.gamma.app","nld.mediacdn.vn"],
  },
};
