<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">卖家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import VHeader from 'components/Header/vheader'

  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    components: {
      VHeader: VHeader
    },
    created: function () {
      this.$axios.get('/mock/seller').then((res) => {
        let seller = res.data.data;
        this.seller = seller;
      })
    }
  }
</script>

<style lang="scss">
  @import "./common/scss/mixin";

  .tab {
    display: flex;
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 24px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }

      }
    }

  }

</style>
