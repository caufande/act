export default function createFormsComponent(name: any, eventName: any, modelValue?: string, classNames?: any[]): {
    emits: string[];
    props: Record<string, any>;
    setup(props: any, { slots, emit }: {
        slots: any;
        emit: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
