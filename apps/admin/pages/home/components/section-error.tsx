export const SectionError = ({ status }: { status: number }) => (
	<p className='text-fg-3 text-sm'>
		Не удалось загрузить данные. Код ответа: {status}.
	</p>
)
