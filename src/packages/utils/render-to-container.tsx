import {Teleport} from 'vue';
import {canUseDom} from './can-use-dom';
import {resolveContainer} from './get-container';

export type GetContainer = HTMLElement | (() => HTMLElement) | null

export function renderToContainer(
    getContainer: GetContainer,
    node: JSX.Element
) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return <Teleport to={container}>
      {node}
    </Teleport>;
  }
  return node;
}
