import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';

const mdsvexConfig = {
  extensions: ['.svx', '.md'],
  layout: {
    // опционально: глобальный layout для md файлов
    _: './src/lib/MDLayout.svelte'
  } 
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [sveltePreprocess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter()
  }
};

export default config;
