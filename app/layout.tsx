import type { Metadata } from 'next'
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
		<body>{children}</body>
	</html>
)

export default RootLayout
