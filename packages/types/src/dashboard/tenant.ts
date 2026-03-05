import { type Instance } from '../instance'
import { type Plan } from './plan'

export interface Tenant {
	name: string
	balance: number
	plan: Plan
	instances: Instance[]
}
