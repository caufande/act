import clipboard from 'clipboardy';
import { getDirname } from 'esm-entry';
import * as fsp from 'fs/promises';

const workspacePath = '/mnt/c/workspace/act.code-workspace';
const runtimeConfigFile = getDirname(import.meta.url) + '/runtime.json';
const runtimeConfig = (await fsp.readFile(runtimeConfigFile)).toString();
const runtimeConfigString = JSON.stringify(JSON.parse(runtimeConfig));
const copyString = JSON.stringify(runtimeConfigString);

/**
 * @param {string} n
 */
function write(n) {
	try {
		clipboard.write(n);
	} catch {
		console.log(n);
	}
}

if (process.argv.join('').includes('-W')) {
	const workspaceFile = await fsp.readFile(workspacePath);
	const workspace = JSON.parse(workspaceFile.toString());
	workspace.settings['terminal.integrated.env.linux'].CAUACT_RUNTIME = runtimeConfigString;
	await fsp.writeFile(workspacePath, JSON.stringify(workspace, null, 2));
} else write(`"CAUACT_RUNTIME": ${copyString}`);
