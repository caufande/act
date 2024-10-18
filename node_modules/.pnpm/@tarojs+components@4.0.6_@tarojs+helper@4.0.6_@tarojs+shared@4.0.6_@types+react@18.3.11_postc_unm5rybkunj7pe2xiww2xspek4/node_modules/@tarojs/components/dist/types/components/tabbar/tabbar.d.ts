import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import type { TabBar as ITabBar, TabBarItem } from '@tarojs/taro';
import type { IH5RouterConfig } from '@tarojs/taro/types/compile';
interface IRouterHandler {
  index: string;
  text: string;
  url: string;
  successHandler: Function;
  errorHandler: Function;
  animation?: boolean;
}
interface ITabBarConf extends ITabBar {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  borderStyle?: 'black' | 'white';
  list: ITabbarList[];
  position?: 'bottom' | 'top';
  custom: boolean;
  customRoutes: Record<string, string | string[]>;
  mode: IH5RouterConfig['mode'];
  basename: string;
  homePage: string;
  currentPagename: string;
}
interface ITabbarList extends TabBarItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
  badgeText?: string;
  showRedDot?: boolean;
}
export declare class Tabbar implements ComponentInterface {
  private homePage;
  private customRoutes;
  private tabbarPos;
  conf: ITabBarConf;
  list: ITabbarList[];
  borderStyle: ITabBarConf['borderStyle'];
  backgroundColor: ITabBarConf['backgroundColor'];
  color: ITabBarConf['color'];
  selectedColor: ITabBarConf['selectedColor'];
  selectedIndex: number;
  status: 0 | 1 | 2;
  onLongPress: EventEmitter;
  tabbar: HTMLDivElement;
  componentWillLoad(): void;
  getCurrentUrl(): string;
  getOriginUrl: (url: string) => string;
  getSelectedIndex: (url: string) => number;
  switchTab: (index: number) => void;
  switchTabHandler: ({ url, successHandler, errorHandler }: IRouterHandler) => void;
  routerChangeHandler: (options?: any) => void;
  setTabBarBadgeHandler: ({ index, text, successHandler, errorHandler }: IRouterHandler) => void;
  removeTabBarBadgeHandler: ({ index, successHandler, errorHandler }: IRouterHandler) => void;
  showTabBarRedDotHandler: ({ index, successHandler, errorHandler }: IRouterHandler) => void;
  hideTabBarRedDotHandler: ({ index, successHandler, errorHandler }: IRouterHandler) => void;
  showTabBarHandler: ({ successHandler }: {
    successHandler: any;
  }) => void;
  hideTabBarHandler: ({ animation, successHandler }: {
    animation: any;
    successHandler: any;
  }) => void;
  setTabBarStyleHandler: ({ color, selectedColor, backgroundColor, borderStyle, successHandler }: {
    color: any;
    selectedColor: any;
    backgroundColor: any;
    borderStyle: any;
    successHandler: any;
  }) => void;
  setTabBarItemHandler: ({ index, iconPath, selectedIconPath, text, successHandler, errorHandler }: {
    index: any;
    iconPath: any;
    selectedIconPath: any;
    text: any;
    successHandler: any;
    errorHandler: any;
  }) => void;
  bindEvent(): void;
  removeEvent(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): any;
}
export {};
