/**
 * 测试入口
 * @license AGPL-3.0-or-later
 */
declare module './index.test';

import Operator from '@cauact/db-operator-node';
import { regOperator } from './lib/Operator/register';

regOperator(new Operator());

export * from './lib/parseComment/Act.test';
export * from './lib/parseComment/groupExpr.test';
export * from './lib/parseComment/parseDate.test';

