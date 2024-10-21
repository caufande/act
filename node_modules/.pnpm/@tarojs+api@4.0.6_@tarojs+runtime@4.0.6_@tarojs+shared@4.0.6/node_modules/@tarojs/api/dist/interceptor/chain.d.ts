export type TInterceptor = (c: Chain) => Promise<void>;
export interface IRequestParams {
    timeout?: number;
    method?: string;
    url?: string;
    data?: unknown;
}
export default class Chain {
    index: number;
    requestParams: IRequestParams;
    interceptors: TInterceptor[];
    constructor(requestParams?: IRequestParams, interceptors?: TInterceptor[], index?: number);
    proceed(requestParams?: IRequestParams): Promise<void>;
    _getNextInterceptor(): TInterceptor;
    _getNextChain(): Chain;
}
