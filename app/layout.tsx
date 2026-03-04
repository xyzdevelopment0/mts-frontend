import type { Metadata } from 'next'
import Script from 'next/script'
import '@/assets/globals.css'

export const metadata: Metadata = {
	title: 'mts',
	description: 'mts',
}

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang='en'>
			<head>
				<Script
					src='https://cdn.visitors.now/v.js'
					data-token='0128e893-cfef-4a94-b41b-1aae801b8438'
				/>
			</head>
			<body>{children}</body>
		</html>
	)
}
