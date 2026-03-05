import { cn } from '@repo/utils/cn'

const DOT_XS = Array.from({ length: 21 }, (_, index) => 5 + index * 10)
const DOT_YS = Array.from({ length: 14 }, (_, index) => 5 + index * 10)

type InstancesEmptyIllustrationProps = React.ComponentProps<'svg'>

export const InstancesEmptyIllustration = ({
	className,
	...props
}: InstancesEmptyIllustrationProps) => (
	<svg
		width='215'
		height='140'
		viewBox='0 0 215 140'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('h-auto w-full', className)}
		{...props}
	>
		{DOT_YS.flatMap(y =>
			DOT_XS.map(x => (
				<rect
					key={`${x}-${y}`}
					x={x}
					y={y}
					width='1'
					height='1'
					fill='var(--color-bg-4)'
				/>
			))
		)}
		<path
			d='M112.592 75.3644V93.2439C112.592 94.1234 112.096 94.9277 111.31 95.322L93.6597 104.178C93.0053 104.506 92.2345 104.507 91.5793 104.18L73.9121 95.3671C73.1235 94.9737 72.625 94.1681 72.625 93.2867V75.3698C72.625 74.4928 73.1186 73.6902 73.9014 73.2947L81.2742 69.5687L91.5791 74.7211C92.2343 75.0487 93.0057 75.0485 93.6607 74.7202L102.315 70.3824L103.966 69.5454L111.322 73.2928C112.101 73.6897 112.592 74.4902 112.592 75.3644Z'
			fill='var(--color-bg-1)'
			stroke='var(--color-fg-3)'
			strokeWidth='1.1'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M112.592 45.8843V54.1997L102.865 59.1072C102.528 59.2772 102.315 59.6225 102.315 60V70.3817L93.6607 74.7195C93.0057 75.0477 92.2343 75.0482 91.5791 74.7204L81.2742 69.568L73.9103 65.8859C73.1225 65.492 72.625 64.6868 72.625 63.8064V45.8895C72.625 45.0115 73.1195 44.2085 73.9035 43.8132L91.6391 34.8738C92.2996 34.5409 93.0794 34.5421 93.7388 34.8773L111.32 43.8116C112.1 44.208 112.592 45.0092 112.592 45.8843Z'
			fill='var(--color-bg-1)'
			stroke='var(--color-fg-3)'
			strokeWidth='1.1'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M142.281 60.8099V78.0129C142.281 78.8924 141.785 79.6966 140.999 80.0909L123.351 88.9459C122.695 89.2747 121.924 89.2752 121.268 88.9473L112.591 84.6089V75.7125C112.591 75.3364 112.38 74.9921 112.045 74.8214L103.965 70.7054L102.314 69.8684V60.8137C102.314 59.936 102.808 59.1332 103.592 58.7379L112.591 54.1976L121.306 49.799C121.966 49.4656 122.746 49.4665 123.405 49.8013L141.008 58.7365C141.789 59.1329 142.281 59.9344 142.281 60.8099Z'
			fill='var(--color-bg-1)'
			stroke='var(--color-fg-3)'
			strokeWidth='1.1'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<g opacity='0.6'>
			<path
				d='M92.6226 103.834L92.5917 84.0763L73.2698 74.259'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M92.5872 84.0736L111.818 74.3225'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</g>
		<g opacity='0.6'>
			<path
				d='M92.6207 74.2422L92.5898 54.6015L73.615 44.9604'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M92.5874 54.603L111.524 45.0012'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</g>
		<g opacity='0.6'>
			<path
				d='M122.298 88.9075L122.267 69.5298L103.15 59.8167'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M122.267 69.5285L141.466 59.7939'
				stroke='var(--color-fg-3)'
				strokeWidth='0.7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</g>
	</svg>
)
