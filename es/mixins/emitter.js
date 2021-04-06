import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { Subject } from 'rxjs';
import { inject, provide } from 'vue';
export var useEmitter = function useEmitter(instance) {
  var emitter = inject('emitter', null);

  if (emitter) {
    return emitter;
  } else {
    var subscribes = {};
    var _emitter = {
      subscribe: function subscribe(event, callback) {
        if (!subscribes[event]) {
          subscribes[event] = new Subject();
        }

        subscribes[event].subscribe({
          next: function next(value) {
            var parent = value.instance;

            while (parent !== undefined && parent !== null && parent.uid !== instance.uid) {
              parent = parent.parent;
            }

            callback.apply(void 0, _toConsumableArray(value.params));
          }
        });
      },
      dispatch: function dispatch(component, eventName, params) {
        if (subscribes[eventName]) {
          subscribes[eventName].next({
            component: component,
            params: params,
            instance: instance
          });
        }
      }
    };
    provide('emitter', _emitter);
    return _emitter;
  }
};