/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		})
		return config
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
	env: {
		API_URL: process.env.API_URL,
	},
	reactStrictMode: false
}

module.exports = nextConfig