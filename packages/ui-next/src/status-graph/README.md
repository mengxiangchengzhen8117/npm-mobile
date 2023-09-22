# StatusGraph 情景图

### 介绍

StatusGraph是一个情景图组件，它包含'loading' | 'loading-circle' | 'empty' | 'template-empty' | 'filter-empty' | 'search-empty' | 'network-error' | 'not-found'几种情景，如右。在一些场景(network-error)时，还提供一个重试的按钮。

### 引入

```js
import Vue from 'vue';
import { DcStatusGraph } from 'ui-next';

Vue.use(DcStatusGraph);
```

## 代码演示

### 基础用法

```html
<dc-status-graph type='empty' />
```

### 自定义描述文字

```tsx
<dc-status-graph type='network-error'
                text={['描述文字第一段', '描述文字第二段']}
                onRetryFunc={() => {console.log('click1!')}} />
```

### 指定按钮文案

```tsx
<dc-status-graph type='not-found'
                cbText={'你的按钮'}
                onRetryFunc={() => {console.log('click2!')}} />
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| type`required`     | 情景图类型 | _string_ | `empty` |
| img  | 自定义图片 | _string_ | -         |
| text  | 自定义描述文字 | _string_ | -         |
| cbText  | 自定义按钮文案 | _string_ | -         |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| retryFunc  | 点击按钮时触发 | _event: MouseEvent_ |

