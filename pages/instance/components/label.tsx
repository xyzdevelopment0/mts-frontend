type LabelProps = {
	children: React.ReactNode
}

export const Label = ({ children }: LabelProps) => (
	<p className='mb-2'>{children}</p>
)
