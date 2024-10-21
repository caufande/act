import createComponent from './createComponent.js';
import createFormsComponent from './createFormsComponent.js';
export { default as ScrollView } from './scroll-view.js';
export { default as Icon } from './icon.js';
export { default as Text } from './text.js';
export { default as Image } from './image.js';

// 视图容器
const CoverImage = /* @__PURE__ */ createComponent('taro-cover-image');
const CoverView = /* @__PURE__ */ createComponent('taro-cover-view');
const MatchMedia = /* @__PURE__ */ createComponent('taro-match-media');
const MovableArea = /* @__PURE__ */ createComponent('taro-movable-area');
const MovableView = /* @__PURE__ */ createComponent('taro-movable-view');
const PageContainer = /* @__PURE__ */ createComponent('taro-page-container');
const RootPortal = /* @__PURE__ */ createComponent('taro-root-portal');
const ShareElement = /* @__PURE__ */ createComponent('taro-share-element');
const Swiper = /* @__PURE__ */ createComponent('taro-swiper');
const SwiperItem = /* @__PURE__ */ createComponent('taro-swiper-item', ['swiper-slide']);
const View = /* @__PURE__ */ createComponent('taro-view');
const Progress = /* @__PURE__ */ createComponent('taro-progress', ['weui-progress']);
const RichText = /* @__PURE__ */ createComponent('taro-rich-text');
// 表单组件
const Button = /* @__PURE__ */ createComponent('taro-button');
const Checkbox = /* @__PURE__ */ createComponent('taro-checkbox', ['weui-cells_checkbox']);
const CheckboxGroup = /* @__PURE__ */ createComponent('taro-checkbox-group');
const Editor = /* @__PURE__ */ createComponent('taro-editor');
const Form = /* @__PURE__ */ createComponent('taro-form');
const Input = /* @__PURE__ */ createFormsComponent('taro-input', 'input');
const KeyboardAccessory = /* @__PURE__ */ createComponent('taro-keyboard-accessory');
const Label = /* @__PURE__ */ createComponent('taro-label');
const Picker = /* @__PURE__ */ createFormsComponent('taro-picker', 'change');
const PickerView = /* @__PURE__ */ createComponent('taro-picker-view');
const PickerViewColumn = /* @__PURE__ */ createComponent('taro-picker-view-column');
const Radio = /* @__PURE__ */ createComponent('taro-radio', ['weui-cells_checkbox']);
const RadioGroup = /* @__PURE__ */ createComponent('taro-radio-group', ['weui-cells_radiogroup']);
const Slider = /* @__PURE__ */ createFormsComponent('taro-slider', 'change', 'value', ['weui-slider-box']);
const Switch = /* @__PURE__ */ createFormsComponent('taro-switch', 'change', 'checked');
const Textarea = /* @__PURE__ */ createFormsComponent('taro-textarea', 'input');
// 导航
const FunctionalPageNavigator = /* @__PURE__ */ createComponent('taro-functional-page-navigator');
const Navigator = /* @__PURE__ */ createComponent('taro-navigator');
// 媒体组件
const Audio = /* @__PURE__ */ createComponent('taro-audio');
const Camera = /* @__PURE__ */ createComponent('taro-camera');
const LivePlayer = /* @__PURE__ */ createComponent('taro-live-player');
const Video = /* @__PURE__ */ createComponent('taro-video', ['taro-video-container']);
const VoipRoom = /* @__PURE__ */ createComponent('taro-voip-room');
// 地图
const Map = /* @__PURE__ */ createComponent('taro-map');
// 画布
const Canvas = /* @__PURE__ */ createComponent('taro-canvas');
// 开放能力
const WebView = /* @__PURE__ */ createComponent('taro-web-view');
const Ad = /* @__PURE__ */ createComponent('taro-ad');
const AdCustom = /* @__PURE__ */ createComponent('taro-ad-custom');
const OfficialAccount = /* @__PURE__ */ createComponent('taro-official-account');
const OpenData = /* @__PURE__ */ createComponent('taro-open-data');
// 导航栏
const NavigationBar = /* @__PURE__ */ createComponent('taro-navigation-bar');
// 页面属性配置节点
const PageMeta = /* @__PURE__ */ createComponent('taro-page-meta');
// 其他
const Block = /* @__PURE__ */ createComponent('taro-block');
const CustomWrapper = /* @__PURE__ */ createComponent('taro-custom-wrapper');
const Slot = /* @__PURE__ */ createComponent('taro-slot');

export { Ad, AdCustom, Audio, Block, Button, Camera, Canvas, Checkbox, CheckboxGroup, CoverImage, CoverView, CustomWrapper, Editor, Form, FunctionalPageNavigator, Input, KeyboardAccessory, Label, LivePlayer, Map, MatchMedia, MovableArea, MovableView, NavigationBar, Navigator, OfficialAccount, OpenData, PageContainer, PageMeta, Picker, PickerView, PickerViewColumn, Progress, Radio, RadioGroup, RichText, RootPortal, ShareElement, Slider, Slot, Swiper, SwiperItem, Switch, Textarea, Video, View, VoipRoom, WebView };
//# sourceMappingURL=index.js.map
