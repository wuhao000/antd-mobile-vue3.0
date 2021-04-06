import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ShortcutPanel',
  props: {
    locale: {
      type: Object
    },
    onSelect: {}
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onClick = function onClick(type) {
      var today = new Date();

      switch (type) {
        case 'today':
          emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
          break;

        case 'yesterday':
          emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12));
          break;

        case 'lastweek':
          emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
          break;

        case 'lastmonth':
          emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
          break;
      }
    };

    return {
      onClick: onClick
    };
  },
  render: function render() {
    var _this = this;

    var locale = this.locale;
    return _createVNode("div", {
      "class": "shortcut-panel"
    }, [_createVNode("div", {
      "class": "item",
      "onClick": function onClick() {
        return _this.onClick('today');
      }
    }, [locale.today]), _createVNode("div", {
      "class": "item",
      "onClick": function onClick() {
        return _this.onClick('yesterday');
      }
    }, [locale.yesterday]), _createVNode("div", {
      "class": "item",
      "onClick": function onClick() {
        return _this.onClick('lastweek');
      }
    }, [locale.lastWeek]), _createVNode("div", {
      "class": "item",
      "onClick": function onClick() {
        return _this.onClick('lastmonth');
      }
    }, [locale.lastMonth])]);
  }
});