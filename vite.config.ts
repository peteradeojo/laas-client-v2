import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
	plugins: [react()],
	envDir: '.',
  // define: {
  //   // @ts-ignore
  //   __ENV__: loadEnv(mode, process.cwd(), '')
  // }
}));
