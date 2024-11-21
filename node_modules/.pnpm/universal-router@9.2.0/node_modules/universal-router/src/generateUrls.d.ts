/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { ParseOptions, TokensToFunctionOptions } from 'path-to-regexp';
import UniversalRouter from './UniversalRouter';
export interface UrlParams {
    [paramName: string]: string | number | (string | number)[];
}
export interface GenerateUrlsOptions extends ParseOptions, TokensToFunctionOptions {
    /**
     * Add a query string to generated url based on unknown route params.
     */
    stringifyQueryParams?: (params: UrlParams) => string;
    /**
     * Generates a unique route name based on all parent routes with the specified separator.
     */
    uniqueRouteNameSep?: string;
}
/**
 * Create a url by route name from route path.
 */
declare const generateUrl: (routeName: string, params?: UrlParams) => string;
type GenerateUrl = typeof generateUrl;
/**
 * Create a function to generate urls by route names.
 */
declare function generateUrls(router: UniversalRouter, options?: GenerateUrlsOptions): GenerateUrl;
export default generateUrls;
