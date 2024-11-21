import { TaroElement } from "./element.js";
declare class TransferElement extends TaroElement {
    dataName: string;
    isTransferElement: boolean;
    constructor(dataName: string);
    get _path(): string;
}
export { TransferElement };
