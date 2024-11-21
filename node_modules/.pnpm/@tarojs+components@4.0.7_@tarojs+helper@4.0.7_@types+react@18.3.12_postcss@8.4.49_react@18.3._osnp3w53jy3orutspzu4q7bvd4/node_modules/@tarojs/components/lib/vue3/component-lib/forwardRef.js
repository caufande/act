import { getCurrentInstance } from 'vue';

function useForwardRef() {
    const instance = getCurrentInstance();
    function forwardRef(ref) {
        instance.exposed = ref;
        instance.exposeProxy = ref;
    }
    return forwardRef;
}

export { useForwardRef };
//# sourceMappingURL=forwardRef.js.map
