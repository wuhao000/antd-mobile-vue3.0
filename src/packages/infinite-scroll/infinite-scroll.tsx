import {throttle} from 'lodash';
import {defineComponent, onBeforeUnmount, onMounted, PropType, ref} from 'vue';
import Loading from '../loading';
import {getScrollParent} from '../utils/get-scroll-parent';
import {NativeProps} from '../utils/native-props';
import useLockFn from '../utils/use-lock-fn';
import useMemoizedFn from '../utils/use-memoized-fn';

function isWindow(element: any | Window): element is Window {
  return element === window;
}

const classPrefix = `adm-infinite-scroll`;

export type InfiniteScrollProps = {
  loadMore: () => Promise<void>
  hasMore: boolean
  threshold?: number
} & NativeProps;

const InfiniteScrollContent = ({hasMore}: { hasMore: boolean }) => {
  return (
      <>
      {hasMore ? (
          <>
          <span>加载中</span>
          <Loading/>
        </>
      ) : (
          <span>没有更多了</span>
      )}
    </>
  );
};

export const InfiniteScroll = defineComponent({
  name: 'MInfiniteScroll',
  props: {
    loadMore: {
      type: Function as PropType<() => Promise<void>>
    },
    hasMore: Boolean,
    threshold: {
      type: Number,
      default: 250
    }
  },
  setup(props) {
    const doLoadMore = useLockFn(() => props.loadMore());
    const elementRef = ref<HTMLDivElement>(null);

    const checkTimeoutRef = ref<number>();
    const check = useMemoizedFn(() => {
      window.clearTimeout(checkTimeoutRef.value);
      checkTimeoutRef.value = window.setTimeout(() => {
        if (!props.hasMore) {
          return;
        }
        const element = elementRef.value;
        if (!element) {
          return;
        }
        if (!element.offsetParent) {
          return;
        }
        const parent = getScrollParent(element);
        if (!parent) {
          return;
        }
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const current = isWindow(parent)
            ? window.innerHeight
            : parent.getBoundingClientRect().bottom;
        if (current >= elementTop - props.threshold) {
          doLoadMore();
        }
      });
    });

    // 确保在内容不足时会自动触发加载事件
    check();

    const parent = ref();

    const onScroll = () => {
      check();
    };

    onMounted(() => {
      const element = elementRef.value;
      if (!element) {
        return;
      }
      parent.value = getScrollParent(element);
      if (!parent) {
        return;
      }
      parent.value.addEventListener('scroll', onScroll);
    });
    onBeforeUnmount(() => {
      parent.value.removeEventListener('scroll', onScroll);
    });
    return {
      elementRef
    };
  },
  render() {
    return <div class={classPrefix} ref="elementRef">
      {this.$slots.default?.()}
      {!this.$slots.default && <InfiniteScrollContent hasMore={this.hasMore}/>}
    </div>;
  }
});
