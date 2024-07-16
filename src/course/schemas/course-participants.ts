import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

export const schemaCourseParticipants: SchemaObject & Partial<ReferenceObject> =
  {
    properties: {
      data: {
        properties: {
          teachers: {
            items: {
              properties: {
                id: { type: 'number' },
                picture: { type: 'string' },
                name: { type: 'string' },
                last_name: { type: 'string' },
              },
              type: 'object',
            },
            type: 'array',
          },
          students: {
            items: {
              properties: {
                id: { type: 'number' },
                picture: { type: 'string' },
                name: { type: 'string' },
                last_name: { type: 'string' },
              },
              type: 'object',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    },
    type: 'object',
  }
