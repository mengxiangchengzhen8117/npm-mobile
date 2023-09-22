# 通用工具

### 介绍

通用的工具函数

<style>
    .van-doc-simulator{
        display:none;
    }
    .van-doc-container--with-simulator{
        padding-right:0;
    }
</style>

### 引入

```js
import { objectToQueryString, xxxx } from 'ui-next/utils';
```

### 引入全局颜色变量
使用babel-plugin-component，引入lib/style/base.css

babel.config.js
```js
  plugins: [
    ['component',
      {
        libraryName: '@mobile/ui-next',
        libDir: 'lib',
        styleLibrary: {
          name: 'style',
          base: true,
          path: '../[module]/index.css'
        }
      }]
  ]
```

### 执行器

<iframe src="https://www.typescriptlang.org/play?#code/"
     style="width:90%; height:600px; border:0; border-radius: 4px; overflow:hidden;padding-right:100px;"
   ></iframe>

### objectToQueryString

对象转 query 字符串

```ts
const objectToQueryString = (queryParameters: object) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
        const symbol = queryString.length === 0 ? '?' : '&';
        queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : '';
        return queryString;
      }, '')
    : '';
};

console.log(objectToQueryString({ page: '1', size: '2kg', key: undefined }));
// '?page=1&size=2kg'
```

### getUrlParameters

获取 url 中 query 的参数

```ts
const getUrlParameters = (url: string) => {
  const queryArr = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return queryArr.reduce((queryObj, v) => {
    queryObj[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1);
    return queryObj;
  }, {} as { [key: string]: string });
};

console.log(getUrlParameters('google.com')); // {}
console.log(getUrlParameters('http://url.com/page?name=Adam&surname=Smith'));
// {name: 'Adam', surname: 'Smith'}
```

### getBaseUrl

```ts
const getBaseUrl = (url: string) => url.replace(/[?#].*$/, '');

console.log(getBaseUrl('http://url.com/page?name=Adam&surname=Smith'));
// // 'http://url.com/page'
```
