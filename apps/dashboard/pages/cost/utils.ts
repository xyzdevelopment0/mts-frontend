const costFormatter = new Intl.NumberFormat('ru-RU', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

const integerFormatter = new Intl.NumberFormat('ru-RU', {
	maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'percent',
	minimumFractionDigits: 0,
	maximumFractionDigits: 1,
})

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
	hour: '2-digit',
	minute: '2-digit',
})

export const formatCost = (value: number) => costFormatter.format(value)

export const formatInteger = (value: number) => integerFormatter.format(value)

export const formatPercent = (value: number) => percentFormatter.format(value)

export const formatTime = (value: string | number | Date) =>
	timeFormatter.format(new Date(value))
