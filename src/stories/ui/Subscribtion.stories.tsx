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
    user: {
      id: 228,
      username: 'admin',
      bio: 'Привет, я Вася, и я профессиональный...',
    },
    subscribers_count: 1,
  },
}

export default meta
