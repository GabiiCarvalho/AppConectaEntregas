declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module 'react-native' {
    export interface ViewProps {
      className?: string;
    }
  }