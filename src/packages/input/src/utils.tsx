import {isEmptySlot} from '../../utils/vnode';
import classnames from 'classnames';

export const renderLabel = (props, slots) => {
  const prefixCls = props.prefixCls;
  const labelNumber = props.labelNumber;
  const labelCls = classnames(`${prefixCls}-label`, {
    [`${prefixCls}-label-2`]: labelNumber === 2,
    [`${prefixCls}-label-3`]: labelNumber === 3,
    [`${prefixCls}-label-4`]: labelNumber === 4,
    [`${prefixCls}-label-5`]: labelNumber === 5,
    [`${prefixCls}-label-6`]: labelNumber === 6,
    [`${prefixCls}-label-7`]: labelNumber === 7
  });
  if (!isEmptySlot(slots.default)) {
    return <div class={labelCls}>{slots.default()}</div>;
  } else if (props.title) {
    return <div class={labelCls}>{props.title}</div>;
  }
  return null;
};
