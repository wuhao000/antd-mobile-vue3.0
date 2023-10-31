import {PickerData} from '../picker/src/props-type';
import classNames from 'classnames';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
  watch
} from 'vue';
import PickerMixin from './picker-mixin';
import PickerProps from './picker-types';
import {isNotNull} from "../utils/util";

const Picker = defineComponent({
  name: 'Picker',
  props: {
    ...PickerProps,
    data: {type: Array as PropType<Array<PickerData>>, required: true},
    computeChildIndex: {type: Function as PropType<(a, b, c) => any>},
    select: {type: Function as PropType<(a, b, c) => any>},
    doScrollingComplete: {type: Function as PropType<(a, b, c) => any>},
    noAnimate: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit}) {
    const scrollValue = ref(null);
    const state: any = reactive({});
    const indicatorRef = ref<HTMLElement>(null);
    const itemHeight = ref(34);
    watch(() => props.value, (value: any) => {
      if (state.value !== value) {
        state.value = value;
        props.select(
          state.value,
          itemHeight.value,
          props.noAnimate ? scrollToWithoutAnimation : scrollTo
        );
      }
    });
    watch(() => props.data, data => {
      if (isNotNull(props.value)) {
        if (data.length) {
          if (!data.map(it => it.value).includes(state.value)) {
            state.value = data[0].value;
            emit('update:value', state.value);
          }
        } else {
          state.value = null;
          emit('update:value', null);
        }
      }
    });
    const rootRef = ref<HTMLElement>(null);
    const maskRef = ref<HTMLElement>(null);
    const contentRef = ref<HTMLElement>(null);
    const scrollHandlers = computed(() => {
      let scrollY = -1;
      let lastY = 0;
      let startY = 0;
      let scrollDisabled = false;
      let isMoving = false;

      const setTransform = (nodeStyle: CSSStyleDeclaration, value: any) => {
        nodeStyle.transform = value;
        nodeStyle.webkitTransform = value;
      };

      const setTransition = (nodeStyle: CSSStyleDeclaration, value: any) => {
        nodeStyle.transition = value;
        nodeStyle.webkitTransition = value;
      };

      const scrollTo = (_x, y, time = .3) => {
        if (scrollY !== y) {
          scrollY = y;
          if (time && !props.noAnimate) {
            setTransition(contentRef.value.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`);
          }
          setTransform(contentRef.value.style, `translate3d(0,${-y}px,0)`);
          setTimeout(() => {
            scrollingComplete();
            if (contentRef.value) {
              setTransition(contentRef.value.style, '');
            }
          }, +time * 1000);
        }
      };

      const Velocity = ((minInterval = 30, maxInterval = 100) => {
        let _time = 0;
        let _y = 0;
        let _velocity = 0;
        const recorder = {
          record: (y) => {
            const now = +new Date();
            _velocity = (y - _y) / (now - _time);
            if (now - _time >= minInterval) {
              _velocity = now - _time <= maxInterval ? _velocity : 0;
              _y = y;
              _time = now;
            }
          },
          getVelocity: (y) => {
            if (y !== _y) {
              recorder.record(y);
            }
            return _velocity;
          }
        };
        return recorder;
      })();

      const onFinish = () => {
        isMoving = false;
        let targetY = scrollY;
        const height = (props.data.length - 1) * itemHeight.value;
        let time = .3;
        const velocity = Velocity.getVelocity(targetY) * 4;
        if (velocity) {
          targetY = velocity * 40 + targetY;
          time = Math.abs(velocity) * .1;
        }
        if (targetY % itemHeight.value !== 0) {
          targetY = Math.round(targetY / itemHeight.value) * itemHeight.value;
        }
        if (targetY < 0) {
          targetY = 0;
        } else if (targetY > height) {
          targetY = height;
        }
        scrollTo(0, targetY, time < .3 ? .3 : time);
        onScrollChange();
      };

      const onStart = (y: number) => {
        if (scrollDisabled) {
          return;
        }

        isMoving = true;
        startY = y;
        lastY = scrollY;
      };

      const onMove = (y: number) => {
        if (scrollDisabled || !isMoving) {
          return;
        }
        scrollY = lastY - y + startY;
        Velocity.record(scrollY);

        onScrollChange();
        setTransform(contentRef.value.style, `translate3d(0,${-scrollY}px,0)`);
      };

      return {
        touchstart: (evt) => onStart(evt.touches[0].pageY),
        mousedown: (evt) => onStart(evt.pageY),
        touchmove: (evt) => {
          evt.preventDefault();
          onMove(evt.touches[0].pageY);
        },
        mousemove: (evt) => {
          evt.preventDefault();
          onMove(evt.pageY);
        },
        touchend: () => onFinish(),
        touchcancel: () => onFinish(),
        mouseup: () => onFinish(),
        getValue: () => {
          return scrollY;
        },
        scrollTo,
        setDisabled: (disabled: boolean = false) => {
          scrollDisabled = disabled;
        }
      };
    });
    onBeforeUnmount(() => {
      Object.keys(scrollHandlers.value).forEach(key => {
        if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
          rootRef.value.removeEventListener(key, scrollHandlers.value[key]);
        }
      });
    });
    const scrollTo = (top) => {
      scrollHandlers.value.scrollTo(0, top);
    };
    const scrollToWithoutAnimation = (top) => {
      scrollHandlers.value.scrollTo(0, top, 0);
    };
    const fireValueChange = (value) => {
      if (value !== state.value) {
        if (props.value === undefined) {
          state.value = value;
        }
        emit('update:value', value);
      }
    };
    const onScrollChange = () => {
      const top = scrollHandlers.value.getValue();
      if (top >= 0) {
        const index = props.computeChildIndex(top, itemHeight.value, props.data.length);
        if (scrollValue.value !== index && index >= 0) {
          scrollValue.value = index;
          const child = props.data[index];
          emit('scroll-change', child?.value);
        }
      }
    };
    const scrollingComplete = () => {
      const top = scrollHandlers.value.getValue();
      if (top >= 0) {
        props.doScrollingComplete(top, itemHeight.value, fireValueChange);
      }
    };
    {
      let valueState;
      const {value, defaultValue} = props;
      if (value !== undefined) {
        valueState = value;
      } else if (defaultValue !== undefined) {
        valueState = defaultValue;
      } else {
        valueState = props.data[0] && props.data[0].value;
      }
      state.value = valueState;
    }
    onMounted(() => {
      const rootHeight = rootRef.value.clientHeight;
      // https://github.com/react-component/m-picker/issues/18
      const itemHeightValue = itemHeight.value;
      let num = Math.floor(rootHeight / itemHeightValue);
      if (num % 2 === 0) {
        num--;
      }
      num--;
      num /= 2;
      contentRef.value.style.padding = `${itemHeightValue * num}px 0`;
      indicatorRef.value.style.top = `${itemHeightValue * num}px`;
      maskRef.value.style.backgroundSize = `100% ${itemHeightValue * num}px`;
      scrollHandlers.value.setDisabled(props.disabled);
      props.select(state.value, itemHeight.value, scrollTo);

      let passiveSupported = false;
      try {
        const options = Object.defineProperty({}, 'passive', {
          get: () => {
            passiveSupported = true;
          }
        });
        window.addEventListener('test', null as any, options);
      } catch (err) {
      }
      const willPreventDefault = passiveSupported ? {passive: false} : false;
      const willNotPreventDefault = passiveSupported ? {passive: true} : false;
      Object.keys(scrollHandlers.value).forEach(key => {
        if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
          const pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault;
          rootRef.value.addEventListener(key, scrollHandlers.value[key], pd as any);
        }
      });
    });
    onUpdated(() => {
      props.select(state.value, itemHeight.value, scrollToWithoutAnimation);
      scrollHandlers.value.setDisabled(props.disabled);
    });
    return {
      setRootRef(el) {
        rootRef.value = el;
      },
      setMaskRef(el) {
        maskRef.value = el;
      },
      setContentRef(el) {
        contentRef.value = el;
      },
      setIndicatorRef(el) {
        indicatorRef.value = el;
      },
      state
    };
  },
  render() {
    const {
      prefixCls,
      itemStyle,
      indicatorStyle,
      indicatorClassName = ''
    } = this.$props;
    const {value: stateValue} = this.state;
    const itemClassName = `${prefixCls}-item`;
    const selectedItemClassName = `${itemClassName} ${prefixCls}-item-selected`;
    const map = (item: PickerData) => {
      const {style, value, label, class: className = ''} = item;
      return (
        <div style={{...itemStyle, ...style}}
             class={`${stateValue === value ? selectedItemClassName : itemClassName} ${className}`}
             key={value}>
          {label}
        </div>
      );
    };
    const items = this.data.map(map);
    const pickerCls = {
      [prefixCls as string]: true
    };
    return (
      <div class={classNames(pickerCls)}
           ref={this.setRootRef}>
        <div class={`${prefixCls}-mask`}
             ref={this.setMaskRef}/>
        <div
          class={`${prefixCls}-indicator ${indicatorClassName}`}
          ref={this.setIndicatorRef}
          style={indicatorStyle}
        />
        <div class={`${prefixCls}-content`}
             ref={this.setContentRef}>
          {items}
        </div>
      </div>
    );
  }
});


export default PickerMixin(Picker);
