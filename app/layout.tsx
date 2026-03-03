import type { Metadata } from 'next'
import '@/assets/globals.css'

export const metadata: Metadata = {
	title: 'mts',
	description: 'mts'
}

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
