import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import type {PluginOption} from "vite";

export default defineConfig({
	plugins: [sveltekit(), VitePluginRemoveHashFontFiles()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

function VitePluginRemoveHashFontFiles(): PluginOption {
	return {
		name: 'Remove hash from font files',
		apply: 'build',
		enforce: 'post',
		config(config: any) {
			const defaultAssetFileNames = config.build.rollupOptions.output.assetFileNames;
			// @ts-ignore
			config.build.rollupOptions.output.assetFileNames = ({ type, name }) => {
				if (type === 'asset' && /\.(woff2?|ttf|otf)$/.test(name)) return `[name].[ext]`;
				return defaultAssetFileNames;
			};
		}
	};
}