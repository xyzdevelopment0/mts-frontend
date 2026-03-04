import { cn } from '@/utils/cn'

type HeaderContainerProps = {
	children: React.ReactNode
}

export const HeaderContainer = ({ children }: HeaderContainerProps) => (
	<header
		className={cn('fixed top-0 right-0 left-0 z-50 flex flex-col')}
		data-base-ui-inert=''
	>
		<div
			className={cn(
				'bg-background pointer-events-none absolute top-0 right-0 left-0 z-50',
				'md:hidden'
			)}
			style={{ height: 'calc(6px + env(safe-area-inset-top))' }}
		/>
		<div
			className={cn(
				'pointer-events-none absolute top-0 right-0 -bottom-4 left-0',
				'bg-background/10 backdrop-blur-lg'
			)}
			style={{
				mask: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%)',
			}}
		/>
		<div className='relative pt-[env(safe-area-inset-top)]'>
			<div
				className={cn(
					'pointer-events-none absolute top-0 right-0 left-0 h-8',
					'from-background bg-linear-to-b to-transparent',
					'md:hidden'
				)}
			/>
			<div className='relative mx-auto flex w-full max-w-[800px] items-center justify-between px-6 py-4'>
				{children}
			</div>
		</div>
	</header>
)
