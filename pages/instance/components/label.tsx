type LabelProps = {
	icon?: React.ReactNode
	children: React.ReactNode
}

export const Label = ({ icon, children }: LabelProps) => (
	<p className='row-center text-fg-2 mb-2 w-fit gap-1.5'>
		{icon ? <span className='text-fg-2'>{icon}</span> : null}
		<span>{children}</span>
	</p>
)
