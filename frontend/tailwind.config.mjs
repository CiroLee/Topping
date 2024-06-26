/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import theme from './plugins/theme';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...theme
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          'justify-content': 'center',
          'align-items': 'center'
        },
        '.absolute-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      });
    })
  ]
};
