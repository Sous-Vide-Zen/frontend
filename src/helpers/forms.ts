import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

type Resp = {
  fieldErrors?: Record<string, string>,
  nonFieldErrors?: string[]
}

export const parseSubmitErrors = (error?: FetchBaseQueryError | SerializedError): Resp => {
  // @ts-ignore
  const nonFieldErrors: string[] = error?.data?.non_field_errors
    ? // @ts-ignore
    error?.data?.non_field_errors
    : []

  return {
    nonFieldErrors,
    // @ts-ignore
    fieldErrors: error?.data
  }
}