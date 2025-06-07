import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        MouseEvent: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      
      // 일반 JavaScript 규칙
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // Import 관련
      'import/order': 'off', // prettier와 충돌 방지
      
      // React 관련 (Next.js에서 자동 처리)
      'react/react-in-jsx-scope': 'off',
    },
  },
  // JSON 파일 지원
  {
    files: ['**/*.json'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
  // Prettier와 충돌하는 규칙 비활성화
  prettier,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      '.turbo/**',
      'coverage/**',
      'storybook-static/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
];
