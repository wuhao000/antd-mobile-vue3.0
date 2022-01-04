import {ref} from 'vue';

export function useInitialized(check?: boolean) {
  const initializedRef = ref(check);
  if (check) {
    initializedRef.value = true;
  }
  return !!initializedRef.value;
}
