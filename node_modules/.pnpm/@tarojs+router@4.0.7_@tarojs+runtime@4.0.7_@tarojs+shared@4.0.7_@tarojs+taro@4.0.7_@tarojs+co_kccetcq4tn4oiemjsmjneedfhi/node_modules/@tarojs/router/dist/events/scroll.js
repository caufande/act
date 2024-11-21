import { Current } from '@tarojs/runtime';

const pageScrollFn = {};
let pageDOM = window;
function bindPageScroll(page, scrollEl, distance = 50) {
    var _a;
    const pagePath = (page ? page === null || page === void 0 ? void 0 : page.path : (_a = Current.router) === null || _a === void 0 ? void 0 : _a.path);
    pageScrollFn[pagePath] && scrollEl.removeEventListener('scroll', pageScrollFn[pagePath]);
    pageDOM = scrollEl;
    let isReachBottom = false;
    pageScrollFn[pagePath] = function () {
        var _a;
        (_a = page.onPageScroll) === null || _a === void 0 ? void 0 : _a.call(page, {
            scrollTop: pageDOM instanceof Window ? window.scrollY : pageDOM.scrollTop
        });
        if (isReachBottom && getOffset() > distance) {
            isReachBottom = false;
        }
        if (page.onReachBottom &&
            !isReachBottom &&
            getOffset() < distance) {
            isReachBottom = true;
            page.onReachBottom();
        }
    };
    pageDOM.addEventListener('scroll', pageScrollFn[pagePath], false);
}
function getOffset() {
    if (pageDOM instanceof Window) {
        return document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    }
    else {
        return pageDOM.scrollHeight - pageDOM.scrollTop - pageDOM.clientHeight;
    }
}

export { bindPageScroll };
