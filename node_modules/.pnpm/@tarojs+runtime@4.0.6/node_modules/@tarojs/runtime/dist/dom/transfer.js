import { TaroElement } from './element.js';

class TransferElement extends TaroElement {
    constructor(dataName) {
        super();
        this.dataName = dataName;
        this.isTransferElement = true;
    }
    get _path() {
        return this.dataName;
    }
}

export { TransferElement };
//# sourceMappingURL=transfer.js.map
