import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	transpilePackages: [
		'@repo/api-client',
		'@repo/assets',
		'@repo/shell',
		'@repo/types',
		'@repo/ui',
		'@repo/utils',
	],
}

export default nextConfig
