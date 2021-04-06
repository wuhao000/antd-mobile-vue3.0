import _typeof from "@babel/runtime/helpers/typeof";
import { cloneVNode } from 'vue';
var camelizeRE = /-(\w)/g;

var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};

var parseStyleText = function parseStyleText() {
  var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var camel = arguments.length > 1 ? arguments[1] : undefined;
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);

      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

export function isEmptyElement(node) {
  return node.shapeFlag === 0;
}
export function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}
export function isEmptySlot(slot) {
  if (!slot) {
    return true;
  }

  return slot().filter(function (it) {
    return !isEmptyElement(it);
  }).length === 0;
}
export function cloneVNodes(vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);

  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }

  return res;
}
export function setListeners(vnode) {
  var listeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!vnode.props) {
    vnode.props = {};
  }

  Object.keys(listeners).forEach(function (key) {
    var orgListener = vnode.props[key];
    var newListener = listeners[key];

    vnode.props[key] = function () {
      if (newListener) {
        newListener.apply(void 0, arguments);
      }

      if (orgListener) {
        orgListener.apply(void 0, arguments);
      }
    };
  });
}
export function setProps(vnode) {
  var nodeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!vnode) {
    return;
  }

  if (vnode.props) {
    Object.keys(nodeProps).forEach(function (key) {
      vnode.props[key] = nodeProps[key];
    });
  } else {
    vnode.props = nodeProps;
  }
}
export function getNodeText(node) {
  if (node) {
    if (typeof node.children === 'string') {
      return node.children;
    } else if (Array.isArray(node.children)) {
      return node.children.map(function (it) {
        return getNodeText(it);
      }).join('');
    } else if (_typeof(node.children) === 'object') {
      var defaultSlot = node.children.default;

      if (node.children.default) {
        return defaultSlot().map(function (it) {
          return getNodeText(it);
        }).join('');
      } else {
        return '';
      }
    }
  }

  return undefined;
}