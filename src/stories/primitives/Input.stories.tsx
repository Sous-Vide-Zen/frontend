import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'checkbox',
        'date',
        // 'button',
        // 'color',
        // 'datetime-local',
        // 'file',
        // 'hidden',
        // 'image',
        // 'month',
        // 'number',
        // 'radio',
        // 'range',
        // 'reset',
        // 'search',
        // 'submit',
        // 'tel',
        // 'time',
        // 'url',
        // 'week',
      ],
    },
  },
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof Input>

const name = 'test'

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'placeholder',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'placeholder',
  },
}

export default meta
