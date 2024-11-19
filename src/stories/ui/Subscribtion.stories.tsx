import type { Meta, StoryObj } from '@storybook/react'
import { Subscribtion } from '@/components/ui'
import { SubscribtionProps } from '@/components/ui/Subscribtion'

const meta: Meta<typeof Subscribtion> = {
  title: 'UI/Subscribtion',
  component: Subscribtion,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  argTypes: {
    user: {
      id: {
        control: 'number',
      },
      username: {
        control: 'text',
      },
      avatar: {
        control: 'text',
      },
      bio: {
        control: 'text',
      },
    },
    subscribers_count: {
      control: 'number',
    },
  },
}

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
