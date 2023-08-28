import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      vitePluginRequire({
        // @fileRegex RegExp
        // optional：default file processing rules are as follows
        // fileRegex:/(.jsx?|.tsx?|.vue)$/
        // Conversion mode. The default mode is import
        // importMetaUrl | import
        // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url
        // translateType: "importMetaUrl" | "import";
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setup.js',
    },
  };
});
