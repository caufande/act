import libDeepEqual from 'deep-equal';
import { HTMLToJSON } from 'html-to-json-parser';
export function range(from, to) {
    return Array(to - from).fill(from)
        .map((a, b) => a + b);
}
export function lowerFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function removeBlankBetweenAttr(str) {
    return str.replace(/(?<=>)\s+(?=<)/g, '');
}
export function textToDate(text) {
    const arr = text.split('/').map(n => parseInt(n));
    arr[1]--;
    return new Date(...arr);
}
export async function postHtmlToJson(postHtml) {
    const html = removeBlankBetweenAttr(`<div>${postHtml}</div>`);
    return await HTMLToJSON(html);
}
export function deepEqual(a, b) {
    return libDeepEqual(a, b, { strict: true });
}
export function getHolder() {
    let res = () => { throw Error(); };
    const promise = new Promise(r => res = r);
    return { promise, res };
}
export const NetDebounce = (comparator = (args, argsCached) => deepEqual(args, argsCached)) => {
    return (target) => {
        const caches = new Set();
        return function (...args) {
            for (const [argsCached, cache] of caches) {
                if (comparator(args, argsCached))
                    return cache;
            }
            const { res, promise } = getHolder();
            const id = [args, promise];
            caches.add(id);
            return target.apply(this, args).then(r => {
                caches.delete(id);
                res(r);
                return r;
            });
        };
    };
};
