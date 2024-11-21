import Operator from '@cauact/db-operator-node';
import { regOperator } from './lib/Operator/register';
regOperator(new Operator());
export * from './lib/parseComment.test';
