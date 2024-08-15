export const MockTeachers = {
  findOne: {
    result: {
      id: 1,
      name: 'John',
      last_name: 'Doe',
      code_teacher: 'A1234',
    },
  },
}

export const prismMockTeacher = {
  teachers: {
    findFirst: jest.fn(),
  },
}
