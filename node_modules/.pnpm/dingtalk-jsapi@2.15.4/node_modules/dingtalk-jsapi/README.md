# 钉钉多端统一jsapi

此jsApi支持运行于android, ios, pc，钉钉小程序环境，且保持开发体验一致。

## 安装

dingtalk-jsapi 现在可从 `npm` 上安装.

```shell
npm install dingtalk-jsapi
```

推荐使用npm包形式按需引入

## 新的特性

除了兼容现钉钉开放平台提供的jsapi的特性，还支持以下下特性

1. 支持返回原生Promise
2. 支持模块化引入api，模块化引入平台
3. 支持dd.checkJsApi, 用于检测当前环境是否支持此jsApi
4. 提供dd.on, dd.off来绑定事件，用于同一绑定事件，替代document.addEventListener,document.removeEventListener
5. 添加dd.env来读取当前环境变量
6. 支持typescript的接口定义，接口定义还在持续添加中，如有纰漏欢迎反馈

## 使用介绍

### 1. 按需引入
#### 整体调用

```typescript
import * as dd from 'dingtalk-jsapi';
dd.device.notification.alert({
    message: "亲爱的",
    title: "提示",//可传空
    buttonName: "收到",
}).then(() => {
    //成功即相当于 onSuccess
}, () => {
    //失败即相当于 onFail
});

```

#### 按需调用

```typescript
import 'dingtalk-jsapi/entry/mobile'; // 只引入移动端（支持小程序）
// import 'dingtalk-jsapi/entry/union'; // 如果你想要在此代码在PC端和移动端都执行，那你可以如此引入
import alert from 'dingtalk-jsapi/api/device/notification/alert'; // 按需引入方法

alert({
    message: "亲爱的",
    title: "提示",//可传空
    buttonName: "收到",
}).then(() => {
    //成功即相当于 onSuccess
}, () => {
    //失败即相当于 onFail
});

```

### dd.ready优化

#### 旧版本pc调用接口
```typescript
//首先你鉴权需要权限
dd.config({
    agentId: '', // 必填，微应用ID
    corpId: '',//必填，企业ID
    timeStamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    type:0/1,   //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    jsApiList:[
        'biz.contact.choose',
    ],
});

//然后因为鉴权是异步的，所以你的方法需要包括在dd.ready, config校验完成后的钩子
dd.ready(() => {
    dd.device.notification.alert({
        message: "亲爱的",
        title: "提示",//可传空
        buttonName: "收到",
    }).then(() => {
        //成功即相当于 onSuccess
    }, () => {
        //失败即相当于 onFail
    });
})

```

#### 新版本pc调用接口
```typescript
dd.config({
    agentId: '', // 必填，微应用ID
    corpId: '',//必填，企业ID
    timeStamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    type:0/1,   //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
    jsApiList:[
        'device.notification.alert',
    ],
});

// 优化后不再需要包括dd.ready，接口自动延后执行
dd.device.notification.alert({
    message: "亲爱的",
    title: "提示",//可传空
    buttonName: "收到",
}).then(() => {
    //成功即相当于 onSuccess
}, () => {
    //失败即相当于 onFail
});
```

## 反馈渠道

亲爱的开发者，为了更好的提高服务效率和问题沉淀，在开发过程中如果遇到问题，可以有以下方式获取技术支持：
【推荐】登录开发者后台，https://open-dev.dingtalk.com，在右下角有“在线帮助”（人工客服时间：工作日10:00~12:00，14:00~18:00, 19:00~21:00）


**最终解释权归阿里巴巴钉钉事业部所有**。
