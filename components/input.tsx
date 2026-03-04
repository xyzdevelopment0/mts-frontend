import { cn } from '@/utils/cn'

export const Input = ({
	className,
	...props
}: React.ComponentProps<'input'>) => (
	<input
		data-slot='input'
		className={cn(
			'bg-[#f5f5f5] text-[#181925] file:text-[#181925] placeholder:text-[#b3b3b3]',
			'outline-2 outline-transparent focus:ring-2 focus:ring-[#dad9fc] focus:outline-[#918df6]',
			'h-10 w-full rounded-lg px-4',
			'backdrop-blur-md transition-all',
			'font-medium',
			className
		)}
		{...props}
	/>
)
