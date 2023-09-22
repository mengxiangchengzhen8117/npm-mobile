import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Page extends Vue {
  render() {
    return (
      <demo-section>
        <demo-block title="基础用法">
          <dc-qrcode url={location.href} color={'#f00722'} backgroundColor={'#cccccc'} time={100} size={'200'}></dc-qrcode>
        </demo-block>
        <demo-block title="基础用法">
          <dc-qrcode url={location.href} color={'#000000'} size={90} paddingSize={'3'}></dc-qrcode>
        </demo-block>
      </demo-section>
    );
  }
}
