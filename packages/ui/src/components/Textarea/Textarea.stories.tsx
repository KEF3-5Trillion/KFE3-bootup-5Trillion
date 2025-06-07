import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: '내용을 입력하세요.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: '소개글',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    placeholder: '에러 상태입니다.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '입력 불가 상태입니다.',
  },
};

export const CustomRows: Story = {
  args: {
    label: '짧은 메모',
    rows: 3,
    placeholder: '3줄로 제한된 textarea 입니다.',
  },
};
