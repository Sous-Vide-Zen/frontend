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

export interface CurrentUserData {
  username: string
  display_name: string
  id: number
  avatar: string
  is_active: boolean
  is_stuff: boolean
  is_admin: boolean
}

export interface UserData {
  id: number
  username: string
  display_name: string
  email: string
  avatar?: string
  phone?: string
  city: string
  country: string
  bio: string
  date_joined: string
  first_name: string
  last_name: string
  is_active: boolean
  is_banned: boolean
  is_staff: boolean
  is_admin: boolean
}

export interface RegisterUserForm {
  email: string
  password: string
  password2: string
}

export interface RegisterUserResponse {
  id: number
  email: string
  username: string
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