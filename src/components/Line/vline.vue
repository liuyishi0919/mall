<template>
  <div class="line-title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "vline",
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .line-title {
    display: flex;
    width: 80%;
    margin: 56px auto 24px auto;
    .line {
      flex: 1;
      position: relative;
      top: -12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .text {
      padding: 0 14px;
      font-weight: 700;
      font-size: 28px;
    }
  }

</style>
