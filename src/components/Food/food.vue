<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">{{food.price}}</span>
            <span class="old">{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cart-control @add="addFood" :food="food"></v-cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count ===0 " @click.stop.prevent="addFirst">
              加入购物车
            </div>
          </transition>
        </div>
        <v-split v-if="food.info"></v-split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split v-if="food.info"></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-ratingselect @select="selectRating" :ratings="food.ratings" :desc="desc" :selectType="selectType"
                          :onlyContent="onlyContent" @toggle="toggleContent">
          </v-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item border-1px" v-for="rating in food.ratings"
                  v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                  {{rating.text}}
                </p>

              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings|| !food.ratings.length">暂无评价</div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
  import CartControl from 'components/CartControl/cartcontrol'
  import Vue from 'vue';
  import BScorll from 'better-scroll';
  import Split from 'components/Split/split'
  import Ratingselect from 'components/Ratingselect/ratingselect'

  const ALL = 2;

  export default {
    name: "food",
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        desc: {
          all: '所有',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: ALL,
        onlyContent: true
      }
    },

    methods: {

      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },

      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScorll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      addFood(target) {
        this.$emit('add', target)
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })


      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      }
    },
    components: {
      VCartControl: CartControl,
      VSplit: Split,
      VRatingselect: Ratingselect
    }
  }
</script>

<style lang="scss">

  @import "../../common/scss/mixin";

  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 96px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 20px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 20px;
          font-size: 40px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 36px;
      .title {
        line-height: 28px;
        margin-bottom: 16px;
        font-size: 28px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 36px;
        line-height: 20px;
        height: 20px;
        font-size: 0;
        .sell-count, .rating {
          font-size: 20px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 24px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 48px;
        .now {
          margin-right: 16px;
          font-size: 28px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 20px;
          color: rgb(147, 153, 159);
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 24px;
        bottom: 24px;
      }
      .buy {
        position: absolute;
        right: 36px;
        bottom: 36px;
        z-index: 10;
        height: 48px;
        line-height: 48px;
        padding: 0 24px;
        box-sizing: border-box;
        border-radius: 24px;
        font-size: 20px;
        color: #fff;
        background: rgb(0, 160, 220);
        opacity: 1;
        &.fade-enter-active, &.fade-enter-active {
          transition: all 0.2s
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
          z-index: -1;
        }

      }
    }
    .info {
      padding: 36px;
      .title {
        line-height: 28px;
        margin-bottom: 12px;
        font-size: 28px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 48px;
        padding: 0 16px;
        font-size: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 36px;
      .title {
        line-height: 28px;
        margin-left: 36px;
        font-size: 28px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 36px;
        .rating-item {
          position: relative;
          padding: 36px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .user {
            position: absolute;
            right: 0;
            top: 32px;
            line-height: 24px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 12px;
              vertical-align: top;
              font-size: 20px;
              color: rgb(144, 153, 159);
            }
            .avatar {
              width: 24px;
              height: 24px;
              border-radius: 50%;

            }
          }
          .time {
            margin-bottom: 12px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 32px;
            font-size: 24px;
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 8px;
              line-height: 32px;
              font-size: 24px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }

        }

      }
    }
  }

</style>
