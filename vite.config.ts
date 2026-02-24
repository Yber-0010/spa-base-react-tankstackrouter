import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_PUBLIC_URL || '/',
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1024 * 1024,
    },
  }
});
