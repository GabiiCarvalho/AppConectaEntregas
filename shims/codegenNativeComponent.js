import { polyfills } from '@react-native/polyfills';
polyfills();

export default () => () => {
    throw new Error('codegenNativeComponent is not supported on web');
  };