import Waterfall from './waterfall.js';

const VirtualWaterfall = Waterfall;
function install(Vue) {
    Vue.component('virtual-waterfall', Waterfall);
}
var index = {
    install
};

export { VirtualWaterfall, index as default };
//# sourceMappingURL=index.js.map
