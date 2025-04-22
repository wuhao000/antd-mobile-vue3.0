import classnames from 'classnames';
import { CSSProperties, defineComponent, PropType, ref, Ref } from 'vue';
import CarouselBase from './base';

type IFrameOverFlow = 'visible' | 'hidden';


const DotDecorator = defineComponent({
  name: 'DotDecorator',
  inheritAttrs: false,
  props: {
    slideCount: {
      type: Number
    },
    slidesToScroll: {
      type: Number
    },
    currentSlide: {
      type: Number
    },
    prefixCls: {
      type: String,
      default: 'am-carousel'
    },
    dotActiveStyle: {
      type: Object as PropType<CSSProperties>
    },
    dotStyle: {
      type: Object as PropType<CSSProperties>
    }
  },
  render() {
    const arr: number[] = [];
    for (let i = 0; i < this.slideCount; i += this.slidesToScroll) {
      arr.push(i);
    }
    const dotDom = arr.map(index => {
      const dotCls = classnames(`${this.prefixCls}-wrap-dot`, {
        [`${this.prefixCls}-wrap-dot-active`]: index === this.currentSlide
      });
      const currentDotStyle: CSSProperties = index === this.currentSlide ? this.dotActiveStyle : this.dotStyle;
      return (
        <div class={dotCls} key={index}>
          <span style={currentDotStyle} />
        </div>
      );
    });
    return <div class={`${this.prefixCls}-wrap`}>{dotDom}</div>;
  }
});

const Carousel = defineComponent({
  name: 'MCarousel',
  props: {
    prefixCls: {
      type: String,
      default: 'am-carousel'
    },
    beforeChange: {},
    afterChange: {
      type: Function
    },
    swipeSpeed: {},
    easing: {},
    dotStyle: {
      default: () => {
        return {};
      }
    },
    dotActiveStyle: {
      default: () => {
        return {};
      }
    },
    frameOverflow: {
      type: String as PropType<IFrameOverFlow>
    },
    cellAlign: {
      type: String,
      default: 'center'
    },
    cellSpacing: {
      type: Number
    },
    slideWidth: {
      type: [String, Number] as PropType<string | number>
    },
    dots: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayInterval: {
      type: Number
    },
    infinite: {
      type: Boolean,
      default: false
    },
    initialSlideWidth: {
      type: Number
    }
  },
  setup(props) {
    const selectedIndex: Ref<number> = ref(0);

    const onChange = (index: number) => {
      selectedIndex.value = index;
      if (props.afterChange) {
        props.afterChange(index);
      }
    };


    return {onChange, selectedIndex};
  },
  render() {
    const {
      infinite,
      selectedIndex,
      beforeChange,
      dots,
      prefixCls,
      vertical
    } = this;

    const newProps = {
      ...this.$props,
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange
    };

    let Decorators: any[] = [];

    if (dots) {
      Decorators = [{
        component: DotDecorator,
        position: 'BottomCenter'
      }];
    }
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-vertical`]: vertical
    }, this.$attrs.class as string | Record<string, string>);
    return (
      <CarouselBase
        {
          ...{
            ...newProps,
            decorators: Decorators,
            afterSlide: this.onChange
          }
        }
        class={wrapCls}>
        {this.$slots.default()}
      </CarouselBase>
    );
  }
});
export default Carousel;
