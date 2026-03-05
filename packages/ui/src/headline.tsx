type HeadlineProps = {
	title: React.ReactNode
	description: React.ReactNode
}

export const Headline = ({ title, description }: HeadlineProps) => (
	<div className='flex flex-col items-center gap-0.5'>
		<h1 className='text-fg-4 text-center text-xl font-medium'>{title}</h1>
		<p className='text-fg-2 text-center'>{description}</p>
	</div>
)
