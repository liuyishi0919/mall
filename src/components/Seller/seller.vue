<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <v-start :size="36" :score="seller.score"></v-start>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>

      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import Star from '../Star/star';
  import Split from '../Split/split';
  import BScorll from 'better-scroll';

  export default {
    name: "seller",
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {}
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted: function () {
      this.$nextTick(() => {
        this._initScorll();
        this._initPics();
      })

    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScorll();
          this._initPics();
        });
      }
    },
    methods: {
      _initScorll() {
        if (!this.scorll) {
          this.scroll = new BScorll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 240;
          let margin = 12;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScorll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          })

        }
      }
    },
    components: {
      VStart: Star,
      VSplit: Split
    }
  }
</script>

<style lang="scss">

  @import "../../common/scss/mixin";

  .seller {
    position: absolute;
    top: 174*2px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 36px;
      .title {
        margin-bottom: 16px;
        line-height: 28px;
        color: rgb(7, 17, 27);
        font-size: 28px;
      }
      .desc {
        padding-bottom: 36px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 16px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 24px;
          line-height: 36px;
          vertical-align: top;
          font-size: 20px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 36px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-right: 0;
          }
          h2 {
            margin-bottom: 8px;
            line-height: 20px;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 48px;
            font-size: 20px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 48px;
            }
          }
        }

      }
    }
    .bulletin {
      padding: 36px 36px 0 36px;
      .title {
        margin-bottom: 16px;
        line-height: 28px;
        font-size: 28px;
        color: rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 0 24px 32px 24px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 48px;
          font-size: 24px;
          color: rgb(240, 20, 20);

        }
      }
      .supports {
        .support-item {
          padding: 32px 24px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          &:last-child {
            @include border-none();
          }
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
            @include bg-image('./icon/decrease_4');
          }
          &.discount {
            @include bg-image('./icon/discount_4');
          }
          &.guarantee {
            @include bg-image('./icon/guarantee_4');
          }
          &.invoice {
            @include bg-image('./icon/invoice_4');
          }
          &.special {
            @include bg-image('./icon/special_4');
          }
        }
        .text {
          line-height: 32px;
          font-size: 24px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics {
      padding: 36px;
      .title {
        margin-bottom: 24px;
        line-height: 24px;
        color: rgb(7, 17, 27);
        font-size: 28px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 12px; /*px*/
            width: 240px; /*px*/
            height: 180px; /*px*/
            &:last-child {
              margin: 0;
            }
            img {
              width: 240px; /*px*/
              height: 180px; /*px*/
            }

          }
        }
      }
    }
    .info {
      padding: 36px 36px 0 36px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 24px;
        line-height: 24px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 28px;
      }
      .info-item {
        padding: 32px 24px;
        line-height: 32px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 24px;
        &:last-child {
          @include border-none();
        }

      }
    }
  }

</style>
