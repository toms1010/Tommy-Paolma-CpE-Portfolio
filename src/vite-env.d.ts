/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL of the APIs the portfolio consumes.
   *
   * Leave unset in development and preview — the same-origin API middleware
   * handles it. In production set it to the hosted API:
   *   VITE_API_URL=https://api.example.com/api
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
