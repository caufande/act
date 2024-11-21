export default function createComponent(name: any, classNames?: any[]): {
    emits: string[];
    setup(__props: any, { slots, emit }: {
        slots: any;
        emit: any;
    }): () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
