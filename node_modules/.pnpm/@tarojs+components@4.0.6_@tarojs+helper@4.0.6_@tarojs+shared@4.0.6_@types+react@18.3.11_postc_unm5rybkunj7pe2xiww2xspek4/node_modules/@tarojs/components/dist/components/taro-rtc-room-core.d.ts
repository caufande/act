import type { Components, JSX } from "../types/components";

interface TaroRtcRoomCore extends Components.TaroRtcRoomCore, HTMLElement {}
export const TaroRtcRoomCore: {
  prototype: TaroRtcRoomCore;
  new (): TaroRtcRoomCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
