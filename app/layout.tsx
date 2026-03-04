import type { Metadata } from 'next'
import { Navigation } from '@/features/navigation'
import '@/assets/globals.css'

export const metadata: Metadata = {
	title: 'mts',
	description: 'mts',
}

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const RootLayout = ({ children }: LayoutProps) => (
	<html lang='en'>
		<body>
			<div className='min-h-dvh pb-24'>{children}</div>
			<Navigation />
		</body>
	</html>
)

export default RootLayout
