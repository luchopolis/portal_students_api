import { UserBasicResponse } from 'src/users/interfaces/response/user-response'

interface participantInfo {
  name: string
  last_name: string
}

export interface ICourseParticipantsResponse {
  teachers: Partial<UserBasicResponse & participantInfo>[]
  students: Partial<UserBasicResponse & participantInfo>[]
}
