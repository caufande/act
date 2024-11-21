import { Operator as IOperator, LangInfo } from '@cauact/db';
import Requester from './Requester';
import Storager from './Storager';
export default class Operator extends IOperator {
    debug;
    constructor(debug = false) {
        super();
        this.debug = debug;
        this.requesterIniter = Requester.getIniter(debug);
    }
    langInfo = new LangInfo('zh-CN');
    requesterIniter;
    storagerIniter = Storager;
}
