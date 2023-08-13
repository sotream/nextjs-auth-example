export interface ITokenPayload {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
}

export interface IUser extends ITokenPayload {
  password?: string,
}
