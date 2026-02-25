/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALCOM_LINK: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
