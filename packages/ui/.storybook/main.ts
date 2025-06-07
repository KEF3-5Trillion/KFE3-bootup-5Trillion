import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-onboarding', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    config.css = {
      postcss: {
        plugins: [
          require('@tailwindcss/postcss'), // 루트 레벨에서 Tailwind CSS를 사용하기 위한 설정
        ],
      },
    };
    return config;
  },
};

export default config;
