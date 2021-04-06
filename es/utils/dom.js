var htmlAttrNames = ['innerHTML', 'class', 'style', 'accesskey', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'hidden', 'id', 'lang', 'placeholder', 'spellcheck', 'tabindex', 'title', 'translate', 'radiogroup', 'role', 'about', 'datatype', 'inlist', 'prefix', 'property', 'resource', 'typeof', 'vocab', 'autocapitalize', 'autocorrect', 'autocave', 'color', 'itemprop', 'itemscope', 'itemtype', 'itemid', 'itemref', 'results', 'security', 'unselectable'];
export var filterHTMLAttrs = function filterHTMLAttrs(props) {
  var res = {};
  Object.keys(props).forEach(function (key) {
    if (htmlAttrNames.includes(key)) {
      res[key] = props[key];
    }
  });
  return res;
};