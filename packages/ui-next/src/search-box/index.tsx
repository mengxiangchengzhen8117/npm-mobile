import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../icons'

@Component({
  name: 'dcSearchBox'
})
export default class DcSearchBox extends Vue {
  @Prop({ type: String, default: '搜索..' }) defaultPlaceHolder: string
  @Prop({ type: String, default: '大家都在搜：' }) defaultWordPrefix: string
  @Prop({ type: Array, default: () => [] }) words: Array<string>
  @Prop({ type: Number, default: 4000 }) circle: number
  @Prop({ type: String, default: Icon.searchIcon }) searchIcon: string

  searchPlaceholder: string = '';
  searchPlaceholderIndex: number = 0;
  circleInterval: NodeJS.Timeout = null;

  get showAnimation() {
    return this.circleWords?.length > 1
  }

  get circleWords() {
    if (!this.words) {
      return [this.defaultPlaceHolder].filter(str => str && str.length > 0);
    }
    return [this.defaultPlaceHolder, ...this.words].filter(str => str && str.length > 0);
  }

  @Watch('defaultPlaceHolder')
  updateDefaultPlaceHolder() {
    this.handleCircleWords()
  }

  @Watch('defaultPrefix')
  updateDefaultPrefix() {
    this.handleCircleWords()
  }

  @Watch('words', { deep: true })
  wordsUpdate() {
    this.handleCircleWords()
  }

  @Watch('searchPlaceholder')
  showWordChange(val) {
    this.$emit('searchPlaceholderChange', val, this.searchPlaceholderIndex);
  }

  created() {
    this.handleCircleWords();
  }

  beforeDestroy() {
    clearInterval(this.circleInterval);
  }

  handleCircleWords() {
    if (!this.circleWords || this.circleWords.length === 0) {
      this.searchPlaceholder = '';
      this.searchPlaceholderIndex = 0;
      return
    }
    if (this.circleWords.length === 1) {
      this.searchPlaceholder = this.circleWords[0];
      this.searchPlaceholderIndex = 0;
      return
    }
    if (!!this.circleInterval) {
      clearInterval(this.circleInterval);
    }
    this.searchPlaceholder = this.circleWords[0];
    this.searchPlaceholderIndex = 0;
    this.circleInterval = setInterval(() => {
      this.searchPlaceholderIndex >= this.circleWords.length - 1 ? (this.searchPlaceholderIndex = 0) : this.searchPlaceholderIndex++;
      this.searchPlaceholder = this.circleWords[this.searchPlaceholderIndex];
    }, this.circle)
  }

  render() {
    const slots = this.$scopedSlots;

    return <div class="dc-search-box-wrapper" onClick={e => {
      this.$emit('click', e, this.searchPlaceholder, this.searchPlaceholderIndex);
      e.stopPropagation();
    }}>
      <div class="dc-search-box">
        <img src={this.searchIcon || Icon.searchIcon} class="dc-search-box-icon" />
        <span class={[
          "dc-search-box-word",
          this.showAnimation && "animate"
        ]} key={this.searchPlaceholder}>{(this.searchPlaceholder === this.defaultPlaceHolder ? '' : this.defaultWordPrefix) + this.searchPlaceholder}</span>

        {!!slots.rightIconContent && <div class="dc-search-box-right-icon">
          {slots.rightIconContent?.(this)}
        </div>}
      </div>
    </div>
  }
}
