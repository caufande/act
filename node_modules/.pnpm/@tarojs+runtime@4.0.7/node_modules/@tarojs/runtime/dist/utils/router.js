import { taroLocationProvider } from '../bom/window.js';

// export const removeLeadingSlash = (str = '') => str.replace(/^\.?\//, '')
// export const removeTrailingSearch = (str = '') => str.replace(/\?[\s\S]*$/, '')
const addLeadingSlash = (url = '') => (url.charAt(0) === '/' ? url : '/' + url);
const hasBasename = (path = '', prefix = '') => new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path) || path === prefix;
const stripBasename = (path = '', prefix = '') => hasBasename(path, prefix) ? path.substring(prefix.length) : path;
const stripTrailing = (str = '') => str.replace(/[?#][\s\S]*$/, '');
const stripSuffix = (path = '', suffix = '') => path.includes(suffix) ? path.substring(0, path.length - suffix.length) : path;
const getHomePage = (path = '', basename = '', customRoutes = {}, entryPagePath = '') => {
    var _a;
    const routePath = addLeadingSlash(stripBasename(path, basename));
    const alias = ((_a = Object.entries(customRoutes).find(([key]) => key === routePath)) === null || _a === void 0 ? void 0 : _a[1]) || routePath;
    return entryPagePath || (typeof alias === 'string' ? alias : alias[0]) || basename;
};
const getCurrentPage = (routerMode = 'hash', basename = '/') => {
    const pagePath = routerMode === 'hash'
        ? taroLocationProvider.hash.slice(1).split('?')[0]
        : taroLocationProvider.pathname;
    return addLeadingSlash(stripBasename(pagePath, basename));
};

export { addLeadingSlash, getCurrentPage, getHomePage, hasBasename, stripBasename, stripSuffix, stripTrailing };
//# sourceMappingURL=router.js.map
