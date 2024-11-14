import list from 'i18n-iso-countries/langs/ru.json'

//@ts-ignore
const countriesRu: Record<string, string> = list.countries

export let COUNTRIES: { value: string; label: string }[] = []

for (let key in countriesRu) {
  COUNTRIES.push({
    value: key,
    label: String(countriesRu[key]),
  })
}
