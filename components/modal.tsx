'use client'

import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ')

const getFocusableElements = (container: HTMLElement) =>
	Array.from(
		container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
	).filter(
		element =>
			!element.hasAttribute('disabled') &&
			element.getAttribute('aria-hidden') !== 'true' &&
			(element.offsetWidth > 0 ||
				element.offsetHeight > 0 ||
				element.getClientRects().length > 0)
	)

const MODAL_TRANSITION = {
	type: 'spring' as const,
	duration: 0.3,
	bounce: 0,
}

type ModalContextValue = {
	titleId: string
	descriptionId: string
	setHasTitle: React.Dispatch<React.SetStateAction<boolean>>
	setHasDescription: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextValue | null>(null)

const useModalContext = () => {
	const context = useContext(ModalContext)

	if (!context) {
		throw new Error('Modal slot components must be used inside Modal.')
	}

	return context
}

type ModalProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	children: React.ReactNode
	className?: string
	overlayClassName?: string
	closeOnEscape?: boolean
	closeOnOverlayClick?: boolean
}

export const Modal = ({
	open,
	onOpenChange,
	children,
	className,
	overlayClassName,
	closeOnEscape = true,
	closeOnOverlayClick = true,
}: ModalProps) => {
	const [hasTitle, setHasTitle] = useState(false)
	const [hasDescription, setHasDescription] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const previousFocusRef = useRef<HTMLElement | null>(null)
	const titleId = useId()
	const descriptionId = useId()

	useEffect(() => {
		if (!open) {
			return
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [open])

	useEffect(() => {
		if (!open) {
			return
		}

		previousFocusRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null

		window.requestAnimationFrame(() => {
			const content = contentRef.current

			if (!content) {
				return
			}

			const focusableElements = getFocusableElements(content)
			const nextFocus = focusableElements[0] ?? content
			nextFocus.focus()
		})

		return () => {
			previousFocusRef.current?.focus()
		}
	}, [open])

	useEffect(() => {
		if (!open) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeOnEscape) {
				event.preventDefault()
				onOpenChange(false)
				return
			}

			if (event.key !== 'Tab') {
				return
			}

			const content = contentRef.current

			if (!content) {
				return
			}

			const focusableElements = getFocusableElements(content)

			if (focusableElements.length === 0) {
				event.preventDefault()
				content.focus()
				return
			}

			const firstFocusable = focusableElements[0]
			const lastFocusable = focusableElements[focusableElements.length - 1]
			const activeElement = document.activeElement

			if (!content.contains(activeElement)) {
				event.preventDefault()
				firstFocusable.focus()
				return
			}

			if (event.shiftKey && activeElement === firstFocusable) {
				event.preventDefault()
				lastFocusable.focus()
				return
			}

			if (!event.shiftKey && activeElement === lastFocusable) {
				event.preventDefault()
				firstFocusable.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [open, closeOnEscape, onOpenChange])

	if (typeof window === 'undefined') {
		return null
	}

	return createPortal(
		<AnimatePresence>
			{open ? (
				<div
					data-slot='dialog-portal'
					className={cn(
						'fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6'
					)}
				>
					<motion.div
						data-slot='dialog-overlay'
						aria-hidden='true'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={MODAL_TRANSITION}
						className={cn(
							'bg-bg-a4/70 fixed inset-0 backdrop-blur-[1px]',
							overlayClassName
						)}
						onMouseDown={() => {
							if (closeOnOverlayClick) {
								onOpenChange(false)
							}
						}}
					/>
					<ModalContext.Provider
						value={{ titleId, descriptionId, setHasTitle, setHasDescription }}
					>
						<motion.div
							ref={contentRef}
							data-open=''
							data-slot='dialog-content'
							role='dialog'
							aria-modal='true'
							aria-labelledby={hasTitle ? titleId : undefined}
							aria-describedby={hasDescription ? descriptionId : undefined}
							tabIndex={-1}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={MODAL_TRANSITION}
							className={cn(
								'bg-background relative z-10 grid h-[440px] w-full max-w-[360px] overflow-hidden rounded-3xl shadow-md',
								'corner-superellipse/1.125 outline-none',
								className
							)}
							onMouseDown={event => event.stopPropagation()}
						>
							{children}
						</motion.div>
					</ModalContext.Provider>
				</div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

export const ModalHeader = ({
	className,
	...props
}: React.ComponentProps<'div'>) => (
	<div
		data-slot='dialog-header'
		className={cn(
			'flex flex-col items-center gap-2.5 px-6 pt-6 pb-0 text-center sm:text-left',
			className
		)}
		{...props}
	/>
)

type ModalTitleProps = Omit<React.ComponentProps<'h2'>, 'id'>

export const ModalTitle = ({ className, ...props }: ModalTitleProps) => {
	const { titleId, setHasTitle } = useModalContext()

	useEffect(() => {
		setHasTitle(true)

		return () => {
			setHasTitle(false)
		}
	}, [setHasTitle])

	return (
		<h2
			id={titleId}
			data-slot='dialog-title'
			className={cn(
				'text-fg-4 text-center text-xl leading-tight font-medium text-balance',
				className
			)}
			{...props}
		/>
	)
}

type ModalDescriptionProps = Omit<React.ComponentProps<'p'>, 'id'>

export const ModalDescription = ({
	className,
	...props
}: ModalDescriptionProps) => {
	const { descriptionId, setHasDescription } = useModalContext()

	useEffect(() => {
		setHasDescription(true)

		return () => {
			setHasDescription(false)
		}
	}, [setHasDescription])

	return (
		<p
			id={descriptionId}
			data-slot='dialog-description'
			className={cn('text-fg-3 max-w-xs text-center text-balance', className)}
			{...props}
		/>
	)
}

export const ModalMain = ({
	className,
	...props
}: React.ComponentProps<'div'>) => (
	<div
		data-slot='dialog-main'
		className={cn('flex w-full flex-col gap-4 px-6 py-5', className)}
		{...props}
	/>
)

export const ModalFooter = ({
	className,
	...props
}: React.ComponentProps<'div'>) => (
	<div
		data-slot='dialog-footer'
		className={cn(
			'flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end',
			className
		)}
		{...props}
	/>
)
