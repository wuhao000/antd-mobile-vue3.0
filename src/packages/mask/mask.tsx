import {computed, defineComponent, PropType, ref, watch} from 'vue';
import {withNativeProps} from '../utils/native-props';
import {GetContainer, renderToContainer} from '../utils/render-to-container';
import {useLockScroll} from '../utils/use-lock-scroll';
import {useShouldRender} from '../utils/use-should-render';
import {withStopPropagation} from '../utils/with-stop-propagation';

const classPrefix = `adm-mask`;

const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
};

export const Mask = defineComponent({
  name: 'MMask',
  props: {
    visible: {type: Boolean, default: false},
    onMaskClick: Function as PropType<(event: MouseEvent) => void>,
    destroyOnClose: Boolean,
    forceRender: Boolean,
    disableBodyScroll: Boolean,
    color: {
      type: String as PropType<'black' | 'white'>,
      default: 'black'
    },
    opacity: {
      type: [String, Number] as PropType<'default' | 'thin' | 'thick' | number>,
      default: 'default'
    },
    getContainer: [Object, Function] as PropType<GetContainer>,
    afterShow: Function as PropType<() => void>,
    afterClose: Function as PropType<() => void>
  },
  setup(props) {
    const wrapperRef = ref(null);

    useLockScroll(wrapperRef, props.visible && props.disableBodyScroll);

    const background = computed(() => {
      const opacity = opacityRecord[props.opacity] ?? props.opacity;
      const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
      return `rgba(${rgb}, ${opacity})`;
    });

    const active = ref(props.visible);
    const opacity = ref(0);

    const intervalRef = ref();

    watch(() => props.visible, visible => {
      if (intervalRef.value) {
        clearInterval(intervalRef.value);
        opacity.value = visible ? 0 : 1;
      }
      console.log(visible, opacity.value);
      intervalRef.value = setInterval(() => {
        if (visible) {
          if (opacity.value >= 1) {
            onEnd();
          } else {
            opacity.value += 0.01;
          }
        } else {
          if (opacity.value <= 0) {
            onEnd();
          } else {
            opacity.value -= 0.01;
          }
        }
      }, 2);
    }, {immediate: true});

    const onEnd = () => {
      clearInterval(intervalRef.value);
      intervalRef.value = undefined;
      active.value = props.visible;
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    };

    const shouldRender = useShouldRender(
        active.value,
        props.forceRender,
        props.destroyOnClose
    );

    return {
      renderToContainer,
      background,
      wrapperRef,
      shouldRender,
      active,
      opacity
    };
  },
  render() {
    const display = this.visible ? 'unset' : (this.active ? 'unset' : 'none');
    const node = withStopPropagation(
        ['click'],
        withNativeProps(
            this.$props,
            <div
                class={classPrefix}
                ref={this.wrapperRef}
                style={{
                  ...(this.$attrs.style as any || {}),
                  opacity: this.opacity,
                  background: this.background,
                  display
                }}
            >
              {this.onMaskClick && (
                  <div
                      class={`${classPrefix}-aria-button`}
                      role="button"
                      onClick={this.onMaskClick}
                  />
              )}
              <div class={`${classPrefix}-content`}>
                {this.$slots.default?.()}
              </div>
            </div>
        )
    );
    return renderToContainer(this.getContainer, node);
  }
});

