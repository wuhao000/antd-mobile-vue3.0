import classNames from 'classnames';
import { CSSProperties, defineComponent, PropType, VNode } from 'vue';
import EmptyIcon from '../../assets/empty-icon.svg';
import {NativeProps, withNativeProps} from '../../utils/native-props';

const classPrefix = `adm-empty`;

export type EmptyProps = {
  image?: VNode;
  imageStyle?: CSSProperties;
  description?: VNode;
} & NativeProps;

const defaultProps = {
  image: EmptyIcon as string
};

export default defineComponent({
  name: 'MEmpty',
  props: {
    image: {
      type: [Object, String] as PropType<VNode | string>,
      default: () => EmptyIcon
    },
    imageStyle: {
      type: Object as PropType<CSSProperties>
    },
    description: {
      type: [Object, String] as PropType<VNode | string>
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
