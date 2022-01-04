import classNames from 'classnames';
import {CSSProperties, defineComponent, PropType} from 'vue';
import EmptyIcon from '../../assets/empty-icon.svg';
import {NativeProps, withNativeProps} from '../../utils/native-props';

const classPrefix = `adm-empty`;

export type EmptyProps = {
  image?: JSX.Element;
  imageStyle?: CSSProperties;
  description?: JSX.Element;
} & NativeProps;

const defaultProps = {
  image: EmptyIcon as string
};

export default defineComponent({
  name: 'MEmpty',
  props: {
    image: {
      type: Object as PropType<JSX.Element>,
      default: () => EmptyIcon
    },
    imageStyle: {
      type: Object as PropType<CSSProperties>
    },
    description: {
      type: [Object, String] as PropType<JSX.Element | string>
    }
  },
  render() {
    const imageNode =
        typeof this.image === 'string' ? (
            <img
                class={`${classPrefix}-image`}
                style={this.imageStyle}
                src={this.image}
                alt="empty"
            />
        ) : (
            this.image
        );

    return withNativeProps(
        this.$props,
        <div class={classPrefix}>
          <div class={`${classPrefix}-image-container`}>{imageNode}</div>
          {this.description && (
              <div class={classNames(`${classPrefix}-description`)}>
                {this.description}
              </div>
          )}
        </div>
    );
  }
});
