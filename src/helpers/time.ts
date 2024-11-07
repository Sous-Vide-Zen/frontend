export type Numeral = {
  nominative: string // в именительном падеже
  genetive: string // в родительном падеже
  genetivePlural: string // родительный падеж, множественное число
}

export const hoursNumeral: Numeral = {
  nominative: 'час',
  genetive: 'часа',
  genetivePlural: 'часов',
}

export const munutesNumeral: Numeral = {
  nominative: 'минуту',
  genetive: 'минуты',
  genetivePlural: 'минут',
}

export const getNumeralDeclention = (
  numeral: Numeral,
  value: number,
): string => {
  const lastDigit = Number(String(value).slice(-1)) || 0

  switch (lastDigit) {
    case 1:
      return numeral.nominative
    case 2:
    case 3:
    case 4:
      return numeral.genetive
    default:
      return numeral.genetivePlural
  }
}

export const minutesToString = (time: number) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  const showMinutes = `${String(minutes)} ${getNumeralDeclention(munutesNumeral, minutes)}`

  return hours > 0
    ? `${String(hours)} ${getNumeralDeclention(hoursNumeral, hours)} и ${showMinutes}`
    : showMinutes
}
