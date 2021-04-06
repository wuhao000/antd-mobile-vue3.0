<template>
  <div :style="{ height : '100%' }"
       class="demo">
    <m-nav-bar icon="ellipsis"
               @left-click="onDock('open')">
      Docked in document
    </m-nav-bar>
    <m-drawer :contentStyle="{ color : '#A6A6A6', textAlign : 'center', paddingTop : '42px' }"
              :docked="state.docked"
              :sidebarStyle="{ border : '1px solid #ddd' }"
              :touch="true"
              :style="drawerStyle"
              v-model:visible="state.open"
              class="my-drawer">
      <template v-slot:sidebar>
        <m-list>
          <m-list-item multiple-line
                       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category
          </m-list-item>
          <template v-for="index in 15"
                    :key="index">
            <m-list-item thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category{{ index }}
            </m-list-item>
          </template>
        </m-list>
      </template>
      Click upper-left corner
    </m-drawer>
  </div>
</template>
<script lang="ts">
  import {computed, defineComponent, reactive} from 'vue';

  export default defineComponent({
    name: 'DemoDemo2',
    props: {},
    setup() {
      const state = reactive({
        docked: true,
        open: false
      });

      const drawerStyle = computed(() => {
        return {
          minHeight: document.documentElement.clientHeight + 'px',
          position: 'relative'
        };
      });
      const onDock = (d) => {
        state[d] = !state[d];
      };


      return {state, onDock, drawerStyle};
    }

  });
</script>
