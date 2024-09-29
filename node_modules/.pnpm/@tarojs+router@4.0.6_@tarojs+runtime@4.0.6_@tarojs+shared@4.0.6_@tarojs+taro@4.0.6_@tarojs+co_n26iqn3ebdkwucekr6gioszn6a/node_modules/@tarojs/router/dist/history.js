import { addLeadingSlash } from '@tarojs/runtime';
import { createBrowserHistory, createHashHistory, Action } from 'history';
export { createBrowserHistory, createHashHistory } from 'history';
import { RouterConfig } from './router/index.js';

let history;
let basename = '/';
class MpaHistory {
    constructor() {
        this.back = window.history.back;
        this.forward = window.history.forward;
        this.pushState = this.eventState('pushState');
        this.replaceState = this.eventState('replaceState');
    }
    get location() {
        return {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            key: `${window.history.length}`,
            state: window.history.state
        };
    }
    createHref(_to) {
        throw new Error('Method not implemented.');
    }
    parseUrl(to) {
        let url = to.pathname || '';
        if (RouterConfig.isPage(addLeadingSlash(url))) {
            url += '.html';
        }
        if (to.search) {
            url += `?${to.search}`;
        }
        if (to.hash) {
            url += to.hash.startsWith('#') ? to.hash : `#${to.hash}`;
        }
        return url;
    }
    push(to, _state = {}) {
        window.location.assign(this.parseUrl(to));
        // this.pushState(_state, '', this.parseUrl(to))
    }
    replace(to, _state = {}) {
        window.location.replace(this.parseUrl(to));
        // this.replaceState(_state, '', this.parseUrl(to))
    }
    go(delta) {
        window.history.go(delta);
    }
    listen(listener) {
        function callback(e) {
            if (e.action === 'pushState') {
                listener({ action: Action.Push, location: this.location });
            }
            else if (e.action === 'replaceState') {
                listener({ action: Action.Replace, location: this.location });
            }
            else {
                // NOTE: 这里包括 back、forward、go 三种可能，并非是 POP 事件
                listener({ action: Action.Pop, location: this.location });
            }
        }
        window.addEventListener('popstate', callback);
        return () => {
            window.removeEventListener('popstate', callback);
        };
    }
    block(_blocker) {
        throw new Error('Method not implemented.');
    }
    eventState(action) {
        return (data, unused, url) => {
            const wrapper = window.history[action](data, unused, url);
            const evt = new Event(action);
            evt.action = action;
            evt.state = data;
            evt.unused = unused;
            evt.url = url;
            window.dispatchEvent(evt);
            return wrapper;
        };
    }
}
function setHistory(h, base = '/') {
    history = h;
    basename = base;
}
function createMpaHistory(_) {
    return new MpaHistory();
}
function setHistoryMode(mode, base = '/') {
    const options = {
        window
    };
    basename = base;
    if (mode === 'browser') {
        history = createBrowserHistory(options);
    }
    else if (mode === 'multi') {
        history = createMpaHistory();
    }
    else {
        // default is hash
        history = createHashHistory(options);
    }
}
function prependBasename(url = '') {
    return basename.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
}

export { createMpaHistory, history, prependBasename, setHistory, setHistoryMode };
