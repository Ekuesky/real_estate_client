/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Fast Refresh nécessite React Strict Mode
  	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
			},
		],
	},
	output: "standalone",

	experimental: {
    turbo: {
      loaders: {
        // Configure loaders for specific file extensions if needed
      }
    }
  }
};

export default nextConfig;