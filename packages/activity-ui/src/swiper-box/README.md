# SwiperBox 容器

### 介绍

SwiperBox 是一个上下翻动列表容器

### 引入

```js
import Vue from 'vue';
import { SwiperBox } from '@mobile/activity-ui';

Vue.use(SwiperBox);
```

## 代码演示

### 基础用法

```html
<swiper-box>
  <div class="swiper-wrapper">
    { this.data.map((item, index) => (
    <div class="swiper-slide">
      {
      `恭喜${this.nameFilter(item.inviter_user_name)}获得${item.invitee_count}天WPS${item.reward_type
      === 40 ? '超级会员': '会员'}` }
    </div>
    )) }
  </div>
</swiper-box>
```

## API

### Props

### Events

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
