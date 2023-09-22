import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {

  render() {
    return  <img
          v-show="loading"
          class="circle"
          src="https://img8.file.cache.docer.com/storage/20210926/2c188a5e-6eaa-4ee0-a520-823e340fb722.png"
        ></img>
  }
}
