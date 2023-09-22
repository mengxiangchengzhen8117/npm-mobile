import Vue from 'vue';
import Component from 'vue-class-component';

import './page.scss';
import '../../style/base.css';

@Component
export default class Page extends Vue {
  render() {
    return (
      <demo-section>
        <demo-block title="基础用法">
          {['loading' , 'loading-circle' , 'empty' , 'template-empty' , 'filter-empty' , 'search-empty' , 'network-error' , 'not-found'].map(item => {
            return <div>
              <span class='demo-text'>{item}</span>
              <dc-status-graph type={item}
                          class='demo-1' />
            </div>
          })}
        </demo-block>

        <demo-block title="自定义描述文字">
          <dc-status-graph type='network-error'
                          text={['描述文字第一段', '描述文字第二段']}
                          onRetryFunc={() => {console.log('click1!')}}
                          class='demo-1' />
        </demo-block>

        <demo-block title="指定按钮文案">
          <dc-status-graph type='not-found'
                          cbText={'你的按钮'}
                          onRetryFunc={() => {console.log('click2!')}}
                          class='demo-1' />
        </demo-block>
      </demo-section>
    );
  }
}
