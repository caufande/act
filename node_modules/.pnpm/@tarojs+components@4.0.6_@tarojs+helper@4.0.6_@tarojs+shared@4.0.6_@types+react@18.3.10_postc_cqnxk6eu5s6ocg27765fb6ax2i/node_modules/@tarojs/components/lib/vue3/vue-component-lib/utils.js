import { defineComponent, ref, getCurrentInstance, inject, h } from 'vue';

/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/vue-output-target/vue-component-lib/utils.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
const UPDATE_VALUE_EVENT = 'update:modelValue';
const MODEL_VALUE = 'modelValue';
const ROUTER_LINK_VALUE = 'routerLink';
const NAV_MANAGER = 'navManager';
const ROUTER_PROP_PREFIX = 'router';
const ARIA_PROP_PREFIX = 'aria';
/**
 * Starting in Vue 3.1.0, all properties are
 * added as keys to the props object, even if
 * they are not being used. In order to correctly
 * account for both value props and v-model props,
 * we need to check if the key exists for Vue <3.1.0
 * and then check if it is not undefined for Vue >= 3.1.0.
 * See https://github.com/vuejs/vue-next/issues/3889
 */
const EMPTY_PROP = Symbol('EMPTY_PROP');
const DEFAULT_EMPTY_PROP = { default: EMPTY_PROP };
const getComponentClasses = (classes) => {
    return (classes === null || classes === void 0 ? void 0 : classes.split(' ')) || [];
};
const getElementClasses = (ref, componentClasses, defaultClasses = []) => {
    var _a;
    return [...Array.from(((_a = ref.value) === null || _a === void 0 ? void 0 : _a.classList) || []), ...defaultClasses].filter((c, i, self) => !componentClasses.has(c) && self.indexOf(c) === i);
};
/**
 * Create a callback to define a Vue component wrapper around a Web Component.
 *
 * @prop name - The component tag name (i.e. `ion-button`)
 * @prop componentProps - An array of properties on the
 * component. These usually match up with the @Prop definitions
 * in each component's TSX file.
 * @prop customElement - An option custom element instance to pass
 * to customElements.define. Only set if `includeImportCustomElements: true` in your config.
 * @prop modelProp - The prop that v-model binds to (i.e. value)
 * @prop modelUpdateEvent - The event that is fired from your Web Component when the value changes (i.e. ionChange)
 * @prop externalModelUpdateEvent - The external event to fire from your Vue component when modelUpdateEvent fires. This is used for ensuring that v-model references have been
 * correctly updated when a user's event callback fires.
 */
const defineContainer = (name, defineCustomElement, componentProps = [], modelProp, modelUpdateEvent, externalModelUpdateEvent) => {
    /**
     * Create a Vue component wrapper around a Web Component.
     * Note: The `props` here are not all properties on a component.
     * They refer to whatever properties are set on an instance of a component.
     */
    if (!DEPRECATED_ADAPTER_COMPONENT && defineCustomElement !== undefined) {
        defineCustomElement();
    }
    const Container = defineComponent((props, { attrs, slots, emit }) => {
        var _a;
        let modelPropValue = props[modelProp];
        const containerRef = ref();
        const classes = new Set(getComponentClasses(attrs.class));
        const onVnodeBeforeMount = (vnode) => {
            // Add a listener to tell Vue to update the v-model
            if (vnode.el) {
                const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
                eventsNames.forEach((eventName) => {
                    vnode.el.addEventListener(eventName.toLowerCase(), (e) => {
                        modelPropValue = (e === null || e === void 0 ? void 0 : e.target)[modelProp];
                        emit(UPDATE_VALUE_EVENT, modelPropValue);
                        /**
                         * We need to emit the change event here
                         * rather than on the web component to ensure
                         * that any v-model bindings have been updated.
                         * Otherwise, the developer will listen on the
                         * native web component, but the v-model will
                         * not have been updated yet.
                         */
                        if (externalModelUpdateEvent) {
                            emit(externalModelUpdateEvent, e);
                        }
                    });
                });
            }
        };
        const currentInstance = getCurrentInstance();
        const hasRouter = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.appContext) === null || _a === void 0 ? void 0 : _a.provides[NAV_MANAGER];
        const navManager = hasRouter ? inject(NAV_MANAGER) : undefined;
        const handleRouterLink = (ev) => {
            const { routerLink } = props;
            if (routerLink === EMPTY_PROP)
                return;
            if (navManager !== undefined) {
                const navigationPayload = { event: ev };
                for (const key in props) {
                    const value = props[key];
                    if (props.hasOwnProperty(key) && key.startsWith(ROUTER_PROP_PREFIX) && value !== EMPTY_PROP) {
                        navigationPayload[key] = value;
                    }
                }
                navManager.navigate(navigationPayload);
            }
            else {
                console.warn('Tried to navigate, but no router was found. Make sure you have mounted Vue Router.');
            }
        };
        return () => {
            modelPropValue = props[modelProp];
            getComponentClasses(attrs.class).forEach((value) => {
                classes.add(value);
            });
            const oldClick = props.onClick;
            const handleClick = (ev) => {
                if (oldClick !== undefined) {
                    oldClick(ev);
                }
                if (!ev.defaultPrevented) {
                    handleRouterLink(ev);
                }
            };
            let propsToAdd = {
                ref: containerRef,
                class: getElementClasses(containerRef, classes),
                onClick: (ev) => {
                    handleClick(ev);
                    emit('tap', ev); // Note(taro): 为 click 事件绑定 tap 事件
                },
                onVnodeBeforeMount: modelUpdateEvent ? onVnodeBeforeMount : undefined,
            };
            /**
             * We can use Object.entries here
             * to avoid the hasOwnProperty check,
             * but that would require 2 iterations
             * where as this only requires 1.
             */
            for (const key in props) {
                const value = props[key];
                if ((props.hasOwnProperty(key) && value !== EMPTY_PROP) || key.startsWith(ARIA_PROP_PREFIX)) {
                    propsToAdd[key] = value;
                }
            }
            if (modelProp) {
                /**
                 * If form value property was set using v-model
                 * then we should use that value.
                 * Otherwise, check to see if form value property
                 * was set as a static value (i.e. no v-model).
                 */
                if (props[MODEL_VALUE] !== EMPTY_PROP) {
                    propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: props[MODEL_VALUE] });
                }
                else if (modelPropValue !== EMPTY_PROP) {
                    propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: modelPropValue });
                }
            }
            return h(name, propsToAdd, slots.default && slots.default());
        };
    });
    Container.displayName = name;
    Container.props = {
        [ROUTER_LINK_VALUE]: DEFAULT_EMPTY_PROP,
    };
    componentProps.forEach((componentProp) => {
        Container.props[componentProp] = DEFAULT_EMPTY_PROP;
    });
    if (modelProp) {
        Container.props[MODEL_VALUE] = DEFAULT_EMPTY_PROP;
        Container.emits = [UPDATE_VALUE_EVENT, externalModelUpdateEvent];
    }
    return Container;
};

export { defineContainer };
//# sourceMappingURL=utils.js.map
