import { format, formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale'
import { differenceInHours } from 'date-fns'

export const useData = (
  dateString: string,
  addSuffix?: boolean,
  fancyDaysEdge?: number,
) => {
  const date = new Date(dateString)
  const formattedDate = format(date, 'dd.MM.yyyy')
  const timeAgo = formatDistanceToNowStrict(date, {
    locale: ru,
    addSuffix: addSuffix ?? true,
  })

  const hoursDiff = differenceInHours(Date.now(), new Date(dateString))

  return {
    formattedDate,
    timeAgo,
    fancyDate: hoursDiff < (fancyDaysEdge || 1) * 24 ? timeAgo : formattedDate,
  }
}
