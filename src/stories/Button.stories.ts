import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from '@/components/ui/Button/Button'
import '@/app/globals.scss'

const meta = {
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
  // args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Big Button',
    color: 'primary',
    size: 'big',
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
