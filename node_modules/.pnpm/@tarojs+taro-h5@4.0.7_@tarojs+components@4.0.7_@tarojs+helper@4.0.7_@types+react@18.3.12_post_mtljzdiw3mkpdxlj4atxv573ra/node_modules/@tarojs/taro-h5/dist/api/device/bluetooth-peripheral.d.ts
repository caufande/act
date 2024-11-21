declare const onBLEPeripheralConnectionStateChanged: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const offBLEPeripheralConnectionStateChanged: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const createBLEPeripheralServer: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { onBLEPeripheralConnectionStateChanged, offBLEPeripheralConnectionStateChanged, createBLEPeripheralServer };
