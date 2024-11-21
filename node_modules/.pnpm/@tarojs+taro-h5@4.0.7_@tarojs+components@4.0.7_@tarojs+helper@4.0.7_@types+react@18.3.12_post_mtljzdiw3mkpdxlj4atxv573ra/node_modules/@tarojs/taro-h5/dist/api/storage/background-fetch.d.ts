declare const setBackgroundFetchToken: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const onBackgroundFetchData: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getBackgroundFetchToken: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getBackgroundFetchData: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { setBackgroundFetchToken, onBackgroundFetchData, getBackgroundFetchToken, getBackgroundFetchData };
