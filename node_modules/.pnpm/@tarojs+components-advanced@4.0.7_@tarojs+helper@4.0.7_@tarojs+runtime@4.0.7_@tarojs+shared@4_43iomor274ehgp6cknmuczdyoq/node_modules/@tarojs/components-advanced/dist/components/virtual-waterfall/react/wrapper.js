import { __rest } from 'tslib';
import React from 'react';
import '../../../utils/index.js';
import { convertPX2Int } from '../../../utils/convert.js';

function getRenderExpandNodes({ direction, id: sid, innerElement, renderExpand, }) {
    const id = `${sid}-${direction}`;
    const props = {
        key: id,
        id,
    };
    if (!renderExpand) {
        props.style = {
            visibility: 'hidden',
            height: 100,
            marginTop: -100,
            zIndex: -1,
        };
    }
    return React.createElement(renderExpand || innerElement, props);
}
const outerWrapper = React.forwardRef(function OuterWrapper(props, ref) {
    const _a = props, { id, className, style, children, outerElementType, innerElementType, onScroll, onScrollNative, renderTop, renderBottom } = _a, rest = __rest(_a, ["id", "className", "style", "children", "outerElementType", "innerElementType", "onScroll", "onScrollNative", "renderTop", "renderBottom"]);
    const handleScroll = (event) => {
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.detail), { clientWidth: convertPX2Int(style.width), clientHeight: convertPX2Int(style.height) }) }));
        if (typeof onScrollNative === 'function') {
            onScrollNative(event);
        }
    };
    return React.createElement(outerElementType, Object.assign({ ref,
        id,
        className,
        style, scrollY: true, onScroll: handleScroll }, rest), [
        getRenderExpandNodes({
            direction: 'top',
            id,
            innerElement: innerElementType,
            renderExpand: renderTop,
        }),
        children,
        getRenderExpandNodes({
            direction: 'bottom',
            id,
            innerElement: innerElementType,
            renderExpand: renderBottom,
        }),
    ]);
});

export { outerWrapper as default };
//# sourceMappingURL=wrapper.js.map
