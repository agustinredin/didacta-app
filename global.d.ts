export {};

declare global {
  interface Window {
    google?: any;
  }
  declare const env: Readonly<{
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_APP_URL: string;
    VITE_API_URL: string;
  }>;
}
