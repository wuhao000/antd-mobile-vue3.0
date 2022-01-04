import {Ref, ref} from 'vue';

export const useState = <T>(value: T): [Ref<T>, (value: T) => void] => {
  const refValue: Ref = ref(value);
  return [refValue, (v) => {
    refValue.value = v;
  }];
};
