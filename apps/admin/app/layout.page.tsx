import type { Metadata } from 'next'
import Script from 'next/script'
import { Agentation } from 'agentation'
import './globals.css'

export const metadata: Metadata = {
	title: 'Админ-панель',
	description: 'Панель администрирования облачной платформы',
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
		<body>
			{children}
			{process.env.NODE_ENV === 'development' && <Agentation />}
		</body>
	</html>
)

export default RootLayout
