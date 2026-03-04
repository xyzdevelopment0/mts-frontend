type AuthHeadlineProps = {
	title: string
	description: string
}

export const AuthHeadline = ({ title, description }: AuthHeadlineProps) => (
	<div className='flex flex-col items-center gap-0.5'>
		<h1 className='text-fg-4 text-xl font-medium'>{title}</h1>
		<p className='text-fg-2 text-center'>{description}</p>
	</div>
)
