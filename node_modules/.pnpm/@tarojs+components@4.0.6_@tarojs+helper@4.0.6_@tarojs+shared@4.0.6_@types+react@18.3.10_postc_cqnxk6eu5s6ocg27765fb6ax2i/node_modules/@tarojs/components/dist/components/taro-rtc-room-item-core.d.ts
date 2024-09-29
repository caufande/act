import type { Components, JSX } from "../types/components";

interface TaroRtcRoomItemCore extends Components.TaroRtcRoomItemCore, HTMLElement {}
export const TaroRtcRoomItemCore: {
  prototype: TaroRtcRoomItemCore;
  new (): TaroRtcRoomItemCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
