# plugin 描述

## uniBridge : 统一Bridge

### 使用
定义
```typescript
type IJSBridge = (method: string, params: any) => Promise<any>
export default uniBridge: IJSBridge;
```

使用
```typescript
import uniBridge from '@ali/dingtalk-jsapi/plugin/uniBridge';

uniBridge('biz.request', {
    uri: 'xxx',
}).then((result) => {
    // do ..
}, (err) => {
    // deal error 
});

```

## mockApi: 支持mock的能力


```typescript
import { init,
    appendMockApiResult,
    batchAppendMockApiResult,
    emitEvent } from '@ali/dingtalk-jsapi/plugin/mockApi';


// 一旦init，当前接口调用将全部走mock的数据
mockApi.init({
    mockApiMap: {
        'internal.request.lwp': {
            isSuccess: true,
            payload: { data: 'lwp'},
        },
    }
});

// mock Api function
appendMockApiResult('internal.request.lwp', (params: any) => {
    // do something
    return Promise.resolve({
        body: {},
        code: 200
    })
});

// mock Api data
appendMockApiResult('internal.request.lwp', {
    result: {
        body: {},
        code: 200
    },
    isSuccess: true,
});

// batch mock Api
batchAppendMockApiResult({
    'biz.alipay.auth': {
        isSuccess: false,
        payload: { errorMessage: 'error', errorCode: '2'},
    },
});

// mock emit
mockApi.emitEvent('pause');

```

## uniEvent: 统一事件框架

```typescript
import { getChannel } from '@ali/dingtalk-jsapi/plugin/uniEvent';

// 获取对应namespace(search)的 channel
const searchChannel = getChannel('search');

const callHandler = (data) => {
    console.log('subscribe call ==' + JSON.stringify(data));
};

// 注册
searchChannel.subscribe('call', callHandler);

// 注册带cache
searchChannel.subscribe('callWithCache', (data) => {
    console.log('subscribe callWithCache ==' + JSON.stringify(data));
}, {
    useCache: true,
});

// 取消注册
searchChannel.unsubscribe('call', callHandler);

// 发布数据
searchChannel.publish('callPublish', {
    test: 'test',
}, {
    shouldUpdateCache: true,
});


```

## eappEvent : e应用事件(考虑废弃)

### 使用
定义
```typescript
// 方法定义
declare const addDTEventListener: (eventName: string, listener: (data: any) => void) => void;
declare const removeDTEventListener: (eventName: string, listener: (data: any) => void) => void;
declare const emitEventToDTNative: (eventName: string, data: object, onSuccess?: ((data: any) => {}) | undefined, onFail?: ((err: any) => {}) | undefined) => Promise<{}>;
```
使用
```typescript
import { addDTEventListener, removeDTEventListener, emitEventToDTNative} from '@ali/dingtalk-jsapi/plugin/eappEvent';

// 注册
const handler =  (data) => {
    console.log(data);
};
addDTEventListener('post.ding', handler);

// 移除
removeDTEventListener('post.ding', handler);

// 发事件给Native
emitEventToDTNative('post.ding', {
    test： 'xx',
}).then((result) => {
    console.log(result);
});

```
