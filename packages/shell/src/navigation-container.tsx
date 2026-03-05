'use client'

type NavigationContainerProps = {
	children: React.ReactNode
}

export const NavigationContainer = ({ children }: NavigationContainerProps) => (
	<div className='dark fixed bottom-0 left-1/2 z-50 max-w-full -translate-x-1/2 gap-2 px-5'>
		<div className='pb-safe-offset-4 col gap-2'>
			<div className='corner-superellipse/1.125 bg-background relative z-40 min-h-[42px] max-w-full overflow-hidden rounded-[20px] bg-clip-padding shadow-md backdrop-blur-md'>
				<nav className='row-center h-[42px] justify-center gap-1 px-1 py-1'>
					{children}
				</nav>
			</div>
		</div>
	</div>
)
