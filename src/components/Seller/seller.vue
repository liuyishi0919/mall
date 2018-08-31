<template>
  <div class="seller">
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
        <div class="favorite">

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import Star from '../Star/star'

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
    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite;
      }


    },
    components: {
      VStart: Star
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
  }

</style>
