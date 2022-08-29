import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  // @xxx Vite issue https://github.com/btd/rollup-plugin-visualizer/issues/124#issuecomment-1221295477
  plugins: [react(), visualizer() as PluginOption, mkcert()],
  server: { https: true, port: 8080 },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
