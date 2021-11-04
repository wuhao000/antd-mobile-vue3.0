import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'loading-directive',
  name: 'LoadingDirective 加载中',
  meta: {
    tag: '其他'
  },
  component: () => import('../generated/loading-directive/index.vue')
}] as RouteRecordRaw[];
