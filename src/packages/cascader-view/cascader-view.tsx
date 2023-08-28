import {computed, defineComponent, PropType, ref, watch} from 'vue';
import {usePureInput} from '../mixins/pure-input-component';
import RadioList from '../radio/src/radio-list';
import Tabs from '../tabs';
import {NativeProps} from '../utils/native-props';

const classPrefix = `adm-cascader-view`;

export type CascaderValue = string;

export type CascaderOption = {
  label: string
  value: string
  disabled?: boolean
  children?: CascaderOption[]
};

export type CascaderValueExtend = {
  items: (CascaderOption | null)[]
};

export type CascaderViewProps = {
  options: CascaderOption[]
  value?: CascaderValue[]
  defaultValue?: CascaderValue[]
  onChange?: (value: CascaderValue[], extend: CascaderValueExtend) => void
  placeholder?: string
} & NativeProps<'--height'>;

export const CascaderView = defineComponent({
  props: {
    options: Array as PropType<CascaderOption[]>,
    value: Array as PropType<CascaderValue[]>,
    defaultValue: {
      type: Array as PropType<CascaderValue[]>,
      default: () => []
    },
    onChange: Function as PropType<(value: CascaderValue[], extend: CascaderValueExtend) => void>,
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  setup(props, {emit, attrs}) {
    const {stateValue} = usePureInput(props, {emit, attrs}, {
      defaultValue: props.defaultValue
    });
    const tabActiveKey = ref<number>(0);
    const levels = computed(() => {
      const ret: {
        selected: CascaderOption | undefined
        options: CascaderOption[]
      }[] = [];
      let currentOptions = props.options;
      let reachedEnd = false;
      for (const v of stateValue.value || []) {
        const target = currentOptions.find(option => option.value === v);
        ret.push({
          selected: target,
          options: currentOptions
        });
        if (!target || !target.children || target.children.length === 0) {
          reachedEnd = true;
          break;
        }
        currentOptions = target.children;
      }
      if (!reachedEnd) {
        ret.push({
          selected: undefined,
          options: currentOptions
        });
      }
      return ret;
    });
    watch(() => stateValue.value, () => {
      tabActiveKey.value = levels.value.length - 1;
    });

    const onItemSelect = (selectValue: CascaderValue, depth: number) => {
      const next = stateValue.value.slice(0, depth);
      if (selectValue !== undefined) {
        next[depth] = selectValue;
      }
      stateValue.value = next;
    };
    return {
      levels,
      onItemSelect,
      setTabActiveKey: (key: number) => {
        tabActiveKey.value = key;
      },
      stateValue,
      tabActiveKey
    };
  },
  render() {
    return <div class={classPrefix}>
      <Tabs
          value={this.tabActiveKey}
          onChange={(_, index) => {
            this.setTabActiveKey(index);
          }}
          class={`${classPrefix}-tabs`}>
        {this.levels.map((level, index) => {
          const selected = level.selected;
          const radioProps = {
            value: this.stateValue[index],
            ['onUpdate:value']: (v) => {
              this.onItemSelect(v, index);
            },
            options: level.options,
            class: `${classPrefix}-content`
          };
          return (
              <Tabs.Tab
                  key={`tab_${index}`}
                  title={
                    <div class={`${classPrefix}-header-title`}>
                      {selected ? selected.label : this.placeholder}
                    </div>
                  }
                  forceRender>
                <RadioList {...radioProps}/>
              </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>;
  }
});
