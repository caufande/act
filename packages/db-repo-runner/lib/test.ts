import Operator from '@cauact/db-operator-node';
import { CnbApi, getOperator, Puller, regOperator } from '@cauact/db/lib';

regOperator(new Operator());

const a = process.env.CAUACT_RUNTIME;
const j = JSON.parse(a ?? '{}');
console.log(a);
const puller = new Puller(j.cnb, j.cnb.postId, j.cnb.blogApp);
console.log(await puller.getAll());
