import { __rest } from 'tslib';
import React from 'react';
import '../../../utils/index.js';
import { convertPX2Int } from '../../../utils/convert.js';

function getRenderExpandNodes({ direction, isHorizontal, isRtl, id: sid, innerElement, renderExpand, }) {
    const id = `${sid}-${direction}`;
    const props = {
        key: id,
        id,
        style: {
            visibility: 'hidden',
            height: isHorizontal ? '100%' : 100,
            width: isHorizontal ? 100 : '100%',
            [isHorizontal ? isRtl ? 'marginRight' : 'marginLeft' : 'marginTop']: -100,
            zIndex: -1,
        }
    };
    const expands = [renderExpand, React.createElement(innerElement, props)];
    if (isHorizontal ? isRtl ? direction === 'right' : direction === 'left' : direction === 'top') {
        expands.reverse();
    }
    return expands;
}
const outerWrapper = React.forwardRef(function OuterWrapper(props, ref) {
    const _a = props, { id = '', className, style = {}, children, outerElementType, innerElementType, onScroll, onScrollNative, renderTop, renderBottom, layout, direction } = _a, rest = __rest(_a, ["id", "className", "style", "children", "outerElementType", "innerElementType", "onScroll", "onScrollNative", "renderTop", "renderBottom", "layout", "direction"]);
    const handleScroll = (event) => {
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.detail), { clientWidth: convertPX2Int(style.width), clientHeight: convertPX2Int(style.height) }) }));
        if (typeof onScrollNative === 'function') {
            onScrollNative(event);
        }
    };
    const isHorizontal = layout === 'horizontal';
    const isRtl = direction === 'rtl';
    return React.createElement(outerElementType, Object.assign({ ref,
        id,
        className,
        style, scrollY: !isHorizontal, scrollX: isHorizontal, onScroll: handleScroll }, rest), [
        getRenderExpandNodes({
            direction: isHorizontal ? isRtl ? 'right' : 'left' : 'top',
            isHorizontal,
            isRtl,
            id,
            innerElement: innerElementType,
            renderExpand: renderTop,
        }),
        children,
        getRenderExpandNodes({
            direction: isHorizontal ? isRtl ? 'left' : 'right' : 'bottom',
            isHorizontal,
            isRtl,
            id,
            innerElement: innerElementType,
            renderExpand: renderBottom,
        }),
    ]);
});

export { outerWrapper as default };
//# sourceMappingURL=wrapper.js.map
