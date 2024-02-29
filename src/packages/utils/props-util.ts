import {camelize, resolvePropValue} from 'ant-design-vue/es/_util/util';
import isPlainObject from 'lodash-es/isPlainObject';

export const mergeProps = <T>(props: T, defaultProps: Partial<T>): Partial<T> => {
  const newProps: Partial<T> = {
    ...defaultProps
  };
  Object.keys(props).forEach(key => {
    if (props[key] !== undefined) {
      newProps[key] = props[key];
    }
  });
  return newProps;
};

export const getPropsData = ins => {
  const vnode = ins.$ ? ins.$ : ins;
  const res = {};
  const originProps = vnode.props || {};
  const props = {};
  Object.keys(originProps).forEach(key => {
    props[camelize(key)] = originProps[key];
  });
  const options = isPlainObject(vnode.type) ? vnode.type.props : {};
  options && Object.keys(options).forEach(k => {
    const v = resolvePropValue(options, props, k, props[k]);
    if (k in props) {
      // 仅包含 props，不包含默认值
      res[k] = v;
    }
  });
  return Object.assign(Object.assign({}, props), res); // 合并事件、未声明属性等
};
