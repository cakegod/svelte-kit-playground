import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	kit: {
		adapter: adapter(),
		alias: {
			store: 'src/store.ts',
			'@utils': 'src/lib/utils',
			'@components': 'src/lib/components'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
