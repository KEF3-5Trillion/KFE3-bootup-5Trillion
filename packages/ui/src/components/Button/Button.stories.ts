import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '공통 버튼 컴포넌트입니다. `style`, `size`, `width`, `isDisabled`, `className` 등을 조합하여 다양한 버튼 UI를 구성할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'neutral'],
      description: '버튼 스타일',
      table: {
        type: { summary: 'primary | secondary | success | danger | neutral' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기 (높이 고정)',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    width: {
      control: 'text',
      description: '버튼 너비 (예: "100px", "100%")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    label: {
      control: 'text',
      description: '버튼에 표시할 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    style: 'primary',
    size: 'md',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    style: 'secondary',
    size: 'md',
    label: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    style: 'success',
    size: 'md',
    label: 'Success Button',
  },
};

export const Danger: Story = {
  args: {
    style: 'danger',
    size: 'md',
    label: 'Danger Button',
  },
};

export const Neutral: Story = {
  args: {
    style: 'neutral',
    size: 'md',
    label: 'Neutral Button',
  },
};

export const Disabled: Story = {
  args: {
    style: 'primary',
    size: 'md',
    label: 'Disabled Button',
    isDisabled: true,
  },
};
