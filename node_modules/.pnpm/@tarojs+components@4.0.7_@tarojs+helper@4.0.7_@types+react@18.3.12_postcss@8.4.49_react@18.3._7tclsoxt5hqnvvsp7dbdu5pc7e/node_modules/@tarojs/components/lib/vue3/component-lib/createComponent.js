import { h } from 'vue';
import { useForwardRef } from './forwardRef.js';

function createComponent(name, classNames = []) {
    return {
        emits: ['tap'],
        setup(__props, { slots, emit }) {
            const forwardRef = useForwardRef();
            return () => (h(`${name}-core`, {
                ref: forwardRef,
                class: ['hydrated', ...classNames],
                onClick(e) {
                    emit('tap', e);
                }
            }, slots));
        }
    };
}

export { createComponent as default };
//# sourceMappingURL=createComponent.js.map
