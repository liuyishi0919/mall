<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="icon"></span><span class="text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <v-line title="优惠信息"></v-line>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <v-line title="商家公告"></v-line>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>

      </div>
    </transition>

  </div>
</template>

<script>

  import VLine from 'components/Line/vline';
  import Star from 'components/Star/star'

  export default {
    name: "vheader",
    props: {
      seller: { // 接收父组件App.vue传过来的 seller 对象
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      VLine: VLine,
      VStar: Star
    }

  }
</script>

<style lang="scss">

  @import "../../common/scss/mixin";

  .header {
    position: relative;
    overflow: hidden;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      position: relative;
      padding: 48px 24px 36px 48px;
      font-size: 0; // 让子元素的font-size为0, 是因为html的空格是占空间
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          width: 128px;
          height: 128px;
          border-radius: 4px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 32px;
        .title {
          margin: 4px 0 16px 0;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 60px;
            height: 36px;
            background-size: 60px 36px;
            @include bg-image('./icon/brand');
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 12px;
            line-height: 36px;
            font-size: 32px;
            color: rgb(255, 255, 255);
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 20px;
          line-height: 24px;
          font-size: 24px;
        }
        .support {
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            background-size: 24px 24px;
            background-repeat: no-repeat;
            &.decrease { // 减
              @include bg-image('./icon/decrease_1')
            }
            &.discount { // 折
              @include bg-image('./icon/discount_1')
            }
            &.guarantee { // 保
              @include bg-image('./icon/guarantee_1')
            }
            &.invoice { // 发票
              @include bg-image('./icon/invoice_1')
            }
            &.special { // 特殊
              @include bg-image('./icon/special_1')

            }
          }
          .text {
            font-size: 20px;
            line-height: 24px;
          }
        }

      }
      .support-count {
        position: absolute;
        right: 24px;
        bottom: 28px;
        padding: 0 16px;
        height: 48px;
        line-height: 48px;
        border-radius: 28px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          vertical-align: top;
          font-size: 20px;
        }
        .icon-keyboard_arrow_right {
          margin-left: 4px;
          line-height: 48px;
          font-size: 20px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 56px;
      line-height: 56px;
      padding: 0 44px 0 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, 0.2);
      .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 16px;
        width: 44px;
        height: 24px;
        @include bg-image('./icon/bulletin');
        background-size: 44px 24px;
        background-repeat: no-repeat;
      }
      .text {
        vertical-align: top;
        margin: 0 8px;
        font-size: 20px

      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 20px;
        right: 24px;
        top: 16px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      backdrop-filter: blur(10px);
      opacity: 1;
      background: rgba(7, 17, 27, 0.8);
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
        background: rgba(7, 17, 27, 0);;
      }
      .detail-wrapper {
        width: 100%;
        min-height: 100%;
        .detail-main {
          margin-top: 128px;
          padding-bottom: 128px;
          .name {
            line-height: 32px;
            text-align: center;
            font-size: 32px;
            font-weight: 700;
          }
          .star-wrapper {
            margin-top: 64px;
            padding: 4px 0;
            text-align: center;
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 24px;
              margin-bottom: 24px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 32px;
                height: 32px;
                vertical-align: top;
                margin-right: 12px;
                background-size: 32px 32px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image('./icon/decrease_2');
                }
                &.discount {
                  @include bg-image('./icon/discount_2');
                }
                &.guarantee {
                  @include bg-image('./icon/guarantee_2');
                }
                &.invoice {
                  @include bg-image('./icon/invoice_2');
                }
                &.special {
                  @include bg-image('./icon/special_2');
                }
              }
              .text {
                line-height: 32px;
                font-size: 24px;
              }

            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
              padding: 0 24px;
              line-height: 48px;
              font-size: 24px;
            }
          }

        }
      }
      .detail-close {
        position: relative;
        width: 64px;
        height: 64px;
        margin: -128px auto 0 auto;
        clear: both;
        font-size: 64px;
      }

    }
  }

</style>
