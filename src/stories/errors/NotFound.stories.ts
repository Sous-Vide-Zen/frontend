import type { Meta, StoryObj } from '@storybook/react'
import NotFound from '@/components/ui/NotFound/NotFound'

const meta = {
  title: 'Errors/NotFound',
  component: NotFound,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NotFound>

type Story = StoryObj<typeof NotFound>

export const Default: Story = {}

export default meta
