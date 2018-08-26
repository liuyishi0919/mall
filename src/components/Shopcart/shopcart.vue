<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
          </div>
          <div class="num">{{totalCount}}</div>
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

  </div>
</template>

<script>
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
      }

    },
    methods: {

    }

  }
</script>

<style lang="scss">
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

  }

</style>
