import { IUNCore } from './lib/ddSdk';
import * as otherApi from './lib/otherApi';
declare const core: typeof otherApi & IUNCore;
export = core;
