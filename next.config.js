/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	env: {
		mongodb_username: 'pawel',
		mongodb_password: 'rjK3WI0uy7kHEEx5',
		mongodb_clustername: 'cluster0',
		mongodb_database: 'entertainment-web-app',
	},
}

module.exports = nextConfig
