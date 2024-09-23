// @ts-check
/// <reference types="node" />
/* eslint-env node */

const fs = require('fs');
/**@type {string[]} */
const notPacks = require('./not-packs.json');
const packages = [
	...fs.readdirSync(__dirname + '/../scripts'),
	'docs',
].filter(n => !notPacks.includes(n));

const config = {
	types: [
		{ value: 'init', name: 'init		初始化' },
		{ value: 'fix', name: 'fix		修复' },
		{ value: 'refactor', name: 'refactor	重构' },
		{ value: 'add', name: 'add		添加' },
		{ value: 'test', name: 'test		测试相关' },
		{ value: 'doc', name: 'doc		添加文档' },
		{ value: 'style', name: 'style		风格修改' },
		{ value: 'revert', name: 'revert	撤销提交' },
		{ value: 'env', name: 'env		非代码部分' },
	],
	allowBreakingChanges: ['add', 'refactor', 'fix', 'revert'],

	scopes: packages.map(name => ({ name })),
	allowCustomScopes: true,

	allowTicketNumber: false,
	isTicketNumberRequired: false,
	// ticketNumberPrefix: 'TICKET-',
	// ticketNumberRegExp: '\\d{1,5}',
	// override the messages, defaults are as follows
	messages: {
		type: '本次提交的类型',
		scope: '[可选] 本次提交影响的范围',
		customScope: '本次提交影响的范围\n',
		subject: '简述提交',
		body: '[可选] 详细描述提交，用 "|" 来换行\n',
		breaking: '[可选] 列出破坏性更新\n',
		footer: '[可选] 列出解决的议题号，比如: #31, #34\n',
		confirmCommit: '确认以上提交信息？',
	},
	skipQuestions: ['footer'],
};
module.exports = config;
