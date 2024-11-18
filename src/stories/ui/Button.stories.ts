import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'clear'],
    },
    size: {
      control: 'select',
      options: ['big', 'medium', 'small'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Big Button',
    color: 'primary',
    size: 'big',
  },
  parameters: {
    theme: 'dark',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Big Button',
    color: 'secondary',
    size: 'big',
  },
}
export const Clear: Story = {
  args: {
    children: 'Button',
    color: 'clear',
    size: 'big',
  },
}

export default meta
