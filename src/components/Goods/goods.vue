<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :key="index" :class="{'current': currentIndex === index}">
          <span class="text border-1px" ref="menuList" @click="selectMenu(index, $event)">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>

        </li>
      </ul>

    </div>
    <v-shopcart></v-shopcart>

  </div>
</template>

<script>

  import BScroll from 'better-scroll';
  import Shopcart from '../Shopcart/shopcart'

  export default {
    name: "goods",
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        // 当前的good落在哪个区间
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i
          }
        }
        return 0;
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },


      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          // 1 滚动的时候会派发 scroll 事件，会截流。2 滚动的时候实时派发 scroll 事件，不会截流。 3 除了实时派发 scroll 事件，在 swipe 的情况下仍然能实时派发 scroll 事件
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        })

      },

      _calHeight() {
        // 计算区间高度
        this.foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < this.foodList.length; i++) {
          let item = this.foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },

      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }


    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'invoice'];

      this.$axios.get('/mock/goods').then((res) => {
        this.goods = res.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calHeight();
        })

      })

    },
    components: {
      VShopcart: Shopcart
    }


  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .goods {
    display: flex;
    position: absolute;
    top: 348px;
    bottom: 92px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 160px;
      width: 160px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 108px;
        width: 112px;
        padding: 0 24px;
        line-height: 28px;
        &.current {
          position: relative;
          z-index: 1;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          color: red;
        }
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: top;
          margin-right: 4px;
          background-size: 24px 24px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('./icon/decrease_3');
          }
          &.discount {
            @include bg-image('./icon/discount_3');
          }
          &.special {
            @include bg-image('./icon/special_3');
          }
          &.invoice {
            @include bg-image('./icon/invoice_3');
          }
          &.guarantee {
            @include bg-image('./icon/guarantee_3');
          }
        }
        .text {
          display: table-cell;
          width: 102px;
          vertical-align: middle;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 24px;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 28px;
        height: 52px;
        line-height: 52px;
        border-left: 4px solid #d9dde1;
        font-size: 28px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 36px;
        padding-bottom: 36px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 114px;
          width: 114px;
          margin-right: 20px;
          img {
            width: 114px;
            height: 114px;
          }
        }
        .content {
          flex: 1;
          .name {
            margin: 4px 0 16px 0;
            height: 28px;
            line-height: 28px;
            font-size: 28px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            line-height: 20px;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 24px;
            margin-bottom: 16px
          }
          .extra {
            .count {
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

        }
      }
    }
  }


</style>
