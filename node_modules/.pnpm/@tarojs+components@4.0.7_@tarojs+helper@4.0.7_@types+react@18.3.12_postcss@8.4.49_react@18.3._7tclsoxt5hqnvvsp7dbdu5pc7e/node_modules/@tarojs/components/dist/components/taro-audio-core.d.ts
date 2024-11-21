import type { Components, JSX } from "../types/components";

interface TaroAudioCore extends Components.TaroAudioCore, HTMLElement {}
export const TaroAudioCore: {
  prototype: TaroAudioCore;
  new (): TaroAudioCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
