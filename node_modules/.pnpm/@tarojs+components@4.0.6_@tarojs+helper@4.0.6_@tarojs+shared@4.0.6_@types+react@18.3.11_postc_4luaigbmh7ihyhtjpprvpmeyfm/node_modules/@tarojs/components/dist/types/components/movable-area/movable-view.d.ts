import { EventEmitter } from '../../stencil-public-runtime';
export declare class MovableView {
  /**
   * 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画；单位支持px；
   */
  x: number | string;
  /**
   * 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画；单位支持px；
   */
  y: number | string;
  /**
   * 移动方向，属性值有all、vertical、horizontal、none
   */
  direction: "all" | "vertical" | "horizontal" | "none";
  /**
   * 超过可移动区域后，是否还可以移动
   */
  outOfBounds: boolean;
  /**
   * 是否带有惯性
   */
  inertia: boolean;
  /**
   * 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值
   */
  friction: number;
  /**
   * 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
   */
  damping: number;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 是否支持双指缩放，默认缩放手势生效区域是在movable-view内
   */
  scale: boolean;
  /**
   * 定义缩放倍数最小值
   */
  scaleMin: number;
  /**
   * 定义缩放倍数最大值
   */
  scaleMax: number;
  /**
   * 定义缩放倍数，取值范围为 0.5 - 10
   */
  scaleValue: number;
  /**
   * 是否使用动画
   */
  animation: boolean;
  /**
   * 拖动过程中触发的事件，event.detail = {x, y, source}
   */
  onChange: EventEmitter;
  /**
   * 缩放过程中触发的事件，event.detail = {x, y, scale}，x和y字段在2.1.0之后支持
   */
  onScale: EventEmitter;
  /**
   * 初次手指触摸后移动为横向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch
   */
  onHTouchMove: EventEmitter;
  /**
   * 初次手指触摸后移动为纵向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch
   */
  onVTouchMove: EventEmitter;
  element: HTMLElement;
  watchX(newValue: number | string): void;
  watchY(newValue: number | string): void;
  watchScaleMinOrMax(): false | undefined;
  watchScaleValue(scale: any): any;
  /**
   * 设置父节点
   */
  setParent({ element, area }: {
    element: HTMLElement;
    area: {
      width: number;
      height: number;
    };
  }): Promise<void>;
  /**
   * 结束缩放
   */
  endScale(): Promise<void>;
  /**
   * 更新缩放
   */
  setScale(scale: number): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** 观察者 */
  private observer?;
  /** 缩放中 */
  private scaling;
  /** 移动中 */
  private touching;
  /** 更新中 */
  private updating;
  /** 水平方向是否可移动 */
  private xMove;
  /** 垂直方向是否可移动 */
  private yMove;
  /** 首次移动方向事件是否已触发 */
  private firstMoveFireEvent;
  /** 当前水平偏移 */
  private translateX;
  /** 当前垂直偏移 */
  private translateY;
  /** touch-start 原点 */
  private origin;
  /** 父容器大小 */
  private area;
  /** 父容器 */
  private parent?;
  /** 原始缩放倍数 */
  private originScale;
  /** 当前缩放倍数 */
  private currentScale;
  /** 宽度 */
  private width;
  /** 高度 */
  private height;
  /** 移动边界 */
  private minX;
  private minY;
  private maxX;
  private maxY;
  /** 移动基础位置 */
  private baseX;
  private baseY;
  /** 偏移量 */
  private offset;
  private scaleOffset;
  getLimitXY: (x: number, y: number) => {
    x: number;
    y: number;
    outOfBounds: boolean;
  };
  animationTo: (x: number, y: number, scale?: number, source?: string, noEmitChange?: boolean, emitScale?: boolean, callback?: () => void) => void;
  setTransform: (x: number, y: number, scale?: number, source?: string, noEmitChange?: boolean, emitScale?: boolean) => void;
  updateOffset: () => void;
  updateScaleOffset: (scale?: number) => void;
  updateBoundary: () => void;
  updateScale: (scale: number, animation?: boolean, animationCallback?: () => void) => void;
  setOriginScale: (scale: number) => void;
  adjustScale: (scale: number) => number;
  componentDidLoad(): void;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: (e: TouchEvent) => void;
  render(): any;
}
