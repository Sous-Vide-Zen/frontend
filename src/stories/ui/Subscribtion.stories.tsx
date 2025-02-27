import type { Meta, StoryObj } from '@storybook/react'
import { Subscribtion } from '@/components/ui'

const meta = {
  title: 'UI/Subscribtion',
  component: Subscribtion,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
} satisfies Meta<typeof Subscribtion>

type Story = StoryObj<typeof Subscribtion>

export const Primary: Story = {
  args: {
    id: 10,
    author: {
      id: 228,
      username: 'Kira_Epifanova',
      avatar: '',
      bio: 'Увлекаюсь кулинарией уже 8 лет! Буду рада найти единомышленников и\t\rсделать мир су-вид лучше)',
    },
    subscribers_count: 123,
  },
}

export default meta
