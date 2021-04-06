<template>
  <a-menu id="nav-list"
          mode="inline">
    <template v-for="item in menuList">
      <a-sub-menu v-if="item.children && item.children.length"
                  :key="item.name">
        <template v-slot:title>
          <div class="category-title">{{ item.name }}
          </div>
        </template>
        <template v-if="item.name === '组件'">
          <a-menu-item-group v-for="(item) in getComponentMap(item.children)"
                             :key="item.tag"
                             :title="item.tag">
            <a-menu-item v-for="component in item.components"
                         :key="component.name"
                         @click="handleClick(component)">{{ component.name }}
            </a-menu-item>
          </a-menu-item-group>
        </template>
        <template v-else>
          <a-menu-item v-for="sub in item.children"
                       :key="sub.name"
                       @click="handleClick(sub)">{{ sub.name }}
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item v-else
                   :key="item.name"
                   class="category-title"
                   @click="handleClick(item)">{{ item.name }}
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
  import {defineComponent, Ref, ref} from 'vue';
  import {RouteRecordRaw, useRouter} from 'vue-router';

  const tagNames = ['布局', '导航', '数据入口', '数据展示', '反馈', '手势', '组合', '其他'];
  export default defineComponent({
    props: {
      menuList: {
        type: Array
      }
    },
    setup(props, {emit, slots}) {
      const openKeys: Ref<string[]> = ref([]);
      const getComponentMap = (routes: RouteRecordRaw[]) => {
        const tags = routes.map(it => it.meta && it.meta.tag);
        const map = {};
        tags.forEach((tag: any) => {
          map[tag] = routes.filter(it => it.meta.tag === tag);
        });
        const tagComponentsList = [];
        Object.keys(map).forEach(key => {
          tagComponentsList.push({
            tag: key,
            components: map[key]
          });
        });
        tagComponentsList.sort((a, b) => {
          return tagNames.indexOf(a.tag) - tagNames.indexOf(b.tag);
        });
        return tagComponentsList;
      };
      const router = useRouter();
      const handleClick = (route) => {
        router.push(route);
      };


      return {
        openKeys,
        getComponentMap,
        handleClick
      };
    }
  });
</script>
<style lang="less">
  #nav-list {
    .category-title {
      color: black;
      font-family: 'Songti SC', serif;
      font-weight: bold;
    }
  }
</style>
