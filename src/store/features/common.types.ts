export type DataResponse<T> =
  | T
  | {
      detail: string
    }

export type ListResponse<T> =
  | {
      count: number
      next?: string
      previous?: string
      results: T[]
    }
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
