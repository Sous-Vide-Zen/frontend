import {
  PatchRecipe,
  PublicateRecipe,
  RecipeFull,
  ResipeDraftsElem,
} from './recipes.types'

export const recipeMocks = {
  getRecipe: {
    slug: 'delicious-recipe',
    response: {
      id: 1,
      title: 'Delicious Recipe',
      slug: 'delicious-recipe',
      author: {
        id: 1,
        username: 'vvv',
        display_name: 'vvv',
      },
      preview_image: 'path/to/image.jpg',
      ingredients: [
        {
          name: 'Water',
          unit: 'литр',
          amount: 1,
        },
        {
          name: 'Сахар',
          unit: 'грамм',
          amount: 500,
        },
      ],
      full_text: 'Lorem ipsum dolor sit amet...',
      tag: [
        {
          name: 'ужин',
          slug: 'uzjin',
        },
        {
          name: 'завтрак',
          slug: 'zavtrak',
        },
        {
          name: 'обед',
          slug: 'obed',
        },
      ],
      reactions_count: 3,
      views_count: 1,
      category: [{ id: 1, name: 'category1', slug: 'category1' }],
      cooking_time: 30,
      pub_date: '2022-01-01T00:00:00Z',
      updated_at: '2022-01-01T00:00:00Z',
    } satisfies RecipeFull,
  },
  getRecipeDrafts: [
    {
      id: 1,
      draft_title: 'Черновик от 2024-02-23',
      slug: 'user230_chernovik_1',
    },

    {
      id: 2,
      draft_title: 'Черновик от 2024-02-23',
      slug: 'user230_chernovik_2',
    },
  ] satisfies ResipeDraftsElem[],
  createRecipeDraft: {
    id: 5,
    draft_title: 'Черновик от 2024-02-23',
    slug: 'user230_chernovik_1',
  } satisfies ResipeDraftsElem,
  updateRecipe: {
    params: {
      slug: 'delicious-recipe_10',
      data: {
        title: 'Delicious Recipe',
        tags: ['Тэг1', 'Тэг2'],
        full_text:
          'Heat the oven to 180°C fan/gas 6. Separate the leaves from the cauliflower and cut the florets into 3-4cm chunks, spreading them out on a baking tray as you work. Chop the central stalk into similar sized chunks and add to the tray too. Strip the leaves from their stems (reserving the leaves), halve the stems and add them to the tray. Season, drizzle with half the oil, then roast for 25 minutes.',
        category: [1, 2],
        ingredients: [
          {
            name: 'Water',
            unit: 'литр',
            amount: 1,
          },
        ],
        cooking_time: 30,
      },
    } satisfies PatchRecipe,
    response: {
      id: 11,
      title: 'Delicious Recipe',
      slug: 'delicious-recipe_10',
      ingredients: [
        {
          name: 'Water',
          unit: 'литр',
          amount: 1,
        },
        {
          name: 'Сахар',
          unit: 'грамм',
          amount: 500,
        },
      ],
      full_text:
        'Heat the oven to 180°C fan/gas 6. Separate the leaves from the cauliflower and cut the florets into 3-4cm chunks, spreading them out on a baking tray as you work. Chop the central stalk into similar sized chunks and add to the tray too. Strip the leaves from their stems (reserving the leaves), halve the stems and add them to the tray. Season, drizzle with half the oil, then roast for 25 minutes.',
      tag: [
        {
          name: 'сахар',
          slug: 'sakhar',
        },
        {
          name: 'вода',
          slug: 'voda_1',
        },
        {
          name: 'Горячий',
          slug: 'goriachii',
        },
      ],
      category: [],
      cooking_time: 30,
      pub_date: '2024-02-23T17:41:09.838436Z',
      updated_at: '2024-02-23T17:43:13.826742Z',
    } satisfies Partial<RecipeFull>,
  },
  deleteRecipe: {
    slug: '123',
    response: {
      message: 'Рецепт успешно удален',
    },
  },
  publicate: {
    params: {
      slug: 'delicious-recipe_10',
      data: {
        title: 'Delicious Recipe',
        tags: ['Тэг1', 'Тэг2'],
        full_text:
          'Heat the oven to 180°C fan/gas 6. Separate the leaves from the cauliflower and cut the florets into 3-4cm chunks, spreading them out on a baking tray as you work. Chop the central stalk into similar sized chunks and add to the tray too. Strip the leaves from their stems (reserving the leaves), halve the stems and add them to the tray. Season, drizzle with half the oil, then roast for 25 minutes.',
        category: [1, 2],
        ingredients: [
          {
            name: 'Water',
            unit: 'литр',
            amount: 1,
          },
        ],
        cooking_time: 30,
      },
    } satisfies PublicateRecipe,
    response: {
      id: 5,
      title: 'Delicious Recipe',
      slug: 'delicious-recipe',
      ingredients: [
        {
          name: 'Water',
          unit: 'литр',
          amount: 1,
        },
        {
          name: 'Сахар',
          unit: 'грамм',
          amount: 500,
        },
      ],
      full_text:
        'Heat the oven to 180°C fan/gas 6. Separate the leaves from the cauliflower and cut the florets into 3-4cm chunks, spreading them out on a baking tray as you work. Chop the central stalk into similar sized chunks and add to the tray too. Strip the leaves from their stems (reserving the leaves), halve the stems and add them to the tray. Season, drizzle with half the oil, then roast for 25 minutes.',
      tag: [
        {
          name: 'сахар',
          slug: 'sakhar',
        },
        {
          name: 'вода',
          slug: 'voda_1',
        },
        {
          name: 'Горячий',
          slug: 'goriachii',
        },
      ],
      category: [],
      cooking_time: 30,
      pub_date: '2024-02-23T17:01:33.505452Z',
      updated_at: '2024-02-23T17:01:33.505500Z',
    } satisfies Partial<RecipeFull>,
  },
}
