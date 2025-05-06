import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
      {
        find: 'react-native-maps',
        replacement: 'react-native-web-maps',
      },
      {
        find: 'react-native/Libraries/vendor/emitter/EventEmitter',
        replacement: path.resolve(
          'node_modules/react-native-web/dist/vendor/react-native/emitter/EventEmitter.js'
        ),
      },
      {
        find: 'react-native/Libraries/Utilities/binaryToBase64',
        replacement: path.resolve(
          'node_modules/react-native-web/dist/vendor/react-native/Utilities/binaryToBase64.js'
        ),
      },
      {
        find: /^@react-native-firebase\/(.*)/,
        replacement: path.resolve(`node_modules/@react-native-firebase/$1/web`),
      },
    ],
  },
  optimizeDeps: {
    include: ['react-native-web-maps'],
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.js', '.jsx'],
      loader: {
        '.js': 'jsx',
      },
    },
  },
});