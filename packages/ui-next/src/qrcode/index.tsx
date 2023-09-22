import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import QRCode from 'qrcode';
interface IWindow extends Window {
  wps: {[mothods: string]: (...params) => any}
}

@Component
export default class DcQrcode extends Vue {
  @Prop({ type: String, default: '' }) url: string;
  @Prop({ type: [Number,String], default: 1000 }) time: number | string;
  @Prop({ type: [Number,String], default: 100 }) size: number | string;
  @Prop({ type: [Number,String], default: 1 }) paddingSize: number | string;
  @Prop({ type: String, default: '#000000' }) color: string;
  @Prop({ type: String, default: '#ffffff' }) backgroundColor: string;
  @Prop({ type: Function, default: () => '' }) callbackSucced: (...options) => void;
  @Prop({ type: Function, default: () => '' }) callbackFailed: (...options) => void;
  src: string = '';
  longClickFlag: boolean = false; // 长按事件
  longClickTimeOut: any = null;
  created() {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.3,
      margin: Number(this.paddingSize),
      color: {
        dark: this.color,
        light: this.backgroundColor
      }
    }
    QRCode.toDataURL(this.url, opts, (err, imgurl) => {
      if (err) {
        console.log('created qrcode error',err);
        return;
      }
      this.src = imgurl;
    })
  }
  saveImage() {
    if (!this.src) {
      console.log('image-no-src');
      return
    }
    const index = this.src.indexOf('data:image/png;base64,');
    index > -1 && window && (window as unknown as IWindow).wps && (window as unknown as IWindow).wps.saveImageToPhotosAlbum({
      imageData: this.src.slice(22),
      complete: ret => {
        if (ret.status === true) {
          this.callbackSucced && this.callbackSucced();
          this.$emit('callbackSucced');
        } else {
          this.callbackFailed && this.callbackFailed();
          this.$emit('callbackFailed')
        }
      }
    });
  }
  onTouchStart() {
    this.longClickFlag = false;
    this.longClickTimeOut = setTimeout(() => {
      this.longClickFlag = true;
      // 长按事件处理保存
      this.saveImage();
    }, Number(this.time));
  }

  onTouchMove() {
    clearTimeout(this.longClickTimeOut);
  }

  onTouchEnd(e) {
    clearTimeout(this.longClickTimeOut);
    console.log('touchend', this.longClickFlag);
    if (this.longClickFlag) {
      e.preventDefault();
    }
  }

  render() {
    return <div class="qrcode" onTouchstart={this.onTouchStart} onTouchmove={this.onTouchMove} onTouchend={this.onTouchEnd}>
      <img style={`width: ${Number(this.size)}px; height: ${Number(this.size)}px`} src={this.src} />
    </div>;
  }
}
