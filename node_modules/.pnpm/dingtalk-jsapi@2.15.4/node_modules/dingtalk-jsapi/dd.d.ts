import { IUNCore } from './lib/ddSdk';
import * as otherApi from './lib/otherApi';
declare const dd: typeof otherApi & IUNCore;
/**
 *  @deprecated 别名为core
 */
export = dd;
