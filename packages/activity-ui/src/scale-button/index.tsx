import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ScaleButton extends Vue {
  @Prop({ type: String, default: 'primary' }) type?: string;

  render() {
    return <button class="anima">{this.$slots.default}</button>;
  }
}
