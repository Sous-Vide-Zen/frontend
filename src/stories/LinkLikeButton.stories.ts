import type { Meta, StoryObj } from '@storybook/react'
import '@/app/globals.scss'
import { LinkLikeButton } from '@/components/ui'

const meta: Meta<typeof LinkLikeButton> = {
  title: 'UI/LinkLikeButton',
  component: LinkLikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'clear'],
    },
    size: {
      control: 'select',
      options: ['big', 'medium', 'small'],
    },
  },
}

export default meta
type Story = StoryObj<typeof LinkLikeButton>

export const Primary: Story = {
  args: {
    href: '/',
    children: 'Big Button',
    color: 'primary',
    size: 'big',
  },
}

export const Secondary: Story = {
  args: {
    href: '/',
    children: 'Big Button',
    color: 'secondary',
    size: 'big',
  },
}

export const Clear: Story = {
  args: {
    href: '/',
    children: 'Button',
    color: 'clear',
    size: 'big',
  },
}
