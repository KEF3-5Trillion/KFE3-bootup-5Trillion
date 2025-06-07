import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# BottomSheet 컴포넌트

바텀시트 컴포넌트는 화면 하단에서 올라오는 모달형 UI입니다.

## 주요 기능
- 드래그로 닫기 기능 (기본 제공)
- 배경 클릭으로 닫기 기능
- 다양한 높이 옵션
- 헤더 표시/숨김 옵션

## 사용 예시
\`\`\`tsx
<BottomSheet 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="제목"
  height="70vh"
>
  컨텐츠 내용
</BottomSheet>
\`\`\`
        `,
      },
    },
  },
  // Docs 탭을 위한 tags 추가
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '바텀시트 표시 여부',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'onClose',
      description: '바텀시트 닫기 콜백 함수',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: '바텀시트에 표시될 내용',
      defaultValue: '바텀시트 컨텐츠입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    height: {
      control: { type: 'select' },
      options: ['auto', '50vh', '70vh', '90vh', '400px', '600px'],
      description: '바텀시트의 높이를 설정합니다.',
      defaultValue: 'auto',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    enableBackdropClose: {
      control: 'boolean',
      description: '배경을 클릭하여 바텀시트를 닫을 수 있는 기능의 사용 여부',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    showHeader: {
      control: 'boolean',
      description: '헤더 영역 표시 여부',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      control: 'text',
      description: '바텀시트 제목 (showHeader가 true일 때만 표시)',
      defaultValue: '바텀시트 제목',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '바텀시트 제목' },
      },
    },
  },
  args: {
    isOpen: false,
    enableBackdropClose: true,
    showHeader: true,
    title: '바텀시트 제목',
    height: 'auto',
    className: '',
    children: '바텀시트 컨텐츠입니다.',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// 기본 스토리
export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState(args.isOpen);

    return (
      <div className="p-8">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          바텀시트 열기
        </button>

        <BottomSheet {...args} isOpen={open} onClose={() => setOpen(false)}>
          <div className="space-y-4">
            <p className="text-gray-600">{args.children}</p>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 긴 컨텐츠 스토리
export const LongContent: Story = {
  args: {
    title: '긴 컨텐츠',
    height: '70vh',
  },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-8">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
        >
          긴 컨텐츠 바텀시트 열기
        </button>

        <BottomSheet {...args} isOpen={open} onClose={() => setOpen(false)}>
          <div className="space-y-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="rounded bg-gray-50 p-4">
                <h3 className="font-semibold">아이템 {i + 1}</h3>
                <p className="text-gray-600">
                  이것은 긴 컨텐츠를 테스트하기 위한 더미 텍스트입니다. 스크롤이
                  제대로 작동하는지 확인할 수 있습니다.
                </p>
              </div>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 헤더 없는 버전
export const NoHeader: Story = {
  args: {
    showHeader: false,
  },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-8">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          헤더 없는 바텀시트 열기
        </button>

        <BottomSheet {...args} isOpen={open} onClose={() => setOpen(false)}>
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">성공!</h2>
            <p className="text-gray-600">작업이 성공적으로 완료되었습니다.</p>
          </div>
        </BottomSheet>
      </div>
    );
  },
};
