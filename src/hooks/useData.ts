import { format, formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useData = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = format(date, 'dd.MM.yyyy')
  const timeAgo = formatDistanceToNowStrict(date, {
    locale: ru,
    addSuffix: true,
  })

  const dateDiff = Date.now() - new Date(dateString).getTime()
  console.log({ dateDiff })

  return {
    formattedDate,
    timeAgo,
    fancyDate: dateDiff < 3 * 24 * 3600 ? timeAgo : formattedDate,
  }
}
