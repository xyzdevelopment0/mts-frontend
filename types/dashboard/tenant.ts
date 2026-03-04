import { type Instance } from '@/types/instance'
import { type Plan } from './plan'

export interface Tenant {
	name: string
	balance: number
	plan: Plan
	instances: Instance[]
}
