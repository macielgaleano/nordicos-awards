/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_API_TOKEN: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_URL: string;
  // Otras variables de entorno que puedas tener
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
