import { CnbApi, parseGroups, regOperator, getGroupExpr } from '@cauact/db';
import Operator from '@cauact/db-operator-node';

regOperator(new Operator());

const r = getGroupExpr(process.argv.at(-1) ?? '');
console.dir(r, { depth: 100 });

