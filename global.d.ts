export {};

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      success?: boolean | string;
      error?: boolean | string;
      info?: boolean | string;
    }
    interface IntrinsicElements {
      success?: boolean | string;
      error?: boolean | string;
      info?: boolean | string;
    }
  }
  interface Window {
    google?: any;
  }
  declare const env: Readonly<{
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_APP_URL: string;
    VITE_API_URL: string;
  }>;
}

declare module "*.jsx" {
  const Component: any;
  export default Component;
}

declare module "react" {
  interface HTMLAttributes<T> {
    success?: boolean | string;
    error?: boolean | string;
    info?: boolean | string;
  }
}
