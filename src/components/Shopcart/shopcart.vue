<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
          </div>
          <div class="num" v-if="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">¥{{totalPrice}}元</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <v-cart-control @add="addFood" :food="food"></v-cart-control>
              </div>
            </li>
          </ul>
        </div>


      </div>
    </transition>


  </div>
</template>

<script>
  import Cartcontrol from '../CartControl/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    name: "shopcart",
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {price: 10, count: 1}
          ]
        }
      },
      minPrice: {
        type: Number,
        default: 10
      },
      deliveryPrice: {
        type: Number,
        default: 4
      }
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
    },
    methods: {

      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },

      hideList() {
        this.fold = true;
      },

      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },


      addFood(target) {
        this.drop(target);
      },

      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 64;
            let y = -(window.innerHeight - rect.top - 44);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      VCartControl: Cartcontrol
    }
  }
</script>

<style lang="scss">

  @import "../../common/scss/mixin";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 96px;
    .content {
      display: flex;
      background: #141d27;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -20px;
          margin: 0 24px;
          padding: 12px;
          width: 112px;
          height: 112px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              line-height: 88px;
              font-size: 48px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 48px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 32px;
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 24px;
          line-height: 48px;
          padding-right: 24px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 32px;
          font-weight: 700;
          color: #919396;
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          margin: 24px 0 0 24px;
          line-height: 48px;
          font-size: 20px;
          color: #919396;
        }

      }
      .content-right {
        flex: 0 0 210px;
        width: 210px;
        .pay {
          height: 96px;
          line-height: 96px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          &.not-enough {
            color: #919396;
            background: #2b333b;
          }
          &.enough {
            color: #fff;
            background: #00b43c;
          }

        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 64px;
        bottom: 44px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }

    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.4s linear;
      }
      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 80px;
        line-height: 80px;
        padding: 0 36px;
        background: #f3f5f7;
        border-bottom: 1px solid #ddd;
        .title {
          float: left;
          font-size: 24px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 24px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 36px;
        max-height: 434px;
        overflow: hidden;
        background: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 48px;
            font-size: 24px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 180px;;
            bottom: 24px;
            line-height: 48px;
            font-size: 28px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }

        }
      }
    }

  }

</style>
