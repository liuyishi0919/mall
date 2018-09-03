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
    <!--Vue 的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
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
      // 使用 $axios get请求获取 mock 数据
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
    display: flex; // tab 使用flex布局
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1; // 每个标签项均分
      text-align: center;
      & > a {
        display: block;
        font-size: 24px;
        color: rgb(77, 85, 93);
        &.active { // 路由激活时的样式, 自定义类名在router/index.js 中 设置: linkActiveClass: 'active'
          color: rgb(240, 20, 20);
        }
      }
    }

  }

</style>
