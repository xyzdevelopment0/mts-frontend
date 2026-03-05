import { type Flavor } from './flavor'
import { type ImageItem } from './image'
import { type Tenant } from './tenant'
import { type User } from './user'
import { type DeploymentDashRead } from '../deployment'

export interface Dashboard {
	user: User
	tenant: Tenant
	deployments: DeploymentDashRead[]
	images: ImageItem[]
	flavors: Flavor[]
}
