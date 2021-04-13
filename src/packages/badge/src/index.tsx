import classnames from 'classnames';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Badge',
  props: {
    prefixCls: {default: 'am-badge'},
    hot: {type: Boolean, default: false},
    size: {type: String, default: 'small'},
    overflowCount: {type: Number, default: 99},
    corner: {type: Boolean, default: false},
    dot: {type: Boolean, default: false},
    text: {type: [String, Number]},
    textStyle: {type: Object}
  },
  render() {
    let {
      overflowCount,
      text
    } = this.$props;
    const {
      prefixCls,
      size,
      dot,
      corner,
      hot
    } = this.$props;
    overflowCount = overflowCount as number;
    text =
        typeof text === 'number' && text > overflowCount
            ? `${overflowCount}+`
            : text;
    // dot mode don't need text
    if (dot) {
      text = '';
    }

    const scrollNumberCls = classnames({
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-dot-large`]: dot && size === 'large',
      [`${prefixCls}-text`]: !dot && !corner,
      [`${prefixCls}-corner`]: corner,
      [`${prefixCls}-corner-large`]: corner && size === 'large'
    });

    const badgeCls = classnames(prefixCls, {
      [`${prefixCls}-not-a-wrapper`]: !this.$slots.default?.(),
      [`${prefixCls}-corner-wrapper`]: corner,
      [`${prefixCls}-hot`]: hot,
      [`${prefixCls}-corner-wrapper-large`]: corner && size === 'large'
    });

    return (
        <span class={badgeCls}>
          {this.$slots.default?.()}
          {(text || dot) && (
              // tslint:disable-next-line:jsx-no-multiline-js
              <sup class={scrollNumberCls}
                   style={this.textStyle}>
                {text}
              </sup>
          )}
        </span>
    );
  }
});
