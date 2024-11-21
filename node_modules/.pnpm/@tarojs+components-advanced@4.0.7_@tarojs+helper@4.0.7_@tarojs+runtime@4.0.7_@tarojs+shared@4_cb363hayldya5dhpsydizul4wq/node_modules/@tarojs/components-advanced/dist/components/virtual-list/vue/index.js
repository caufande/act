import List from './list.js';

const VirtualList = List;
function install(Vue) {
    Vue.component('virtual-list', VirtualList);
}
var index = {
    install
};

export { VirtualList, index as default };
//# sourceMappingURL=index.js.map
