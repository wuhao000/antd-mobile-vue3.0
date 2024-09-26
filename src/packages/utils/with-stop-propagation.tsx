import {cloneElement} from 'ant-design-vue/es/_util/vnode';
import { VNode } from 'vue';

export type PropagationEvent = 'click';

const eventToPropRecord: Record<PropagationEvent, string> = {
  'click': 'onClick'
};

export function withStopPropagation(
    events: PropagationEvent[],
    element: VNode
) {
  const props: Record<string, any> = {...element.props};
  for (const key of events) {
    const prop = eventToPropRecord[key];
    props[prop] = function(e: Event) {
      e.stopPropagation();
      element.props[prop]?.(e);
    };
  }
  return cloneElement(element, props);
}
