export interface ITokenUser {
  sub: number // user id,
  email: string
  picture: string
  role: {
    id: number
    name: string
  }
}
