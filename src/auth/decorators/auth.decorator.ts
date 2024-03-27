import { UseGuards, applyDecorators } from '@nestjs/common'
import { Role } from 'src/common/types/roles.enum'
import { AuthGuard } from '../auth.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { Roles } from 'src/common/decorators/role.decorator'

export function Auth(...roles: Role[]) {
  return applyDecorators(UseGuards(AuthGuard, RoleGuard), Roles(...roles))
}
