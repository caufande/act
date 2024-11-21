declare const startLocationUpdateBackground: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const openLocation: (options?: Partial<{
    scale: number;
}>, ...args: any[]) => Promise<any>;
declare const choosePoi: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getFuzzyLocation: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { startLocationUpdateBackground, openLocation, choosePoi, getFuzzyLocation };
export { getLocation } from "./getLocation.js";
export { chooseLocation } from "./chooseLocation.js";
export { offLocationChange, offLocationChangeError, onLocationChange, onLocationChangeError, startLocationUpdate, stopLocationUpdate } from "./locationChange.js";
