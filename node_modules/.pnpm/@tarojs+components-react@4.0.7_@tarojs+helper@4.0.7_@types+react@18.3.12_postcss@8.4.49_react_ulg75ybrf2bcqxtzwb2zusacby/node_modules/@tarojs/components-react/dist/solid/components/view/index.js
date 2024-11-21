import { template, use, spread, mergeProps, memo, insert, delegateEvents } from 'solid-js/web';
import { __rest } from 'tslib';
import classNames from 'classnames';
import { useState, useEffect } from '../../utils/hooks.solid.js';
import { createForwardRefComponent } from '../../utils/index.js';

var _tmpl$ = /*#__PURE__*/template(`<div>`);
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
    [`${hoverClass}`]: "solid" === 'solid' ? hover() : hover
  }, className));
  const _onTouchStart = e => {
    if (hoverClass) {
      setTouch(true);
      setTimeout(() => {
        if ("solid" === 'solid' ? touch() : touch) {
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
        if ("solid" === 'solid' ? touch() : touch) {
          setHover(false);
        }
      }, hoverStayTime);
    }
    onTouchEnd && onTouchEnd(e);
  };
  useEffect(() => {
    setCls(classNames('', {
      [`${hoverClass}`]: "solid" === 'solid' ? hover() : hover
    }, className));
  }, [hover, className]);
  return (() => {
    var _el$ = _tmpl$();
    _el$.$$touchmove = _onTouchMove;
    _el$.$$touchend = _onTouchEnd;
    _el$.$$touchstart = _onTouchStart;
    var _ref$ = forwardedRef;
    typeof _ref$ === "function" ? use(_ref$, _el$) : forwardedRef = _el$;
    spread(_el$, mergeProps({
      get className() {
        return memo(() => "solid" === 'solid')() ? cls() : cls;
      }
    }, other), false, true);
    insert(_el$, () => other.children);
    return _el$;
  })();
}
var index = createForwardRefComponent(View);
delegateEvents(["touchstart", "touchend", "touchmove"]);

export { index as default };
//# sourceMappingURL=index.js.map
