import { type Instance } from '../instance'
import { type Plan } from './plan'

export interface Tenant {
	id?: number
	name: string
	balance: number
	plan: Plan
	instances: Instance[]
}
