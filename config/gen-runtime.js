import clipboard from 'clipboardy';
import { getDirname } from 'esm-entry';
import * as fsp from 'fs/promises';

const runtimeConfigFile = getDirname(import.meta.url) + '/runtime.json';
const runtimeConfig = (await fsp.readFile(runtimeConfigFile)).toString();
const copyString = JSON.stringify(JSON.stringify(JSON.parse(runtimeConfig)));
clipboard.write(`"CAUACT_RUNTIME": ${copyString}`);
