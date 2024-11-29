export type UserPatchData = {
  display_name: string
  first_name: string
  last_name: string
  phone: string
  country: string
  city: string
  bio: string
}

export type UserData = UserPatchData & {
  id: number
  username: string
  email: string
  avatar?: string
  date_joined: string
  is_active: boolean
  is_banned: boolean
  is_staff: boolean
  is_admin: boolean
}
