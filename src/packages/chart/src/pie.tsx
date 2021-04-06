import {defineComponent, getCurrentInstance, PropType} from 'vue';

const camel = function(key) {
  return key.replace(/(-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '');
  });
};
const camelBatch = function(attrs) {
  const newAttrs: any = {};
  for (const i in attrs) {
    if (attrs) {
      const key = camel(i);
      newAttrs[key] = attrs[i];
    }
  }
  return newAttrs;
};

export default defineComponent({
  name: 'VPie',
  props: {
    coord: {
      type: String as PropType<string>,
      default: 'polar'
    },
    transposed: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    serialField: {
      type: String as PropType<string>
    },
    colors: {
      type: Array as PropType<any[]>
    }
  },
  setup(props, {emit, attrs, slots}) {
    const instance = getCurrentInstance();
    (instance.parent as any).ctx.setPie({
      ...props,
      ...camelBatch(attrs)
    });
    return {};
  },
  render() {
  }
});
