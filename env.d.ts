/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_ENDPOINT: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
