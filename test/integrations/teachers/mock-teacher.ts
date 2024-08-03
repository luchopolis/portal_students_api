export const MockTeachers = {
  findOne: {
    result: {
      id: 10,
      name: 'Luis',
      last_name: 'Caballero',
      code_teacher: 'A1234',
    },
  },
}

export const prismMockTeacher = {
  teachers: {
    findFirst: jest.fn(),
  },
}
