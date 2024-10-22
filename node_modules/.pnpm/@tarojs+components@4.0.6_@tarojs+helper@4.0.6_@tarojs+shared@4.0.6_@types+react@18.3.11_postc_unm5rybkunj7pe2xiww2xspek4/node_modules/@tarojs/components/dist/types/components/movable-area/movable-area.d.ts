export declare class MovableArea {
  /**
   * 当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area
   */
  scaleArea: boolean;
  element: HTMLElement;
  /** 观察者 */
  private observer?;
  /** 子元素集合 */
  private views;
  /** 单个元素缩放时的目标元素 */
  private scaleTarget?;
  /** 手势缩放 */
  private scaleLength;
  /** 宽高 */
  private offset?;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  viewsChanged: () => void;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: (e: TouchEvent) => void;
  updateScale: (scale: number) => void;
  updateArea: () => void;
  render(): any;
}
