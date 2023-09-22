import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class DemoButton extends Vue {
  @Prop({ type: String, default: '' }) color?: string;

  @Prop({ type: String, default: 'primary' }) type?: string;

  render() {
    return <button class="demo-button">{this.$slots.default}</button>;
  }
}
