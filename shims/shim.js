if (typeof window !== 'undefined') {
    require('react-native-web/dist/cjs/vendor/react-native/Utilities/binaryToBase64');
  }
  
  // Mock para codegenNativeComponent
  jest.mock('react-native/Libraries/Utilities/codegenNativeComponent', () => ({
    __esModule: true,
    default: () => () => null,
  }));