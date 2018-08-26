<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :class="itemClass" :key="index"></span>
  </div>
</template>

<script>

  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    name: "star",
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }

    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 44px;
        background-size: 40px 40px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-image('./icon/star48_on');
        }
        &.half {
          @include bg-image('./icon/star48_half');
        }
        &.off {
          @include bg-image('./icon/star48_off');
        }
      }
    }
  }


</style>
