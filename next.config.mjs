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
};

export default nextConfig;