import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';
import * as czConfig from './cz-config.cjs';

function allList<T>(s: Set<T>): Set<T[]> {
	const r = new Set<T[]>([[]]);
	s.forEach(k => {
		const b = new Set(s);
		b.delete(k);
		allList(b).forEach(n => r.add([k, ...n]));
	});
	return r;
}
const scpoeEnum = [
	...allList(new Set(czConfig.scopes.map(({ name }) => name))),
].map(n => n.join(', '));

const config: UserConfig = {
	/*
	 * Resolve and load conventional-changelog-atom from node_modules.
	 * Referenced packages must be installed
	 */
	// parserPreset: 'conventional-changelog-atom',
	/*
	 * Resolve and load @commitlint/format from node_modules.
	 * Referenced package must be installed
	 */
	// formatter: '@commitlint/format',
	/*
	 * Any rules defined here will override rules from @commitlint/config-conventional
	 */
	rules: {
		'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
		'scope-enum': [RuleConfigSeverity.Error, 'always', scpoeEnum],
		'subject-empty': [RuleConfigSeverity.Error, 'never'],
		'type-enum': [RuleConfigSeverity.Error, 'always', czConfig.types.map(({ value }) => value)],
		'type-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],
		'type-empty': [RuleConfigSeverity.Error, 'never'],
	},
	/*
	 * Functions that return true if commitlint should ignore the given message.
	 */
	ignores: [commit => commit === ''],
	/*
	 * Whether commitlint uses the default ignore rules.
	 */
	defaultIgnores: false,
	/*
	 * Custom URL to show upon failure
	 */
	helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
	/*
	 * Custom prompt configs
	 */
	prompt: {
		messages: {},
		questions: { type: { description: 'please input type:' } },
	},
};
export default config;
