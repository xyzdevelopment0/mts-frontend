import { cn } from '@repo/utils/cn'
import { RootSnippet } from './root-snippet'

type BaseProps = {
	value: string | number
	className?: string
}

type ItemProps = BaseProps & {
	label: string
}

const SshSnippetItem = ({ label, value, className }: ItemProps) => (
	<div className={cn('col gap-1', className)}>
		<span className='text-fg-3 text-xs font-medium'>{label}</span>
		<RootSnippet value={String(value)} />
	</div>
)

export const SshUserSnippet = ({ value, className }: BaseProps) => (
	<SshSnippetItem label='SSH user' value={value} className={className} />
)

export const SshPasswordSnippet = ({ value, className }: BaseProps) => (
	<SshSnippetItem label='SSH password' value={value} className={className} />
)

export const SshHostSnippet = ({ value, className }: BaseProps) => (
	<SshSnippetItem label='SSH host' value={value} className={className} />
)

export const SshPortSnippet = ({ value, className }: BaseProps) => (
	<SshSnippetItem label='SSH port' value={value} className={className} />
)
