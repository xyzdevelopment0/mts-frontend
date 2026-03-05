import {
	type DeploymentAttemptStatus,
	type DeploymentStatus,
} from '@/types/deployment'

type DeploymentCopy = {
	title: string
	description: string
}

export const TERMINAL_DEPLOYMENT_STATUSES = new Set([
	'running',
	'failed',
	'deleted',
])

export const DEPLOYMENT_STATUS_COPY: Record<DeploymentStatus, DeploymentCopy> =
	{
		analyzing: {
			title: 'Анализ',
			description: 'Разбираю репозиторий и определяю сценарий сборки.',
		},
		cloning: {
			title: 'Клонирую',
			description: 'Забираю исходный код из GitHub и готовлю рабочий каталог.',
		},
		generating_dockerfile: {
			title: 'Dockerfile',
			description: 'Генерирую Dockerfile под найденный стек проекта.',
		},
		building: {
			title: 'Сборка',
			description: 'Собираю контейнер и проверяю, что приложение стартует.',
		},
		configuring_access: {
			title: 'Доступ',
			description: 'Настраиваю сеть и публикую внешний URL для сервиса.',
		},
		running: {
			title: 'Готово',
			description: 'Деплой завершен, сервис уже запущен.',
		},
		retrying: {
			title: 'Ретрай',
			description: 'Прошлая попытка упала, запускаю следующую конфигурацию.',
		},
		failed: {
			title: 'Ошибка',
			description: 'Все попытки завершились ошибкой, нужен повторный запуск.',
		},
		deleting: {
			title: 'Удаление',
			description: 'Останавливаю и удаляю текущий деплой.',
		},
		deleted: {
			title: 'Удалено',
			description: 'Деплой удален и больше не доступен.',
		},
	}

export const DEPLOYMENT_ATTEMPT_STATUS_COPY: Record<
	DeploymentAttemptStatus,
	string
> = {
	running: 'Подбираю рабочую стратегию запуска для этой попытки.',
	dockerfile_generated:
		'Dockerfile успешно сгенерирован, начинаю сборку образа.',
	build_succeeded: 'Образ собран успешно, готовлю запуск контейнера.',
	build_failed: 'Сборка этой попытки не прошла, анализирую причину.',
	failed: 'Попытка завершилась ошибкой, готовлю следующий ретрай.',
}
