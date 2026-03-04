import { type Flavor } from './flavor'
import { type ImageItem } from './image'
import { type Tenant } from './tenant'
import { type User } from './user'

export interface Dashboard {
	user: User
	tenant: Tenant
	images: ImageItem[]
	flavors: Flavor[]
}
