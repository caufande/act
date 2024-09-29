import './style/index.scss.js';
import classNames from 'classnames';
import { omit, createForwardRefComponent } from '../../utils/index.js';
import { jsx } from 'react/jsx-runtime';

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
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/react-in-jsx-scope
    jsx("i", {
      ref: forwardedRef,
      ...omit(props, ['type', 'className', 'forwardedRef']),
      className: cls,
      style: style
    })
  );
};
var index = createForwardRefComponent(Icon);

export { index as default };
//# sourceMappingURL=index.js.map
