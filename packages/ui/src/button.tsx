import { cn } from '@repo/utils/cn'

type ButtonProps = React.ComponentProps<'button'> & {
	size?: 'md' | 'sm'
	variant?: 'primary' | 'secondary'
	icon?: React.ReactNode
}

export const Button = ({
	size = 'md',
	variant = 'primary',
	icon,
	children,
	className,
	...props
}: ButtonProps) => {
	const hasLabel =
		children !== undefined && children !== null && children !== false

	return (
		<button
			data-slot='button'
			className={cn(
				'relative flex cursor-pointer items-center justify-center font-medium whitespace-nowrap transition-all select-none',
				'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&:disabled]:cursor-not-allowed [&:disabled_svg]:opacity-30',
				'focus-visible:ring-purple-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none',
				'aria-invalid:focus-visible:ring-0',
				'corner-superellipse/1.125 rounded-full active:scale-99 data-[pressed]:scale-99',
				variant === 'primary'
					? 'bg-purple-4 disabled:bg-purple-2 dark:disabled:bg-bg-3 text-white enabled:hover:opacity-90 disabled:text-white dark:disabled:text-white'
					: 'bg-bg-2 text-fg-4 enabled:hover:bg-bg-3 disabled:bg-bg-2 disabled:text-fg-1',
				size === 'sm' ? 'h-9 text-sm' : 'h-11',
				hasLabel
					? size === 'sm'
						? 'gap-1.5 px-3.5'
						: 'gap-2 px-5'
					: 'aspect-square gap-0 px-0',
				className
			)}
			{...props}
		>
			{icon}
			{children}
		</button>
	)
}
