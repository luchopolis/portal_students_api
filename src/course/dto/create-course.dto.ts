import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class CreateCourseDto {
  @IsString()
  @MinLength(5)
  @ApiProperty()
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  banner: string
}
