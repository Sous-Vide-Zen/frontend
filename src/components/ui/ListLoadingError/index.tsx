export const ListLoadingError = ({ error }: { error: any }) => (
  <p>{`Ошибка получения данных: ${String(error)}`}</p>
)
