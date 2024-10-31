import { defineConfig } from '@tarojs/cli';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineConfig<'vite'>({
	mini: {},
	h5: {
		/**
		 * WebpackChain 插件配置
		 * @docs https://github.com/neutrinojs/webpack-chain
		 */
		webpackChain(chain) {
			chain;
			/**
			 * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
			 * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
			 */
			chain.plugin('analyzer')
				.use(BundleAnalyzerPlugin, []);
		},
	},
});
