<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务评分</span>
            <v-score :size="36" :score="seller.serviceScore"></v-score>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-score :size="36" :score="seller.foodScore"></v-score>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送到时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect @select="selectRating" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"
                      @click="toggleContent" @toggle="toggleContent"></v-ratingselect>
      <div class="rating-wrappper">
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime|formatDate}}
              </div>
            </div>
          </li>
        </ul>

      </div>


    </div>

  </div>
</template>

<script>

  import Score from '../Star/star';
  import Split from '../Split/split';
  import Ratingselect from '../Ratingselect/ratingselect';
  import BScorll from 'better-scroll';
  import Star from '../Star/star'

  import {formatDate} from '../../common/js/date.js';

  const ALL = 2;

  export default {
    name: "ratings",
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created: function () {
      this.$axios.get('/mock/ratings').then((res) => {
        this.ratings = res.data.data;
        this.$nextTick(() => {
          this.scorll = new BScorll(this.$refs.ratings, {
            click: true
          })
        })

      })
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


      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(()=>{
          this.scorll.refresh();
        })
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }


    },
    filters: {
      formatDate(time) {
        return formatDate(time, 'yyyy-MM-dd h:m:s');
      }
    },
    components: {
      VScore: Score,
      VSplit: Split,
      VRatingselect: Ratingselect,
      VStar: Star
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixin";

  .ratings {
    position: absolute;
    top: 348px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 36px 0;
      .overview-left {
        flex: 0 0 274px;
        width: 274px;
        padding: 16px 0;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score {
          margin-bottom: 12px;
          line-height: 56px;
          font-size: 48px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 16px;
          line-height: 24px;
          font-size: 24px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 20px;
          font-size: 20px;
          color: #93999F;
        }
      }
      .overview-right {
        flex: 1;
        padding: 12px 0 12px 48px;
        .score-wrapper {
          margin-bottom: 16px;
          font-size: 0;
          .title {
            font-size: 24px;
            font-weight: 700;
            line-height: 36px;
            vertical-align: top;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            padding: 0 24px;
            vertical-align: top;
          }
          .score {
            font-size: 24px;
            line-height: 36px;
            vertical-align: top;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            font-size: 24px;
            font-weight: 700;
            line-height: 36px;
          }
          .delivery {
            margin-left: 24px;
            font-size: 24px;
            line-height: 36px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrappper {
      padding: 0 36px;
      .rating-item {
        display: flex;
        padding: 36px 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 56px;
          width: 56px;
          margin-right: 24px;
          img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 8px;
            line-height: 24px;
            font-size: 20px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 12px;
            font-size: 0;
            .star {
              display: inline-block;
              margin-right: 12px;
              vertical-align: top;

            }
            .delivery {
              display: inline-block;
              line-height: 24px;
              vertical-align: top;
              font-size: 20px;
              color: rgb(147, 153, 159);

            }

          }
          .text {
            margin-bottom: 16px;
            line-height: 36px;
            font-size: 24px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            line-height: 32px;
            font-size: 0;
            .icon-thumb_up, .item {
              display: inline-block;
              font-size: 18px;
              margin: 0 16px 8px 0;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 0 12px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 2px;
              background: rgb(255, 255, 255);
            }

          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 24px;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }

  }

</style>
