import list from 'i18n-iso-countries/langs/ru.json'

//@ts-ignore
const countriesRu: Record<string, string> = list.countries

export const COUNTRIES: { value: string; label: string }[] = []

for (const key in countriesRu) {
  COUNTRIES.push({
    value: key,
    label: String(countriesRu[key]),
  })
}
