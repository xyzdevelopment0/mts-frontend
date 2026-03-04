import {
	ArchiveArrowUpIcon,
	ReloadIcon,
	WasteIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/components/button'

const reloadIcon = <HugeiconsIcon icon={ReloadIcon} size={16} strokeWidth={2} />
const backupIcon = (
	<HugeiconsIcon icon={ArchiveArrowUpIcon} size={16} strokeWidth={2} />
)
const deleteIcon = <HugeiconsIcon icon={WasteIcon} size={16} strokeWidth={2} />

export const ActionButtons = () => (
	<div className='row mx-auto gap-3'>
		<Button type='button' icon={reloadIcon}>
			Перезагрузить
		</Button>
		<Button type='button' variant='secondary' icon={backupIcon}>
			Бэкап
		</Button>
		<Button
			type='button'
			variant='secondary'
			icon={deleteIcon}
			aria-label='Удалить'
		/>
	</div>
)
