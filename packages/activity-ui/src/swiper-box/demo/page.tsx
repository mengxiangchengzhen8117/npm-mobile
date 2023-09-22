import Vue from 'vue';
import './page.scss';
import Component from 'vue-class-component';

@Component
export default class Page extends Vue {
  data: Array<{ inviter_user_id: number, inviter_user_name: string, inviter_user_avatar: string, invitee_count?: number, reward_type?: number, vip_reward_days?: number, reward_value?: number }> = [{ "inviter_user_id": 296272474, "inviter_user_name": "王靖宇", "inviter_user_avatar": "https://img.qwps.cn/296272474_acce0b032b7484902e99b749ce155020?imageMogr2/thumbnail/180x180!", "invitee_count": 5, "vip_reward_days": 45 }, { "inviter_user_id": 575928855, "inviter_user_name": "吴锦涵", "inviter_user_avatar": "https://img.qwps.cn/575928855?imageMogr2/thumbnail/180x180!\u0026k=1621955066575559961", "invitee_count": 2, "vip_reward_days": 14 }, { "inviter_user_id": 1046782786, "inviter_user_name": "铠的宝", "inviter_user_avatar": "https://img.qwps.cn/1046782786_4ff20c0f72516b15a1e120706d0e6c8d?imageMogr2/thumbnail/180x180!", "invitee_count": 1, "vip_reward_days": 7 }, { "inviter_user_id": 324470647, "inviter_user_name": "形同陌路、", "inviter_user_avatar": "https://img.qwps.cn/324470647_a7b04ae863354a0787c4b659423ee77a?imageMogr2/thumbnail/180x180!", "invitee_count": 1, "vip_reward_days": 7 }, { "inviter_user_id": 1231715240, "inviter_user_name": "WPS_1625283381", "inviter_user_avatar": "https://avatar.qwps.cn/avatar/V1BTXzE2MjUyODMzODE=", "invitee_count": 1, "vip_reward_days": 7 }]

  nameFilter(name) {
    if (name) {
      const len = name.length;
      if (len > 4) {
        return `${name[0]}**${name[3]}...`;
      } else if (len === 4) {
        return `${name[0]}**${name[3]}`;
      } else if (len === 3) {
        return `${name[0]}*${name[2]}`;
      } else if (len === 2) {
        return `${name[0]}*`;
      } else {
        return name;
      }
    }
    return '';
  }
  render() {
    return (
      <demo-section>
        <demo-block title="基础用法">
          <swiper-box>
            <div class="swiper-wrapper">
              {
                this.data.map((item, index) => (
                  <div class="swiper-slide">
                    {`恭喜${this.nameFilter(item.inviter_user_name)}获得${item.invitee_count}天WPS${item.reward_type === 40 ? '超级会员' : '会员'}`}
                  </div>
                ))
              }
            </div>
          </swiper-box>
        </demo-block>
      </demo-section>
    );
  }
}
