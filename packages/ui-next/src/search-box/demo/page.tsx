import Vue from 'vue';
import Component from 'vue-class-component';
import './page.scss';
import '../../style/base.css';

@Component
export default class Page extends Vue {
  testWords = ['测试轮播词1', '测试轮播词2', '测试轮播词3', '测试轮播词4']
  testDefault = '搜索测试默认词'

  testWords2 = []
  testDefault2 = '搜索测试默认词'

  mounted() {
    // 模拟单个轮播词
    setTimeout(() => {
      this.testWords = ['测试词改变了1', '测试词改变了2', '测试词改变了3'];
      this.testDefault = '';
    }, 10000)

    // 模拟接口获取
    setTimeout(() => {
      this.testWords2 = ['个人简历', '行政公文'];
      this.testDefault2 = '';
    }, 2000)
  }

  render() {
    return (
      <demo-section>
        <demo-block title="基础用法">
          <dc-search-box></dc-search-box>
        </demo-block>

        <demo-block title="使用轮播词">
          <dc-search-box defaultPlaceHolder={this.testDefault} words={this.testWords} onClick={(e, word) => {
            console.log(e, word);
          }}
          onSearchPlaceholderChange={(word, index) => {
            console.log(word, index);
          }}/>
        </demo-block>

        <demo-block title="使用右侧icon插槽">
          <dc-search-box  defaultPlaceHolder={this.testDefault2}
                          words={this.testWords2}
                        scopedSlots={{
                          rightIconContent: () => (
                            <img src={'https://img8.file.cache.docer.com/storage/1611132903050413293/1cd39c4dfbb7829b5481f05c538a09ff.png'}
                                 class="search-box-right-icon"/>
                          )
                        }}/>
        </demo-block>
      </demo-section>
    );
  }
}
