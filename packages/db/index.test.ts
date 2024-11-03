/**
 * 测试入口
 * @license AGPL-3.0-or-later
 */
declare module './index.test';

import { regOperator } from './lib/Operator/register';
import Operator from '@cauact/db-operator-node';

regOperator(new Operator());

export * from './lib/parseComment/groupExpr.test';
export * from './lib/parseComment/parseDate.test';

