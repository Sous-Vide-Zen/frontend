import userSettingsReducer, {
  setViewMode,
  setSortMode,
  setSortMyRecipesMode,
  setDateSortMyRecipes,
  IInitialState,
} from './user.slice'

describe('userSettingsSlice', () => {
  const initialState: IInitialState = {
    view: 'feed',
    sort: 'default',
    myRecipesSort: 'date',
  }

  it('should handle setViewMode', () => {
    const nextState = userSettingsReducer(initialState, setViewMode('tile'))
    expect(nextState.view).toEqual('tile')
  })

  it('should handle setSortMode', () => {
    const nextState = userSettingsReducer(initialState, setSortMode('top'))
    expect(nextState.sort).toEqual('top')
  })

  it('should handle setSortMyRecipesMode', () => {
    const nextState = userSettingsReducer(initialState, setSortMyRecipesMode('ingredients'))
    expect(nextState.myRecipesSort).toEqual('ingredients')
  })

  it('should handle setDateSortMyRecipes', () => {
    const nextState = userSettingsReducer(initialState, setDateSortMyRecipes('2023-01-01'))
    expect(nextState.myRecipesFromDate).toEqual('2023-01-01')
  })
}) 