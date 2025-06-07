import UserIcon from '@ui/icons/UserIcon';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: '내용을 입력하세요.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: '아이디',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <UserIcon />,
  },
};

export const WithUnit: Story = {
  args: {
    unit: '원',
  },
};
export const PasswordType: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Error: Story = {
  args: {
    type: 'password',
    color: 'error',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled value',
  },
};
