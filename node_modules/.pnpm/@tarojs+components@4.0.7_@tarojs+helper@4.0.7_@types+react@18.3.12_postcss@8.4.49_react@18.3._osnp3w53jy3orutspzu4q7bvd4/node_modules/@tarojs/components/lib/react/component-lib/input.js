import React from 'react';
import reactifyWebComponent from './reactify-wc.js';

const Input = reactifyWebComponent('taro-input-core');
const h = React.createElement;
// eslint-disable-next-line react/display-name
var input = React.forwardRef((props, ref) => {
    const args = Object.assign({}, props);
    if (args.hasOwnProperty('focus')) {
        args.autoFocus = Boolean(args.focus);
        delete args.focus;
    }
    return (h(Input, Object.assign(Object.assign({}, args), { ref })));
});

export { input as default };
//# sourceMappingURL=input.js.map
