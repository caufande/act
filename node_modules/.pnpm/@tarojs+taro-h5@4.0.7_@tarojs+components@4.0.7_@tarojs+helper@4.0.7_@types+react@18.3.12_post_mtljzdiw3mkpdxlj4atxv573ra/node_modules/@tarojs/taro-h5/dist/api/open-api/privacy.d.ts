declare const requirePrivacyAuthorize: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const openPrivacyContract: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const onNeedPrivacyAuthorization: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getPrivacySetting: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { requirePrivacyAuthorize, openPrivacyContract, onNeedPrivacyAuthorization, getPrivacySetting };
