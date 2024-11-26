import { SIZE_SCREEN } from './src/constants/system'
import defaultTheme from 'tailwindcss/defaultTheme'

const extendColors = {
  primary: {
    DEFAULT: 'var(--el-color-primary)',
    1: 'var(--el-color-primary-light-1)',
    2: 'var(--el-color-primary-light-2)',
    3: 'var(--el-color-primary-light-3)',
    4: 'var(--el-color-primary-light-4)',
    5: 'var(--el-color-primary-light-5)',
    6: 'var(--el-color-primary-light-6)',
    7: 'var(--el-color-primary-light-7)',
    8: 'var(--el-color-primary-light-8)',
    9: 'var(--el-color-primary-light-9)',
    dark: 'var(--el-color-primary-dark-2)'
  },
  success: {
    DEFAULT: 'var(--el-color-success)',
    1: 'var(--el-color-success-light-1)',
    2: 'var(--el-color-success-light-2)',
    3: 'var(--el-color-success-light-3)',
    4: 'var(--el-color-success-light-4)',
    5: 'var(--el-color-success-light-5)',
    6: 'var(--el-color-success-light-6)',
    7: 'var(--el-color-success-light-7)',
    8: 'var(--el-color-success-light-8)',
    9: 'var(--el-color-success-light-9)',
    dark: 'var(--el-color-success-dark-2)'
  },
  warning: {
    DEFAULT: 'var(--el-color-warning)',
    1: 'var(--el-color-warning-light-1)',
    2: 'var(--el-color-warning-light-2)',
    3: 'var(--el-color-warning-light-3)',
    4: 'var(--el-color-warning-light-4)',
    5: 'var(--el-color-warning-light-5)',
    6: 'var(--el-color-warning-light-6)',
    7: 'var(--el-color-warning-light-7)',
    8: 'var(--el-color-warning-light-8)',
    9: 'var(--el-color-warning-light-9)',
    dark: 'var(--el-color-warning-dark-2)'
  },
  danger: {
    DEFAULT: 'var(--el-color-danger)',
    1: 'var(--el-color-danger-light-1)',
    2: 'var(--el-color-danger-light-2)',
    3: 'var(--el-color-danger-light-3)',
    4: 'var(--el-color-danger-light-4)',
    5: 'var(--el-color-danger-light-5)',
    6: 'var(--el-color-danger-light-6)',
    7: 'var(--el-color-danger-light-7)',
    8: 'var(--el-color-danger-light-8)',
    9: 'var(--el-color-danger-light-9)',
    dark: 'var(--el-color-danger-dark-2)'
  },
  info: {
    DEFAULT: 'var(--el-color-info)',
    1: 'var(--el-color-info-light-1)',
    2: 'var(--el-color-info-light-2)',
    3: 'var(--el-color-info-light-3)',
    4: 'var(--el-color-info-light-4)',
    5: 'var(--el-color-info-light-5)',
    6: 'var(--el-color-info-light-6)',
    7: 'var(--el-color-info-light-7)',
    8: 'var(--el-color-info-light-8)',
    9: 'var(--el-color-info-light-9)',
    dark: 'var(--el-color-info-dark-2)'
  },
  system: {
    DEFAULT: 'var(--el-text-color-primary)',
    regular: 'var(--el-text-color-regular)',
    secondary: 'var(--el-text-color-secondary)',
    placeholder: 'var(--el-text-color-placeholder)',
    disabled: 'var(--el-text-color-disabled)'
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  darkMode: 'class',
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      xs: 'var(--el-font-size-extra-small)',
      sm: 'var(--el-font-size-small)',
      base: 'var(--el-font-size-base)',
      lg: 'var(--el-font-size-large)',
      xl: 'var(--el-font-size-extra-large)'
    },
    fontFamily: {
      body: ['Roboto', 'sans-serif']
    },
    screens: Object.keys(SIZE_SCREEN).reduce((acc, key) => {
      acc[key] = `${SIZE_SCREEN[key]}px`
      return acc
    }, {}),
    extend: {
      colors: { ...extendColors },
      borderWidth: {
        1: '1px'
      }
    }
  },
  plugins: []
}
