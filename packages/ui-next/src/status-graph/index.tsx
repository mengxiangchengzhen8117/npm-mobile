import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

import sourceImage from './image';

type STATUSGRAPH_TYPE = 'loading' | 'loading-circle' | 'empty' | 'template-empty' | 'filter-empty' | 'search-empty' | 'network-error' | 'not-found';

@Component({
  name: 'dcStatusGraph'
})
export default class DcStatusGraph extends Vue {
  // required
  @Prop({default: 'empty', type: String, required: true}) type: STATUSGRAPH_TYPE;

  // optional
  @Prop({default: '', type: String}) img: string;
  @Prop({default: '', type: [String, Array]}) text: string | string[];
  @Prop({default: '', type: String}) cbText: string;

  icon = this.getIcon();

  get defaultText() {
    const textMap = {
      empty: ['暂时没有内容'],
      loading: ['加载中，请稍后'],
      'loading-circle': ['加载中，请稍后'],
      'network-error': ['您的网络不太顺畅喔~'],
      'not-found': ['无法访问此页面'],
      'template-empty': ['模板数据异常，请稍后再试'],
      'search-empty': ['搜索结果为空'],
      'filter-empty': ['没有筛选结果', '可以尝试筛选其他格式']
    }
    return textMap[this.type];
  }

  get renderText() {
    return this.text || this.defaultText;
  }

  get showCbBtn() {
    return !!this.cbText ||
          this.type === 'network-error' ||
          (this.type === 'search-empty' && !!this.cbText)
  }

  get defaultBtnText() {
    const btnTextMap = {
      'network-error': '重新加载'
    }
    return btnTextMap[this.type] || '';
  }

  @Watch('type')
  typeUpdated() {
    this.icon = this.getIcon();
  }

  getIcon() {
    if (!!this.img) return this.img;
    const type = this.type;
    try {
      return sourceImage[type];
    } catch(e) {
      console.error(`[dc-status-graph]: type值${type}有误，无此枚举值`);
      return '';
    }
  }

  handleCallback() {
    this.$emit('retryFunc')
  }

  render() {
    return <section class="dc-status-graph">
      <div class="dc-status-graph__container">
        <div class={['dc-status-graph__cover', this.type === 'loading-circle' && 'dc-status-graph__cover-circle']}>
          <div class="dc-status-graph__cover-box"
              style={{
                backgroundImage: `url(${this.icon})`
              }} />
        </div>

        <div class="dc-status-graph__description">
          <div>
            {
              Array.isArray(this.renderText) ?
                this.renderText.map(item => <p>{item}</p>)
              :
                <p>{this.renderText}</p>
            }

            {
              this.showCbBtn && <div class="dc-status-graph__button" onClick={this.handleCallback}>
                {this.cbText || this.defaultBtnText}
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  }
}
