<template>
  <div id="header">
    <a-row>
      <div class="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4 header-left">
        <router-link id="logo"
                     to="/">
          <span>Ant Design Mobile Vue</span>
        </router-link>
      </div>
    </a-row>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Header'
  });
</script>
<style lang="less" scoped>
  #logo {
    padding-left: 40px;
    float: left;
    height: 60px;
    line-height: 64px;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
  }

  #header {
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    max-width: 100%;
  }
</style>
