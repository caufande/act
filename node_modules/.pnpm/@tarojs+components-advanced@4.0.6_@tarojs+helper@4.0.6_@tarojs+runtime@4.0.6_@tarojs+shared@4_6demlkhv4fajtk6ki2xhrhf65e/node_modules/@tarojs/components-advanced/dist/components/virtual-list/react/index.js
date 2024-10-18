import { __rest } from 'tslib';
import { ScrollView, View } from '@tarojs/components';
import React from 'react';
import List from './list.js';
import outerWrapper from './wrapper.js';

const VirtualList = React.forwardRef(function VirtualList(props, ref) {
    const _a = props, { direction = 'ltr', outerElementType = ScrollView, innerElementType = View, itemElementType = View, initialScrollOffset = 0, overscanCount = 1, queryPrefix = '' } = _a, rest = __rest(_a, ["direction", "outerElementType", "innerElementType", "itemElementType", "initialScrollOffset", "overscanCount", "queryPrefix"]);
    if ('children' in rest) {
        console.warn('Taro(VirtualList): children props have been deprecated. ' + 'Please use the item props instead.');
        rest.item = rest.children;
    }
    if (rest.item instanceof Array) {
        console.warn('Taro(VirtualList): item should not be an array');
        rest.item = rest.item[0];
    }
    return React.createElement(List, Object.assign(Object.assign({ ref }, rest), { outerElementType,
        itemElementType,
        innerElementType,
        direction,
        initialScrollOffset,
        overscanCount,
        queryPrefix,
        outerWrapper }));
});

export { VirtualList as default };
//# sourceMappingURL=index.js.map
