import type { Metadata } from 'next'
import Script from 'next/script'
import { Navigation } from '@/features/navigation'
import '@/assets/globals.css'

export const metadata: Metadata = {
	title: 'mts',
	description: 'mts',
}

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const visitorsNowToken = process.env.VISITORS_NOW_TOKEN

const RootLayout = ({ children }: LayoutProps) => (
	<html lang='en'>
		{visitorsNowToken ? (
			<head>
				<Script
					src='https://cdn.visitors.now/v.js'
					data-token={visitorsNowToken}
				/>
			</head>
		) : null}
		<body>
			<div className='min-h-dvh pb-24'>{children}</div>
			<Navigation />
		</body>
	</html>
)

export default RootLayout
