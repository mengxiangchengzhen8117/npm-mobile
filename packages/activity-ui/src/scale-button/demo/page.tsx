import Vue from 'vue';
import './page.scss';
import Component from 'vue-class-component';

@Component
export default class Page extends Vue {
  render() {
    return (
      <demo-section>
        <demo-block title="基础用法">
          <scale-button style="margin-left: 15px" class="scale-button">
            按钮
          </scale-button>
        </demo-block>

        <demo-block title="自定义颜色">
          <scale-button style="margin-left: 15px" class="scale-button">
            按钮
          </scale-button>
        </demo-block>
      </demo-section>
    );
  }
}
