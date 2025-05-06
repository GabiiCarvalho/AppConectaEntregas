import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: 'bundled',
      presets: ['@babel/prest-react'],
      plugins: [
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties']
      ]
     })
    ],
    resolve: {
      alias: {
        'react-native': 'react-native-web'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
        resolveExtensions: [
          'web.js',
          'web.jsx',
          'web.ts',
          'web.tsx',
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    },
    define: {
      global: 'window',
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
    }
})
