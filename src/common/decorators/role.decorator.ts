import { SetMetadata } from '@nestjs/common'
import { Role } from '../types/roles.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles) // Decorator to handle the roles allow in X Endpoint
