'use client'

import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'rows'> & {
	minRows?: number
}

export const Textarea = ({
	className,
	minRows = 5,
	onInput,
	value,
	defaultValue,
	...props
}: TextareaProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const resize = () => {
		if (!textareaRef.current) {
			return
		}

		textareaRef.current.style.height = 'auto'
		textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
	}

	useEffect(() => {
		resize()
	}, [value, defaultValue, minRows])

	return (
		<textarea
			ref={textareaRef}
			rows={minRows}
			data-slot='textarea'
			className={cn(
				'bg-[#f5f5f5] text-[#181925] file:text-[#181925] placeholder:text-[#b3b3b3]',
				'outline-2 outline-transparent focus:ring-2 focus:ring-[#dad9fc] focus:outline-[#918df6]',
				'w-full rounded-lg px-4 py-2.5',
				'backdrop-blur-md transition-all',
				'resize-none overflow-hidden font-medium',
				className
			)}
			onInput={event => {
				resize()
				onInput?.(event)
			}}
			value={value}
			defaultValue={defaultValue}
			{...props}
		/>
	)
}
