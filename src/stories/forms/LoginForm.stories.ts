import type { Meta, StoryObj } from '@storybook/react'

import LoginForm from '@/components/forms/auth/LoginForm'

const meta = {
  title: 'Forms/Login',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Dafault: Story = {}
