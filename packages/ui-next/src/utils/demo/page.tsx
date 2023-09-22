import Vue from 'vue';
import Component from 'vue-class-component';
import './page.scss';

@Component
export default class CardPage extends Vue {
  render() {
    return (
      <demo-section>
        <demo-block title="基础用法"></demo-block>
      </demo-section>
    );
  }
}
