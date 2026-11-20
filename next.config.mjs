/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output: no server, no third-party services, easy to host anywhere.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
