import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { MapProps } from 'types';
export declare class Map implements ComponentInterface {
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 缩放级别
   */
  scale: number;
  /**
   * 最小缩放级别
   */
  minScale: number;
  /**
   * 最大缩放级别
   */
  maxScale: number;
  /**
   *标记点
   */
  markers: MapProps.marker[];
  /**
   * 路线(问题)
   */
  polyline: MapProps.polyline[];
  /**
   * 圆(问题)
   */
  circles: MapProps.circle[];
  /**
   * 多边形（参数问题）
   */
  polygons: MapProps.polygon[];
  /**
   * 个性化地图】使用的key
   */
  subkey: string;
  /**
   * 【个性化地图】配置的 style
   */
  layerStyle: number;
  /**
   * 旋转
   */
  rotate: number;
  /**
   * 倾斜
   */
  skew: number;
  /**
   * 指南针
   */
  showCompass: boolean;
  /**
   * 比例尺
   */
  showScale: boolean;
  /**
   * 是否开启俯视
   */
  enableOverlooking: boolean;
  /**
   * 是否支持缩放
   */
  enableZoom: boolean;
  /**
   * 是否支持拖动
   */
  enableScroll: boolean;
  /**
   * 是否支持旋转
   */
  enableRotate: boolean;
  /**
   * 是否开启卫星图
   */
  enableSatellite: boolean;
  /**
   * 是否开启实时路况
   */
  enableTraffic: boolean;
  /**
   * 是否展示建筑
   */
  enableBuilding: boolean;
  /**
   * 是否开启最大俯视角
   */
  enableAutoMaxOverlooking: boolean;
  /**
   * 3D楼块
   */
  enable3D: boolean;
  /**
   * 添加宽度属性
   */
  width: string;
  /**
   * 添加高度属性
   */
  height: string;
  onTap: EventEmitter;
  private currentRotation;
  private map;
  private mapRef;
  el: HTMLElement;
  groundOverlay: any;
  componentDidLoad(): Promise<void>;
  disconnectedCallback(): void;
  addMarkers(markers: any): void;
  loadMapScript(): Promise<void>;
  LoadBmapLibScript(): Promise<void>;
  _getCenterLocation: (option: any) => number[];
  _setLocMarkerIcon: (option: any) => void;
  _translateMarker: (option: any) => any;
  _includePoints: (option: any) => boolean;
  _getRegion: () => {
    southwest: {
      lat: any;
      lng: any;
    };
    northeast: {
      lat: any;
      lng: any;
    };
  };
  _getRotate: () => number;
  _getSkew: () => number;
  _getScale: () => number;
  _setCenterOffset: (option: any) => void;
  _addMarkers: (option: any) => void;
  _removeMarkers: (option: any) => {};
  _moveAlong: (object: any) => any;
  getPointOnPath: (points: any, progress: any) => any;
  calculateTotalLength: (points: any) => number;
  calculateRotation: (currentPoint: any, nextPoint: any) => number;
  _addGroundOverlay: (option: any) => true | undefined;
  _updateGroundOverlay: (option: any) => any;
  _removeGroundOverlay: (option: any) => string;
  _setBoundary: (option: any) => true | undefined;
  render(): any;
}
