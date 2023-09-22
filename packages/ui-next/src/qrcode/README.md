# dcqrcode

### 介绍

qrcode 是一个示例生成二维码组件,
WPS端内支持长按保存图片到本地，端外不支持长按保存

### 引入

```js
import Vue from 'vue';
import Qrcode from '@mobile/ui-next/es/qrcode';

Vue.component(Qrcode.name, Qrcode);
```

## 代码演示

### 基础用法

```html
<dc-qrcode url='https://baidu.com' dark='#f00722' light='#ffffff' time='1000' callbackSucced='callbackSucced'></dc-qrcode>
```
```tsx
<dc-qrcode url={'https://baidu.com'} dark={'#f00722'} time={100} size={90} callbackSucced={this.callbackSucced}></dc-qrcode>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    | 是否必填    |
| ------------- | -------- | -------- | --------- | --------- |
| url          | 二维码对应地址 | _string_ | `` | 必填    |
| time          | 长按秒数-毫秒 | number或string | 1000 | 选填    |
| size          | 二维码宽高值 | number或string | 100 | 选填(单位是px)    |
| paddingSize   | 内边距 | number或string | 1 | 选填    |
| dark          | 二维码色值 | _string_ | `#000000` | 选填 (不支持red色值写法)   |
| light          | 二维码背景色 | _string_ | `#ffffff` | 选填    |
| callbackSucced | 长按保存成功回调 | _string_ | `` | 选填    |
| callbackFailed | 长按保存失败回调 | _string_ | `` | 选填    |

