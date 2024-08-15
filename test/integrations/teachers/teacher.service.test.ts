import { Test } from '@nestjs/testing'
import { TeachersController } from 'src/teachers/teachers.controller'
import { TeachersService } from 'src/teachers/teachers.service'
import { AppModule } from 'src/app.module'
import { CommonModule } from 'src/common/common.module'
import { MockTeachers, prismMockTeacher } from './mock-teacher'
import { PrismaService } from 'src/common/providers/db.provider'

// Usando Mocks, Unit Testing, esto permite que asignemos la data nosotros
describe('Teacher Service Int', () => {
  //let prisma: PrismaService;

  let teacherController: TeachersController
  let teacherService: TeachersService

  beforeAll(async () => {
    const moduleReference = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [TeachersController],
      providers: [
        TeachersService,
        {
          provide: PrismaService,
          useValue: prismMockTeacher,
        },
      ],
    }).compile()

    //prisma = moduleReference.get(PrismaService);

    prismMockTeacher.teachers.findFirst.mockResolvedValue(
      MockTeachers.findOne.result,
    )

    teacherService = moduleReference.get<TeachersService>(TeachersService)
    teacherController =
      moduleReference.get<TeachersController>(TeachersController)
  })

  // it('Should A Find One', async () => {
  //   const result = MockTeachers.findOne.result
  //   expect(teacherService.findOne(result.id)).toBe(result)
  // })

  it('Should Return A Find One', async () => {
    const result = MockTeachers.findOne.result
    // const result = 'Teacher 1'
    // jest.spyOn(teacherService, 'findOne').mockReturnValue(result)
    const controllerResult = await teacherController.findOne(
      result.id.toString(),
    )

    expect(controllerResult.id).toBe(result.id)
    expect(controllerResult.name).toBe(result.name)
    expect(controllerResult.last_name).toBe(result.last_name)
    expect(controllerResult.code_teacher).toBe(result.code_teacher)
  })
})
