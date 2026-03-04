import { Navigation } from '@/features/navigation'

type LayoutProps = Readonly<{
	children: React.ReactNode
}>

const DashboardLayout = ({ children }: LayoutProps) => (
	<>
		<div className='min-h-dvh pb-24'>{children}</div>
		<Navigation />
	</>
)

export default DashboardLayout
