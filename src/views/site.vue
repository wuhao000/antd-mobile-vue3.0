<template>
  <a-layout>
    <a-layout-header id="app-header">
      <ui-header/>
    </a-layout-header>
    <a-layout id="app-body">
      <a-layout-sider v-show="!isDemo"
                      id="app-nav"
                      width="220px">
        <nav-list :menu-list="routersName"></nav-list>
      </a-layout-sider>
      <a-layout-content :id="(!$route.meta || $route.meta.hideNav !== true) ? 'app-content' : ''">
        <router-view/>
      </a-layout-content>
      <a-layout-sider style="padding: 0 0 0 10px;"
                      width="375px">
        <iframe v-if="componentName"
                :src="`/demo/mobile/${componentName}`"
                height="512px"
                width="100%">
        </iframe>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import {computed, defineComponent, Ref, ref} from 'vue';
  import {RouteRecordRaw, useRoute} from 'vue-router';
  import NavList from '../components/nav-list.vue';
  import {routes} from '../router';
  import UiHeader from './header.vue';

  export default defineComponent({
    components: {
      UiHeader,
      NavList
    },
    watch: {
      $route: {
        immediate: true,
        handler(route: RouteRecordRaw) {
          if (route.path.startsWith('/mobile-components')) {
            this.componentName = 'm-' + route.path.replace('/mobile-components/', '');
          } else {
            this.componentName = null;
          }
        }
      }
    },
    setup(props, {emit, slots}) {
      const componentName: Ref<string> = ref(null);

      const isDemo = computed(() => {
        const route = useRoute();
        return route.path.startsWith('/demo');
      });
      const routersName = computed(() => {
        return routes.find(it => it.name === 'site').children;
      });

      return {
        componentName,
        isDemo,
        routersName
      };
    }
  });
</script>
<style lang="less">
  @import "/src/assets/styles/common";
  @import "/src/assets/styles/custom";
  @import "/node_modules/ant-design-vue/es/style/themes/default";

  body {
    background: @body-background;
  }

  #app-header {
    height: 60px;
  }

  #app-body {
    padding: @padding-xs;
  }

  .ant-layout {
    height: 100%;

    &, &-header, &-sider, &-footer, &-content {
      background: transparent;
      padding: 0;
    }

    &-header {
      line-height: 1;
    }

    &-header, &-footer {
      height: auto;
    }

    &-sider {
      & > &-children {
        overflow: auto;
      }
    }

    &-content {
      flex: 1;
      overflow: auto;
    }
  }

  #app-content {
    background: white;
    padding: @padding-sm 30px 144px @padding-lg;
  }

  p {
    margin: 0;
    padding: 0;
  }

  #app-nav {
    background: white;
    margin-right: @padding-xs;
  }

  .bg-white {
    background: white;
  }

  .demo {
    margin: @padding-md 0;
  }
</style>
