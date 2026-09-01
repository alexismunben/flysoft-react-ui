import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  // `examples/`, `templates/` y `docs/` son material de referencia y scaffolding:
  // no entran al paquete (ver `files` en package.json) y su ruido tapaba los
  // problemas reales de `src/`.
  globalIgnores(['dist', 'examples', 'templates', 'docs']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Permitir el uso explícito de 'any' cuando sea necesario
      '@typescript-eslint/no-explicit-any': 'off',
      /*
        Esto es una librería, no una app. Exportar `useTabsContext` al lado de
        `TabsGroup`, o el contexto al lado de su provider, es la API que queremos
        y no un descuido. La regla sólo protege la granularidad del Fast Refresh
        en el playground de `npm run dev`, que no justifica partir la API pública
        en archivos extra.
      */
      'react-refresh/only-export-components': 'off',
    },
  },
])
