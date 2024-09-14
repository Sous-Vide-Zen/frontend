export const ListLoadingError = ({ error }: { error: any }) => {
  return <p>{`Ошибка получения данных: ${String(error)}`}</p>
}
