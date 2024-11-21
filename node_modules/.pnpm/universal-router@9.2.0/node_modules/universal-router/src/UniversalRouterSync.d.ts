/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { Path, MatchFunction, ParseOptions, TokensToRegexpOptions, RegexpToFunctionOptions } from 'path-to-regexp';
/**
 * In addition to a URL path string, any arbitrary data can be passed to
 * the `router.resolve()` method, that becomes available inside action functions.
 */
export interface RouterContext {
    [propName: string]: any;
}
export interface ResolveContext extends RouterContext {
    /**
     * URL which was transmitted to `router.resolve()`.
     */
    pathname: string;
}
/**
 * Params is a key/value object that represents extracted URL parameters.
 */
export interface RouteParams {
    [paramName: string]: string | string[];
}
export type RouteResultSync<T> = T | null | undefined;
export interface RouteContext<R = any, C extends RouterContext = RouterContext> extends ResolveContext {
    /**
     * Current router instance.
     */
    router: UniversalRouterSync<R, C>;
    /**
     * Matched route object.
     */
    route: Route<R, C>;
    /**
     * Base URL path relative to the path of the current route.
     */
    baseUrl: string;
    /**
     * Matched path.
     */
    path: string;
    /**
     * Matched path params.
     */
    params: RouteParams;
    /**
     * Middleware style function which can continue resolving.
     */
    next: (resume?: boolean) => RouteResultSync<R>;
}
/**
 * A Route is a singular route in your application. It contains a path, an
 * action function, and optional children which are an array of Route.
 * @template C User context that is made union with RouterContext.
 * @template R Result that every action function resolves to.
 */
export interface Route<R = any, C extends RouterContext = RouterContext> {
    /**
     * A string, array of strings, or a regular expression. Defaults to an empty string.
     */
    path?: Path;
    /**
     * A unique string that can be used to generate the route URL.
     */
    name?: string;
    /**
     * The link to the parent route is automatically populated by the router. Useful for breadcrumbs.
     */
    parent?: Route<R, C> | null;
    /**
     * An array of Route objects. Nested routes are perfect to be used in middleware routes.
     */
    children?: Routes<R, C> | null;
    /**
     * Action method should return anything except `null` or `undefined` to be resolved by router
     * otherwise router will throw `Page not found` error if all matched routes returned nothing.
     */
    action?: (context: RouteContext<R, C>, params: RouteParams) => RouteResultSync<R>;
    /**
     * The route path match function. Used for internal caching.
     */
    match?: MatchFunction<RouteParams>;
}
/**
 * Routes is an array of type Route.
 * @template C User context that is made union with RouterContext.
 * @template R Result that every action function resolves to.
 */
export type Routes<R = any, C extends RouterContext = RouterContext> = Array<Route<R, C>>;
export type ResolveRoute<R = any, C extends RouterContext = RouterContext> = (context: RouteContext<R, C>, params: RouteParams) => RouteResultSync<R>;
export type RouteError = Error & {
    status?: number;
};
export type ErrorHandler<R = any> = (error: RouteError, context: ResolveContext) => RouteResultSync<R>;
export interface RouterOptions<R = any, C extends RouterContext = RouterContext> extends ParseOptions, TokensToRegexpOptions, RegexpToFunctionOptions {
    context?: C;
    baseUrl?: string;
    resolveRoute?: ResolveRoute<R, C>;
    errorHandler?: ErrorHandler<R>;
}
export interface RouteMatch<R = any, C extends RouterContext = RouterContext> {
    route: Route<R, C>;
    baseUrl: string;
    path: string;
    params: RouteParams;
}
declare class UniversalRouterSync<R = any, C extends RouterContext = RouterContext> {
    root: Route<R, C>;
    baseUrl: string;
    options: RouterOptions<R, C>;
    constructor(routes: Routes<R, C> | Route<R, C>, options?: RouterOptions<R, C>);
    /**
     * Traverses the list of routes in the order they are defined until it finds
     * the first route that matches provided URL path string and whose action function
     * returns anything other than `null` or `undefined`.
     */
    resolve(pathnameOrContext: string | ResolveContext): RouteResultSync<R>;
}
export default UniversalRouterSync;
