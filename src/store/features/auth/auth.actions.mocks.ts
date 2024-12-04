import {
  LoginUserForm,
  LoginUserResponse,
  RegisterUserForm,
  RegisterUserResponse,
  CurrentUserData,
  ActivationUserData,
} from './auth.types'

export const authMocks = {
  getTokens: {
    params: {
      email: 'vasya_pupkin@example.com',
      password: 'string123',
    } satisfies LoginUserForm,
    response: {
      refresh: 'eyJhbGciOiJI',
      access: 'eyJhbGciOiJIU',
    } satisfies LoginUserResponse,
  },
  verifyToken: {
    token: '123',
    response: 'eyJhbGciOiJI',
  },
  getCurentUserData: {
    username: 'user5',
    display_name: 'Василий',
    id: 5,
    avatar: 'path/to/avatar.jpg',
    is_active: true,
    is_stuff: false,
    is_admin: false,
  } satisfies CurrentUserData,
  register: {
    params: {
      email: 'Email',
      username: 'username',
      password: 'password',
      password2: 'Password2',
    } satisfies RegisterUserForm,
    response: {
      id: 11,
      email: 'email',
      username: 'username',
      password: 'password',
      password2: 'password2',
    } satisfies RegisterUserResponse,
  },
  activation: {
    params: {
      uid: 'uid',
      token: 'token',
    } satisfies ActivationUserData,
    response: {
      uid: 'uid',
      token: 'token',
    } satisfies ActivationUserData,
  },
}
