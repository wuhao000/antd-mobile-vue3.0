import {ref, watchEffect} from 'vue';

const useUnmountedRef = () => {
  const unmountedRef = ref(false);
  watchEffect(() => {
    unmountedRef.value = false;
    return () => {
      unmountedRef.value = true;
    };
  });
  return unmountedRef;
};

export default useUnmountedRef;
