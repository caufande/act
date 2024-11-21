import { addLeadingSlash } from '@tarojs/runtime';

class RoutesAlias {
    constructor() {
        this.conf = [];
        this.getConfig = (url = '') => {
            const customRoute = this.conf.filter((arr) => {
                return arr.includes(url);
            });
            return customRoute[0];
        };
        this.getOrigin = (url = '') => {
            var _a;
            return ((_a = this.getConfig(url)) === null || _a === void 0 ? void 0 : _a[0]) || url;
        };
        this.getAlias = (url = '') => {
            var _a;
            return ((_a = this.getConfig(url)) === null || _a === void 0 ? void 0 : _a[1]) || url;
        };
        this.getAll = (url = '') => {
            return this.conf
                .filter((arr) => arr.includes(url))
                .reduceRight((p, a) => {
                p.unshift(a[1]);
                return p;
            }, []);
        };
    }
    set(customRoutes = {}) {
        for (let key in customRoutes) {
            const path = customRoutes[key];
            key = addLeadingSlash(key);
            if (typeof path === 'string') {
                this.conf.push([key, addLeadingSlash(path)]);
            }
            else if ((path === null || path === void 0 ? void 0 : path.length) > 0) {
                this.conf.push(...path.map(p => [key, addLeadingSlash(p)]));
            }
        }
    }
}
const routesAlias = new RoutesAlias();

export { routesAlias };
