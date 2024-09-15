export const convertObjectToQueryParams = (params: Record<string, string>) => {
  const filteredParams = Object.entries(params)
    .filter(([_key, value]) => value !== null && value !== undefined)
    .reduce(
      (obj, [key, value]) => {
        obj[key] = value
        return obj
      },
      {} as Record<string, string>,
    )

  return new URLSearchParams(filteredParams).toString()
}

export const getParamObjectFromURL = (url: string): Record<string, string> => {
  const urlData = new URL(url)
  const res: Record<string, string> = {}

  for (const p of Array.from(urlData.searchParams)) {
    res[p[0]] = p[1]
  }

  return res
}

export const paramsToObject = (searchParams: URLSearchParams) => {
  const result: Record<string, string> = {}
  for (const key in searchParams.entries) {
    result[key] = String(searchParams.get(key))
  }
  return result
}
