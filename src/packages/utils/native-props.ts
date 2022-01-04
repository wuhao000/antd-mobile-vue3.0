import {cloneElement} from 'ant-design-vue/es/_util/vnode';
import classNames from 'classnames';
import {CSSProperties} from 'vue';

export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
  tabIndex?: number;
}

export function withNativeProps(
    props: any,
    element: JSX.Element
) {
  const p = {
    ...element.props
  };
  if (props.class) {
    p.class = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style
    };
  }
  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }
  return cloneElement(element, p);
}
