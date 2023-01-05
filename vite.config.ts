import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // @xxx Vite issue https://github.com/btd/rollup-plugin-visualizer/issues/124#issuecomment-1221295477
  plugins: [react(), visualizer() as PluginOption, ViteMinifyPlugin({})],
  server: {
    port: 8080,
    open: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
