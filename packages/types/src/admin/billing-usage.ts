export interface AdminBillingUsageItem {
	tenant_id: number
	tenant_name: string
	total_charged: number
	records_count: number
	last_entry_at: string | null
}
