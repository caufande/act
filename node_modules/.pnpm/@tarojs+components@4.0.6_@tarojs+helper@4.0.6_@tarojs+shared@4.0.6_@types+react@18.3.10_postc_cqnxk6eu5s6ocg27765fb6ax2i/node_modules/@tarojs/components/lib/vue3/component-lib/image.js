import { h } from 'vue';
import { useForwardRef } from './forwardRef.js';

var image = {
    emits: ['tap'],
    setup(__props, { slots, emit, attrs }) {
        const forwardRef = useForwardRef();
        return () => (h('taro-image-core', {
            ref: forwardRef,
            class: ['hydrated', {
                    'taro-img__widthfix': attrs.mode === 'widthFix'
                }],
            onClick(e) {
                emit('tap', e);
            }
        }, slots));
    }
};

export { image as default };
//# sourceMappingURL=image.js.map
