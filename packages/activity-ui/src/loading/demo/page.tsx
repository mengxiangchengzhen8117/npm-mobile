import Vue from 'vue';
import './page.scss';
import Component from 'vue-class-component';

@Component
export default class Page extends Vue {
  render() {
    return (
      <loading></loading>
    );
  }
}
