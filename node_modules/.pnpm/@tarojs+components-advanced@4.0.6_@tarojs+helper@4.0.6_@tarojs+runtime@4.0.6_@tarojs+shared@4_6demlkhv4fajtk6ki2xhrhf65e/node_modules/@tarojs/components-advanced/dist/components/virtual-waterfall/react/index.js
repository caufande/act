import { __rest } from 'tslib';
import { ScrollView, View } from '@tarojs/components';
import React from 'react';
import Waterfall from './waterfall.js';
import outerWrapper from './wrapper.js';

const VirtualWaterfall = React.forwardRef(function VirtualWaterfall(props, ref) {
    const _a = props, { outerElementType = ScrollView, innerElementType = View, itemElementType = View, initialScrollOffset = 0, overscanDistance = 50, queryPrefix = '' } = _a, rest = __rest(_a, ["outerElementType", "innerElementType", "itemElementType", "initialScrollOffset", "overscanDistance", "queryPrefix"]);
    if ('children' in rest) {
        console.warn('Taro(VirtualWaterfall): children props have been deprecated. ' + 'Please use the item props instead.');
        rest.item = rest.children;
    }
    if (rest.item instanceof Array) {
        console.warn('Taro(VirtualWaterfall): item should not be an array');
        rest.item = rest.item[0];
    }
    return React.createElement(Waterfall, Object.assign(Object.assign({ ref }, rest), { outerElementType,
        itemElementType,
        innerElementType,
        initialScrollOffset,
        overscanDistance,
        outerWrapper,
        queryPrefix }));
});

export { VirtualWaterfall as default };
//# sourceMappingURL=index.js.map
