# SearchBox 搜索框

### 介绍

商城通用的搜索框组件，默认占位词，支持传入推荐词进行轮播，兼容暗黑。

### 引入

```js
import Vue from 'vue';
import '@mobile/ui-next/lib/search-box/index.css';
import { SearchBox } from '@mobile/ui-next';

Vue.component('dcSearchBox', SearchBox);
```

## 代码演示

### 基础用法

```html
<dc-search-box></dc-search-box>
```

### 使用轮播词

```html
<dc-search-box words={['测试轮播词1', '测试轮播词2', '测试轮播词3', '测试轮播词4']}
              onClick={(e, word) => {
                console.log(e, word);
              }}
              onSearchPlaceholderChange={(word, index) => {
                console.log(word, index);
              }}/>
```

### 使用右侧插槽

```html
<dc-search-box words={this.testWords}
              scopedSlots={{
                rightIconContent: () => (
                  <img src={'https://img8.file.cache.docer.com/storage/1611132903050413293/1cd39c4dfbb7829b5481f05c538a09ff.png'}
                        class="search-box-right-icon"/>
                )
              }}/>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| defaultPlaceHolder| 默认占位词 | _string_ | `搜索演示 | 文档 | 表格模板` |
| defaultWordPrefix | 轮播推荐词的前缀| _string_ | `大家都在搜：`|
| words| 推荐词 | _Array<string>_ | `[]` |
| circle| 轮播时长，单位ms | _number_ | `4000` |

### Events

| 事件名 | 说明       | 回调参数s            |
| ------ | ---------- | ------------------- |
| click  | 点击事件回调 | arg1:ClickEvent，arg2:当前轮播词, arg3:当前轮播词序 |
| searchPlaceholderChange  | 轮播词改变时触发 | arg1:当前轮播词，arg2:当前轮播词序 |


### Slots

| 名称    | 说明     |
| ------- | -------- |
| rightIconContent | 右侧图片插槽 |

