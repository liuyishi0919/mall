<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, $event)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>


  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: "ratingselect",
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: "不满意"
          }
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })

      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type, evnet) {
        if (!evnet._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }

    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .ratingselect {
    .rating-type {
      padding: 36px 0;
      margin: 0 36px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block {
        display: inline-block;
        padding: 16px 24px;
        margin-right: 16px;
        line-height: 32px;
        border-radius: 2px;
        font-size: 24px;
        color: rgb(77, 85, 93);
        &.active {
          color: #fff;
        }
        .count {
          margin-left: 4px;
          font-size: 16px;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 24px 36px;
      line-height: 48px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
        font-size: 48px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
      }
    }

  }
</style>
