// @ts-check
/// <reference types="node" />

import eslint from '@eslint/js';
import accurtypeStyle from 'eslint-config-accurtype-style';
import { getDirname } from 'esm-entry';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	...accurtypeStyle,
	eslint.configs.recommended,
	...tseslint.configs.stylisticTypeChecked,
	{
		name: 'TS Base Config',
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: path.join(getDirname(import.meta.url), '..'),
				project: [
					'config/tsconfig.json',
					'packages/*/tsconfig.json',
					'packages/runner/tsconfig-js.json',
				],
			},
		},
	},
	{
		name: 'Opt Rules',
		rules: { 'no-unused-vars': 'off' },
	},
	{
		name: 'Global Ignore',
		ignores: [
			'**/*.md',
			'eslint.config.mjs',
			'.*',
		],
	},
	{
		name: 'JS Ignore',
		ignores: [
			'packages/db/**/*.js',
			'packages/db/lib/**/*.d.ts',
			'packages/db/index.d.ts',
			'packages/db/lib/parseComment/*.cjs',
			'packages/db/lib/parseComment/*.d.cts',
			'packages/db-operator-*/**/*.d.ts',
			'packages/db-operator-*/**/*.js',
			'packages/runner/lib/**/*.d.ts',
			'packages/runner/lib/**/*.d.cts',
			'packages/runner/lib/**/*.js',
			'**/dist/**/*',
		],
	},
	{
		name: 'Node Env',
		files: [
			'config/**',
			'packages/runner/**',
			'packages/weapp/config/**',
			'packages/taro-plugin-*/**',
		],
		languageOptions: { globals: globals.node },
	},
);
