/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/services/:slug*",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/doctors",
        destination: "/#doctors",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
