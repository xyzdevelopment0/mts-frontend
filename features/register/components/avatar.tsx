type RegisterAvatarProps = {
	letter: string
}

export const RegisterAvatar = ({ letter }: RegisterAvatarProps) => (
	<div className='center border-gray-2 size-28 rounded-full border-2 border-dashed'>
		<div className='bg-gray-2 text-fg-2 center size-24 rounded-full text-6xl'>
			{letter}
		</div>
	</div>
)
