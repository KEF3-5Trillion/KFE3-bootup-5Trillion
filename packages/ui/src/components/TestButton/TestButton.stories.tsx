import type { Meta, StoryObj } from '@storybook/react';
import { default as TestButton } from './TestButton';

const meta: Meta<typeof TestButton> = {
  title: 'Components/TestButton',
  component: TestButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부에 표시될 텍스트나 컨텐츠',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};
