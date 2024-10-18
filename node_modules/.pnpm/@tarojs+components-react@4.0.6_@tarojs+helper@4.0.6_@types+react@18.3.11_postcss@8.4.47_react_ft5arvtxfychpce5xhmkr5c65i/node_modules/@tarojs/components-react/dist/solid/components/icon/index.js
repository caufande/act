import { template, use, spread, mergeProps } from 'solid-js/web';
import './style/index.scss.js';
import classNames from 'classnames';
import { omit, createForwardRefComponent } from '../../utils/index.js';

var _tmpl$ = /*#__PURE__*/template(`<i>`);
const Icon = props => {
  let {
    type,
    className = '',
    size = '23',
    color,
    forwardedRef
  } = props;
  if (type) type = type.replace(/_/g, '-');
  const cls = classNames({
    [`weui-icon-${type}`]: true
  }, className);
  const style = {
    'font-size': size + 'px',
    color: color
  };
  return (// eslint-disable-next-line react/react-in-jsx-scope
    (() => {
      var _el$ = _tmpl$();
      var _ref$ = forwardedRef;
      typeof _ref$ === "function" ? use(_ref$, _el$) : forwardedRef = _el$;
      spread(_el$, mergeProps(() => omit(props, ['type', 'className', 'forwardedRef']), {
        "className": cls,
        "style": style
      }), false, false);
      return _el$;
    })()
  );
};
var index = createForwardRefComponent(Icon);

export { index as default };
//# sourceMappingURL=index.js.map
