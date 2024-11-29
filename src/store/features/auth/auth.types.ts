export type { CurrentUserData } from "../common.types"

export interface IDataFromResolve {
  username: string
  email: string
  id: number
}

export interface IDataFromForm {
  username?: string
  email: string
  password: string
  repeat_password?: string
}

export interface IToken {
  access: string
  refresh: string
}

export interface ITokens {
  tokens: IToken
}

export interface RegisterUserForm {
  email: string
  username?: string
  password: string
  password2: string
}

export interface RegisterUserResponse {
  id: number
  email: string
  username?: string
  password: string
  password2: string
}

export interface LoginUserForm {
  email: string
  password: string
}

export interface LoginUserResponse {
  access: string
  refresh: string
}

export interface ActivationUserData {
  uid: string
  token: string
}

export interface UserEmailData {
  email: string
}

export interface UserNewEmailData {
  new_email: string
}

export interface ResetPasswordData {
  uid: string
  token: string
  new_password: string
}

export interface SetEmailData {
  current_password: string
  new_email: string
}

export interface SetPasswordData {
  new_password: string
  current_password: string
}
