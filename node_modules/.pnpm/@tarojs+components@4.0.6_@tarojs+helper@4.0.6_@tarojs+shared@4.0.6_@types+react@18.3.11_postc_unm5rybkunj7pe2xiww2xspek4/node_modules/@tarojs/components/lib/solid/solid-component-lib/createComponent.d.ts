import { Component, JSX } from 'solid-js';
export interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
}
export type StencilSolidInternalProps<ElementType> = JSX.DOMAttributes<ElementType>;
export interface ComponentSupplementaryTypes {
    style?: JSX.CSSProperties;
    slot?: string;
}
export declare const createSolidComponent: <PropType, ElementType extends HTMLStencilElement, ExpandedPropsTypes = any>(tagName: string, manipulatePropsFunction?: (originalProps: StencilSolidInternalProps<ElementType>, newProps: any) => ExpandedPropsTypes, defineCustomElement?: () => void) => Component<PropType & JSX.DOMAttributes<ElementType> & ComponentSupplementaryTypes>;
