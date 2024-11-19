import type { Meta, StoryObj } from '@storybook/react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui'
import { FieldSet, Field } from '@/components/forms/items'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
    register: {
      control: 'object',
    },
    type: {
      control: 'select',
      options: [
        // 'button',
        // 'checkbox',
        // 'color',
        'date',
        'datetime-local',
        'email',
        // 'file',
        // 'hidden',
        'image',
        // 'month',
        'number',
        'password',
        // 'radio',
        // 'range',
        // 'reset',
        // 'search',
        // 'submit',
        'tel',
        'text',
        'time',
        // 'url',
        // 'week',
      ],
    },
    // placeholder: {
    //   control: 'text',
    // },
    // error: {
    //   control: 'text',
    // },
  },
}

type Story = StoryObj<typeof Input>

const name = 'test'
type FormValues = {
  [name]: string
}
// const { register, handleSubmit } = useForm<FormValues>({
//   mode: 'onBlur',
// })

const register = {
  // onChange: ()=>{}
  // onBlur: ChangeHandler;
  // ref: RefCallBack;
  // name: string;
  // min?: string | number;
  // ... 5 more ...;
  // disabled?: boolean;
} as UseFormRegister<FormValues>

// const handleSubmit = ()=>{}
// const onSubmit = (formValues: FormValues) => {}

const Primary: Story = {
  args: {
    name,
    register,
    type: 'email',
  },
  // parameters: {
  //   theme: 'dark',
  // },
  decorators: [
    (story) => (
      <form>
        <FieldSet>
          <Field label={name}>{story()}</Field>
        </FieldSet>
      </form>
    ),
  ],
}
// export const Secondary: Story = {
//   args: {
//     children: 'Big Button',
//     color: 'secondary',
//     size: 'big',
//   },
// }
// export const Clear: Story = {
//   args: {
//     children: 'Button',
//     color: 'clear',
//     size: 'big',
//   },
// }

export default meta
