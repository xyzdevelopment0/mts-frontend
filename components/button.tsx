import { cn } from '@/utils/cn'

export const Button = ({
	className,
	...props
}: React.ComponentProps<'button'>) => (
	<button
		data-slot='button'
		className={cn(
			'relative flex cursor-pointer items-center justify-center font-medium whitespace-nowrap transition-all select-none',
			'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&:disabled]:cursor-not-allowed [&:disabled_svg]:opacity-30',
			'focus-visible:ring-purple-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none',
			'aria-invalid:focus-visible:ring-0',
			'corner-superellipse/1.125 bg-purple-4 disabled:bg-purple-2 dark:disabled:bg-bg-3 text-white enabled:hover:opacity-90 disabled:text-white dark:disabled:text-white',
			'h-11 gap-2 rounded-full active:scale-99 data-[pressed]:scale-99',
			className
		)}
		{...props}
	/>
)
