import Vue from 'vue';
import Component from 'vue-class-component';
import './index.scss';
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper/dist/js/swiper.min.js';

@Component
export default class SwiperBox extends Vue {
  swiper: null

  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      direction: 'vertical',
      speed: 1000,
      autoplay : {
        delay: 3000
      }
    });
  }

  render() {
    return <div class="swiper-container">{this.$slots.default}</div>;
  }
}
