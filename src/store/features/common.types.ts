export type DataResponse<T> =
  | T
  | {
      detail: string
    }

export type ListResponseSuccess<T> = {
  count: number
  next?: string
  previous?: string
  results: T[]
}

export type ListResponse<T> =
  | ListResponseSuccess<T>
  | {
      detail: string
    }

export type Author = {
  id: number
  username: string
  display_name?: string
  avatar?: string
  bio?: string
}
