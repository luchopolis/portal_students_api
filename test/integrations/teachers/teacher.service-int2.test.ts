import { Test } from '@nestjs/testing'
import { TeachersController } from 'src/teachers/teachers.controller'
import { TeachersService } from 'src/teachers/teachers.service'

import { CommonModule } from 'src/common/common.module'
import { MockTeachers } from './mock-teacher'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/common/providers/db.provider'
import { PrismaClient } from '@prisma/client'

describe('Test', () => {})
// Integration Testing, no necesita mocks, pero si afectamos la DB
// describe('Teacher Service Int', () => {
//   let teacherService: TeachersService
//   let prisma: PrismaClient
//   beforeAll(async () => {
//     prisma = new PrismaClient()

//     const moduleReference = await Test.createTestingModule({
//       // imports: [AppModule],
//       // controllers: [TeachersController],
//       providers: [TeachersService, PrismaService],
//     }).compile()

//     teacherService = moduleReference.get<TeachersService>(TeachersService)
//   })
//   it('Should Return A Find One', async () => {
//     const result = MockTeachers.findOne.result

//     const newTeacher = await prisma.teachers.create({
//       data: {
//         name: 'Carlos',
//         last_name: 'Manicura',
//         code_teacher: 'A0129',
//         user_id: 4,
//       },
//     })

//     const teacherServiceResultFindOne = await teacherService.findOne(
//       newTeacher.id,
//     )

//     expect(teacherServiceResultFindOne.id).toBe(newTeacher.id)
//     expect(teacherServiceResultFindOne.name).toBe(newTeacher.name)
//     expect(teacherServiceResultFindOne.last_name).toBe(newTeacher.last_name)
//     expect(teacherServiceResultFindOne.code_teacher).toBe(
//       newTeacher.code_teacher,
//     )
//   })
// })
