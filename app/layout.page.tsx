import type { Metadata } from 'next'
import Script from 'next/script'
import '@/assets/globals.css'

export const metadata: Metadata = {
	title: 'Облачная платформа',
	description: 'Панель управления облачной инфраструктурой',
}

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const RootLayout = ({ children }: LayoutProps) => (
	<html lang='ru'>
		<head>
			<Script
				src='https://cdn.visitors.now/v.js'
				data-token='1b47bb81-d68c-43db-a743-57d9b365f030'
			/>
		</head>
		<body>{children}</body>
	</html>
)

export default RootLayout
