import { h } from 'vue';
import { useForwardRef } from './forwardRef.js';

var icon = {
    emits: ['tap'],
    setup(__props, { slots, emit, attrs }) {
        const iconType = attrs.type.replace(/_/g, '-');
        const forwardRef = useForwardRef();
        return () => (h('taro-icon-core', {
            ref: forwardRef,
            class: ['hydrated', `weui-icon-${iconType}`],
            onClick(e) {
                emit('tap', e);
            }
        }, slots));
    }
};

export { icon as default };
//# sourceMappingURL=icon.js.map
