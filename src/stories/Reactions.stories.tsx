import type { Meta, StoryObj } from '@storybook/react'
import { Reactions } from '@/components/ui'
import { http, HttpResponse } from 'msw'
import styles from './ReactionsWrapper.module.scss'

const meta = {
  title: 'UI/Reactions',
  component: Reactions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: { 
    slug: { 
      control: 'text' 
    } 
  },
} satisfies Meta<typeof Reactions>

export default meta
type Story = StoryObj<typeof Reactions>

// моки
const slug = '123'
const MockedReactions = {
  reactions: {
    Heart: 1,
    Like: 2,
    Dislike: 3,
    Angry_Face: 4,
    Fire: 5,
  },
  user_reactions: [],
}

export const Default: Story = {
  args: { slug },
  parameters: {
    msw: {
      handlers: [
        http.get(
          `http://localhost:8000/api/v1/recipe/${slug}/reactions/`,
          () => {
            return HttpResponse.json(MockedReactions)
          },
        ),
      ],
    },
  },
  decorators: [(story) => <div className={styles.tooltip}>{story()}</div>], // рамка
}
