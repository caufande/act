class Stacks {
    constructor() {
        this.stacks = [];
        this.backDelta = 0;
        this.tabs = {};
        this.methodName = '';
    }
    set delta(delta) {
        if (delta > 0) {
            this.backDelta = delta;
        }
        else if (this.backDelta > 0) {
            --this.backDelta;
        }
        else {
            this.backDelta = 0;
        }
    }
    get delta() {
        return this.backDelta;
    }
    set method(methodName) {
        this.methodName = methodName;
    }
    get method() {
        return this.methodName;
    }
    get length() {
        return this.stacks.length;
    }
    get last() {
        return this.stacks[this.length - 1];
    }
    get() {
        return this.stacks;
    }
    getItem(index) {
        return this.stacks[index];
    }
    getLastIndex(pathname, stateWith = 1) {
        const list = [...this.stacks].reverse();
        return list.findIndex((page, i) => { var _a; return i >= stateWith && ((_a = page.path) === null || _a === void 0 ? void 0 : _a.replace(/\?.*/g, '')) === pathname; });
    }
    getDelta(pathname) {
        if (this.backDelta >= 1) {
            return this.backDelta;
        }
        const index = this.getLastIndex(pathname);
        // NOTE: 此处为了修复浏览器后退多级页面，在大量重复路由状况下可能出现判断错误的情况 （增强判断能力只能考虑在 query 中新增参数来判断，暂时搁置）
        return index > 0 ? index : 1;
    }
    getPrevIndex(pathname, stateWith = 1) {
        const lastIndex = this.getLastIndex(pathname, stateWith);
        if (lastIndex < 0) {
            return -1;
        }
        return this.length - 1 - lastIndex;
    }
    pop() {
        return this.stacks.pop();
    }
    push(page) {
        return this.stacks.push(page);
    }
    getTabs() {
        return this.tabs;
    }
    pushTab(path) {
        this.tabs[path] = this.last;
        this.pop();
    }
    popTab(path) {
        this.push(this.tabs[path]);
        delete this.tabs[path];
    }
    removeTab(path) {
        delete this.tabs[path];
    }
}
const stacks = new Stacks();

export { stacks as default };
