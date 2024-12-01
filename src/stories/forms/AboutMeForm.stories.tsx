import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse } from 'msw'
import AboutMeForm from '@/components/forms/users/AboutMeForm'

const meta = {
  title: 'Forms/AboutMe',
  component: AboutMeForm,
  parameters: {
    layout: 'fullscreen',
  },
  // tags: ['autodocs'],
} satisfies Meta<typeof AboutMeForm>

export default meta
type Story = StoryObj<typeof meta>

// моки
const name = 'Name'
const mocks = {
  me: {
    id: 230,
    username: 'Name',
    display_name: 'мой_ник12',
    avatar: null,
    is_active: true,
    is_staff: false,
    is_admin: false,
  },
  data: {
    id: 230,
    username: name,
    display_name: 'мой_ник12',
    email: 'mail@mail.ru',
    avatar: null,
    phone: '+12343651234',
    date_joined: '2024-02-10T14:09:16Z',
    country: 'IO',
    city: 'Мой город',
    first_name: '',
    last_name: null,
    bio: 'обо мне ....',
    is_active: true,
    is_staff: false,
    is_admin: false,
  },
}

const apiPath = process.env.NEXT_PUBLIC_API_BASE_URL

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        http.get(`${apiPath}auth/users/me/`, () => {
          return HttpResponse.json(mocks.me)
        }),
        http.get(`${apiPath}user/${name}/`, () => {
          return HttpResponse.json(mocks.data)
        }),
        http.patch(`${apiPath}user/${name}/`, () => {
          return new HttpResponse(null)
        }),
      ],
    },
  },
}
