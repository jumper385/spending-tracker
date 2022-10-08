// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build' })
	}, 
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/global.scss'`
		}
	})
};

export default config;