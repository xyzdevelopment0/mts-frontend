export const formatRamGb = (ramMb: number) => {
	const value = ramMb / 1024
	return Number.isInteger(value) ? String(value) : value.toFixed(1)
}
