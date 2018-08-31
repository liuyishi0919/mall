<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-if="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

  </div>
</template>

<script>

  import Vue from 'vue';

  export default {
    name: "cartcontrol",
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },

      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }

      }
    }
  }
</script>

<style lang="scss">
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 12px;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      .inner {
        display: inline-block;
        line-height: 48px;
        font-size: 48px;
        color: rgb(0, 160, 220);

        transform: rotate(0);
      }
      &.move-enter-active, &.move-leave-active {
        transition: all 0.4s linear;
        .inner {
          transition: all 0.4s linear;
        }
      }
      &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3d(48px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 24px;
      padding-top: 12px;
      line-height: 48px;
      text-align: center;
      font-size: 20px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 12px;
      line-height: 48px;
      font-size: 48px;
      color: rgb(0, 160, 220);
    }

  }

</style>
