import {ref} from 'vue';

const useMemoizedFn = function(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error('useMemoizedFn expected parameter is a function, got ' + typeof fn);
    }
  }

  const fnRef = ref(fn);

  const memoizedFn = ref();

  if (!memoizedFn.value) {
    memoizedFn.value = function() {
      const args = [];

      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      } // eslint-disable-next-line @typescript-eslint/no-invalid-this


      return fnRef.value.apply(this, args);
    };
  }

  return memoizedFn.value;
};

export default useMemoizedFn;
