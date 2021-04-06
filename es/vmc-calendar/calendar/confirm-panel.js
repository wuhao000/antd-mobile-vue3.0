import { createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { formatDate as _formatDate } from '../util';
var ConfirmPanel = defineComponent({
  name: 'ConfirmPanel',
  props: {
    type: {
      type: String
    },
    locale: {
      type: Object
    },
    onlyConfirm: {
      type: Boolean
    },
    disableBtn: {
      type: Boolean
    },
    startDateTime: {
      type: Date
    },
    endDateTime: {
      type: Date
    },
    formatStr: {
      type: String
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onConfirm = function onConfirm() {
      if (!props.disableBtn) {
        emit('confirm');
      }
    };

    var formatDate = function formatDate(date) {
      var _props$formatStr = props.formatStr,
          formatStr = _props$formatStr === void 0 ? '' : _props$formatStr,
          locale = props.locale;
      return _formatDate(date, formatStr, locale);
    };

    return {
      onConfirm: onConfirm,
      formatDate: formatDate
    };
  },
  render: function render() {
    var type = this.type,
        locale = this.locale,
        disableBtn = this.disableBtn;
    var startDateTime = this.startDateTime,
        endDateTime = this.endDateTime;

    if (startDateTime && endDateTime && +startDateTime > +endDateTime) {
      var tmp = startDateTime;
      startDateTime = endDateTime;
      endDateTime = tmp;
    }

    var startTimeStr = startDateTime ? this.formatDate(startDateTime) : locale.noChoose;
    var endTimeStr = endDateTime ? this.formatDate(endDateTime) : locale.noChoose;
    var btnCls = disableBtn ? 'button button-disable' : 'button';

    if (type === 'one') {
      btnCls += ' button-full';
    }

    return _createVNode("div", {
      "class": "confirm-panel"
    }, [type === 'range' && _createVNode("div", {
      "class": 'info'
    }, [_createVNode("p", null, [locale.start, _createTextVNode(": "), _createVNode("span", {
      "class": !startDateTime ? 'grey' : ''
    }, [startTimeStr])]), _createVNode("p", null, [locale.end, _createTextVNode(": "), _createVNode("span", {
      "class": !endDateTime ? 'grey' : ''
    }, [endTimeStr])])]), _createVNode("div", {
      "class": btnCls,
      "onClick": this.onConfirm
    }, [locale.confirm])]);
  }
});
export default ConfirmPanel;