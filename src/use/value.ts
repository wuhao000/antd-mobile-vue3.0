import {Ref, ref, watch} from 'vue';
import isequal from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

const isNullOrUndefined = (value) => {
  return value === undefined || value === null;
};
const basicTypes = ['number', 'boolean', 'string'];

function isEqual(a, b) {
  if (isNullOrUndefined(a) && isNullOrUndefined(b)) {
    return true;
  } else if (isNullOrUndefined(a) || isNullOrUndefined(b)) {
    return false;
  }
  const compareA = basicTypes.includes(typeof a) ? a.toString() : a;
  const compareB = basicTypes.includes(typeof b) ? b.toString() : b;
  return compareA === compareB;
}

interface LocalValueOptions<T> {
  prop?: string;
  defaultValue?: T;
  autoEmit?: boolean;
  onBeforeEmit?: (value: T) => void;
}

const defaultOptions: LocalValueOptions<any> = {
  prop: 'value',
  defaultValue: undefined,
  autoEmit: true
};

export const useLocalValue = <T = unknown>(props, emit,
                                           nameOrOptions: string | LocalValueOptions<T> = 'value',
                                           defaultValue: T = undefined): { localValue: Ref<T> } => {
  const options = typeof nameOrOptions === 'object' ? Object.assign({}, defaultOptions, nameOrOptions) : Object.assign({}, defaultOptions, {
    prop: nameOrOptions,
    defaultValue
  });
  const localValue = ref(props[options.prop] ?? options.defaultValue);
  watch(() => props[options.prop], value => {
    if (!isequal(value, localValue.value)) {
      if (value === null || value === undefined) {
        localValue.value = options.defaultValue;
      } else {
        if (typeof value === 'object') {
          localValue.value = cloneDeep(value);
        } else {
          localValue.value = value;
        }
      }
    }
  }, {deep: true});
  if (options.autoEmit) {
    watch(() => localValue.value, (value: T) => {
      const finalValue = options.onBeforeEmit ? options.onBeforeEmit(value) : value;
      if (options.prop) {
        emit(`update:${options.prop}`, finalValue);
      } else {
        emit('update', finalValue);
      }
    }, {deep: true});
  }
  return {
    localValue
  };
};
