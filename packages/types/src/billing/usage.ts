export interface BillingUsageItem {
	id: number
	instance_id: number
	flavor_id: number
	started_at: string
	ended_at: string
	duration_sec: number
	cpu_usage_vcpu: number
	ram_usage_gb: number
	base_price_per_min: number
	cpu_charge: number
	ram_charge: number
	total_charge: number
}

export interface BillingUsage {
	total_charged: number
	items: BillingUsageItem[]
}
