import { type InstanceStatus } from '@/types/instance'

export const INSTANCE_STATUS_LABELS: Record<InstanceStatus, string> = {
	PROVISIONING: 'Разворачивается',
	RUNNING: 'Запущен',
	STOPPED: 'Остановлен',
	ERROR: 'Ошибка',
	TERMINATED: 'Удален',
}

export const INSTANCE_STATUS_DOT_COLORS: Record<InstanceStatus, string> = {
	PROVISIONING: 'bg-amber-4',
	RUNNING: 'bg-green-4',
	STOPPED: 'bg-gray-4',
	ERROR: 'bg-red-4',
	TERMINATED: 'bg-fg-1',
}
