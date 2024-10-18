import { h } from 'vue';
import { useForwardRef } from './forwardRef.js';

var text = {
    emits: ['tap'],
    setup(__props, { slots, emit, attrs }) {
        const forwardRef = useForwardRef();
        return () => (h('taro-text-core', {
            ref: forwardRef,
            class: ['hydrated', {
                    'taro-text_selectable': attrs.selectable
                }],
            onClick(e) {
                emit('tap', e);
            }
        }, slots));
    }
};

export { text as default };
//# sourceMappingURL=text.js.map
