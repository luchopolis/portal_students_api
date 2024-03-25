import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string
}
