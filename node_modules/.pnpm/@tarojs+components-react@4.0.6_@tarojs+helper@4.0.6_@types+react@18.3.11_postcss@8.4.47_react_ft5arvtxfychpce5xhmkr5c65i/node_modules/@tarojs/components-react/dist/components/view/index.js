import { __rest } from 'tslib';
import classNames from 'classnames';
import { useState, useEffect } from '../../utils/hooks.react.js';
import { createForwardRefComponent } from '../../utils/index.js';
import { jsx } from 'react/jsx-runtime';

function View(_a) {
  var {
      className,
      hoverClass,
      forwardedRef,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      hoverStartTime = 50,
      hoverStayTime = 400
    } = _a,
    other = __rest(_a, ["className", "hoverClass", "forwardedRef", "onTouchStart", "onTouchEnd", "onTouchMove", "hoverStartTime", "hoverStayTime"]);
  let timeoutEvent;
  let startTime = 0;
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);
  const [cls, setCls] = useState(classNames('', {
    [`${hoverClass}`]: "react" === 'solid' ? hover() : hover
  }, className));
  const _onTouchStart = e => {
    if (hoverClass) {
      setTouch(true);
      setTimeout(() => {
        if ("react" === 'solid' ? touch() : touch) {
          setHover(true);
        }
      }, hoverStartTime);
    }
    onTouchStart && onTouchStart(e);
    if (other.onLongPress) {
      timeoutEvent = setTimeout(() => {
        other.onLongPress();
      }, 350);
      startTime = new Date().getTime();
    }
  };
  const _onTouchMove = e => {
    clearTimeout(timeoutEvent);
    onTouchMove && onTouchMove(e);
  };
  const _onTouchEnd = e => {
    const spanTime = new Date().getTime() - startTime;
    if (spanTime < 350) {
      clearTimeout(timeoutEvent);
    }
    if (hoverClass) {
      setTouch(false);
      setTimeout(() => {
        if ("react" === 'solid' ? touch() : touch) {
          setHover(false);
        }
      }, hoverStayTime);
    }
    onTouchEnd && onTouchEnd(e);
  };
  useEffect(() => {
    setCls(classNames('', {
      [`${hoverClass}`]: "react" === 'solid' ? hover() : hover
    }, className));
  }, [hover, className]);
  return /*#__PURE__*/jsx("div", {
    ref: forwardedRef,
    className: "react" === 'solid' ? cls() : cls,
    onTouchStart: _onTouchStart,
    onTouchEnd: _onTouchEnd,
    onTouchMove: _onTouchMove,
    ...other,
    children: other.children
  });
}
var index = createForwardRefComponent(View);

export { index as default };
//# sourceMappingURL=index.js.map
