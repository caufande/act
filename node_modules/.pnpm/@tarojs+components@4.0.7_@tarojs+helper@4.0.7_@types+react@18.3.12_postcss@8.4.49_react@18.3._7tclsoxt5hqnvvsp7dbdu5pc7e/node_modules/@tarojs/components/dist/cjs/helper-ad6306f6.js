'use strict';

const Taro = require('@tarojs/taro');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const Taro__default = /*#__PURE__*/_interopDefaultLegacy(Taro);

function notSupport(name = '', instance = {}) {
  console.error(`H5 暂不支持 ${name} 组件！`);
  Taro__default['default'].eventCenter.trigger('__taroNotSupport', {
    name,
    instance,
    type: 'component',
    category: 'temporarily',
  });
}
function handleStencilNodes(el) {
  var _a;
  (_a = el === null || el === void 0 ? void 0 : el.childNodes) === null || _a === void 0 ? void 0 : _a.forEach(item => {
    // Note: ['s-cn'] Content Reference Node
    if (item.nodeType === document.COMMENT_NODE && item['s-cn'])
      item['s-cn'] = false;
    // Note: ['s-sr'] Is a slot reference node (渲染完成后禁用 slotRelocation 特性, 避免 Stencil 组件相互调用时内置排序与第三方 UI 框架冲突导致组件顺序混乱)
    if (item.nodeType !== document.COMMENT_NODE && item['s-sr'])
      item['s-sr'] = false;
  });
}

exports.handleStencilNodes = handleStencilNodes;
exports.notSupport = notSupport;
