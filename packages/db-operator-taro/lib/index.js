import { Operator as IOperator, LangInfo } from '@cauact/db';
import Requester from './Requester';
import Storager from './Storager';
export default class Operator extends IOperator {
    langInfo = new LangInfo('zh-CN');
    requesterIniter = Requester;
    storagerIniter = Storager;
}
