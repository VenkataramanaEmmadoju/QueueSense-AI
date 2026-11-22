/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_TAGLINE?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_USE_MOCK_DATA?: string;
  readonly VITE_ENABLE_ANALYTICS_SIMULATION?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_WS_URL?: string;
  readonly VITE_DEFAULT_LANGUAGE?: string;
  readonly VITE_DEFAULT_STATE?: string;
  readonly VITE_DEFAULT_DISTRICT?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
