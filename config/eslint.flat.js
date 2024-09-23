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
					'scripts/*/tsconfig.json',
				],
			},
		},
	},
	{
		name: 'Opt Rules',
		rules: { 'no-unused-vars': 'warn' },
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
		name: 'Node Env',
		files: [
			'config/**/*',
		],
		languageOptions: { globals: globals.node },
	},
);
