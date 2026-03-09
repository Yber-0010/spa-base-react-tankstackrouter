import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		base: env.VITE_PUBLIC_URL || '/',
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		build: {
			chunkSizeWarningLimit: 1024 * 1024,
		},
	};
});
