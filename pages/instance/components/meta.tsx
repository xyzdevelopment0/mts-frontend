'use client'

import { useDashboard } from '@/features/dashboard'
import { formatRamGb } from '@/utils/format-ram-gb'

type InstanceMetaProps = {
	flavorId: number
	ipAddress: string
}

export const InstanceMeta = ({ flavorId, ipAddress }: InstanceMetaProps) => {
	const { data } = useDashboard()
	const flavor = data.flavors.find(item => item.id === flavorId)

	const parts = [
		flavor ? `${flavor.cpu} vCPU` : null,
		flavor ? `${formatRamGb(flavor.ram_mb)} GB RAM` : null,
		ipAddress,
	].filter(Boolean)

	return <span>{parts.join(' • ')}</span>
}
