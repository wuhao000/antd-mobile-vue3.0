import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { provide, reactive, ref, watch } from 'vue';
import ConfirmPanel from './calendar/confirm-panel';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import { mergeDateTime } from './util';
export var StateType = function StateType() {
  _classCallCheck(this, StateType);

  _defineProperty(this, "showTimePicker", false);

  _defineProperty(this, "startDate", undefined);

  _defineProperty(this, "endDate", undefined);

  _defineProperty(this, "disConfirmBtn", true);

  _defineProperty(this, "clientHight", 0);

  _defineProperty(this, "visible", false);
};
export var useBaseCalendar = function useBaseCalendar(props, _ref) {
  var _props$value;

  var emit = _ref.emit;
  var currentValue = ref((_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : []);
  provide('currentValue', currentValue);
  var state = reactive({
    showTimePicker: false,
    timePickerTitle: '',
    startDate: undefined,
    endDate: undefined,
    disConfirmBtn: true,
    clientHeight: 0,
    contentStyle: {},
    visible: props.visible
  });

  var onSelectedDate = function onSelectedDate(date) {
    var startDate = state.startDate,
        endDate = state.endDate;
    var onSelect = props.onSelect;

    if (onSelect) {
      var value = onSelect(date, [startDate, endDate]);

      if (value) {
        shortcutSelect(value[0], value[1]);
        return;
      }
    }

    setState(selectDate(date, false, {
      startDate: startDate,
      endDate: endDate
    }));
  };
  /** 选择区间包含不可用日期 */


  var onSelectHasDisableDate = function onSelectHasDisableDate(date) {
    onClear();
    emit('select-has-disable-date', date);
  };

  var onClose = function onClose() {
    setState(new StateType());
    emit('close');
    emit('update:visible', false);
  };
  /** 关闭时回调 */


  var onCancel = function onCancel() {
    emit('cancel');
    onClose();
  };
  /** 确认时回调 */


  var onConfirm = function onConfirm() {
    var startDate = state.startDate,
        endDate = state.endDate;

    if (startDate && endDate && +startDate > +endDate) {
      return emit('confirm', endDate, startDate);
    }

    emit('confirm', startDate, endDate);
    onClose();
  };

  var onTimeChange = function onTimeChange(timeValue) {
    var startDate = state.startDate,
        endDate = state.endDate;
    var date = null;

    if (endDate) {
      date = endDate;
    } else if (startDate) {
      date = startDate;
    }

    if (date) {
      var hours = timeValue[0];

      if (timeValue[2] === 1) {
        hours += 12;
        date.setUTCHours(timeValue[0]);
      }

      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeValue[0], timeValue[1], 0);
    }

    if (endDate) {
      state.endDate = date;
    } else if (startDate) {
      state.startDate = date;
    }
  };
  /** 清除时回调 */


  var onClear = function onClear() {
    state.startDate = undefined;
    state.endDate = undefined;
    state.showTimePicker = false;
    emit('clear');
  };

  var setClientHeight = function setClientHeight(height) {
    state.clientHeight = height;
  };

  var renderCalendar = function renderCalendar() {
    var type = props.type,
        _props$locale = props.locale,
        locale = _props$locale === void 0 ? {} : _props$locale,
        prefixCls = props.prefixCls,
        pickTime = props.pickTime,
        showShortcut = props.showShortcut,
        renderHeader = props.renderHeader,
        infiniteOpt = props.infiniteOpt,
        initialMonths = props.initialMonths,
        defaultValue = props.defaultValue,
        minDate = props.minDate,
        maxDate = props.maxDate,
        getDateExtra = props.getDateExtra,
        rowSize = props.rowSize,
        defaultTimeValue = props.defaultTimeValue,
        renderShortcut = props.renderShortcut,
        timePickerPrefixCls = props.timePickerPrefixCls,
        timePickerPickerPrefixCls = props.timePickerPickerPrefixCls;
    var showTimePicker = state.showTimePicker,
        timePickerTitle = state.timePickerTitle,
        startDate = state.startDate,
        endDate = state.endDate,
        disConfirmBtn = state.disConfirmBtn,
        clientHeight = state.clientHeight;
    var headerProps = {
      locale: locale,
      showClear: !!startDate,
      onClear: onCancel,
      onCancel: onCancel
    };
    return _createVNode("div", {
      "class": "".concat(prefixCls)
    }, [_createVNode("div", {
      "style": state.contentStyle,
      "class": "content"
    }, [renderHeader ? renderHeader(headerProps) : _createVNode(Header, _mergeProps(headerProps, {
      "onClear": onCancel,
      "onCancel": onCancel
    }), null), _createVNode(DatePicker, {
      "locale": locale,
      "type": type,
      "value": endDate ? endDate : startDate,
      "displayMode": props.displayMode,
      "prefixCls": prefixCls,
      "infiniteOpt": infiniteOpt,
      "initialMonths": initialMonths,
      "currentStartDate": state.startDate,
      "currentEndDate": state.endDate,
      "defaultValue": defaultValue,
      "minDate": minDate,
      "maxDate": maxDate,
      "getDateExtra": getDateExtra,
      "onCellClick": onSelectedDate,
      "onSelectHasDisableDate": onSelectHasDisableDate,
      "onLayout": setClientHeight,
      "startDate": startDate,
      "endDate": endDate,
      "rowSize": rowSize
    }, null), !props.displayMode && showTimePicker && _createVNode(TimePicker, {
      "prefixCls": timePickerPrefixCls,
      "pickerPrefixCls": timePickerPickerPrefixCls,
      "locale": locale,
      "title": timePickerTitle,
      "defaultValue": defaultTimeValue,
      "value": endDate ? endDate : startDate,
      "onChange": onTimeChange,
      "minDate": minDate,
      "maxDate": maxDate,
      "clientHeight": clientHeight
    }, null), !props.displayMode && showShortcut && !showTimePicker && (renderShortcut ? renderShortcut(shortcutSelect) : _createVNode(ShortcutPanel, {
      "locale": locale,
      "onSelect": shortcutSelect
    }, null)), startDate && !props.displayMode && _createVNode(ConfirmPanel, {
      "type": type,
      "locale": locale,
      "startDateTime": startDate,
      "endDateTime": endDate,
      "onConfirm": onConfirm,
      "disableBtn": disConfirmBtn,
      "formatStr": pickTime ? locale.dateTimeFormat : locale.dateFormat
    }, null)])]);
  };

  var selectDate = function selectDate(date) {
    var useDateTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var oldState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!date) {
      return {};
    }

    var newState = {};
    var type = props.type,
        pickTime = props.pickTime,
        defaultTimeValue = props.defaultTimeValue,
        _props$locale2 = props.locale,
        locale = _props$locale2 === void 0 ? {} : _props$locale2;
    var newDate = pickTime && !useDateTime ? mergeDateTime(date, defaultTimeValue) : date;
    var startDate = oldState.startDate,
        endDate = oldState.endDate;

    switch (type) {
      case 'one':
        newState = _objectSpread(_objectSpread({}, newState), {}, {
          startDate: newDate,
          disConfirmBtn: false
        });

        if (pickTime) {
          newState = _objectSpread(_objectSpread({}, newState), {}, {
            timePickerTitle: locale.selectTime,
            showTimePicker: true
          });
        }

        break;

      case 'range':
        if (!startDate || endDate) {
          newState = _objectSpread(_objectSpread({}, newState), {}, {
            startDate: newDate,
            endDate: undefined,
            disConfirmBtn: true
          });

          if (pickTime) {
            newState = _objectSpread(_objectSpread({}, newState), {}, {
              timePickerTitle: locale.selectStartTime,
              showTimePicker: true
            });
          }
        } else {
          newState = _objectSpread(_objectSpread({}, newState), {}, {
            timePickerTitle: +newDate >= +startDate ? locale.selectEndTime : locale.selectStartTime,
            disConfirmBtn: false,
            endDate: pickTime && !useDateTime && +newDate >= +startDate ? new Date(+mergeDateTime(newDate, startDate) + 3600000) : newDate
          });
        }

        break;
    }

    return newState;
  };

  var setState = function setState(newState) {
    Object.keys(newState).forEach(function (key) {
      state[key] = newState[key];
    });
  };

  var shortcutSelect = function shortcutSelect(startDate, endDate) {
    var newState = _objectSpread(_objectSpread({
      startDate: startDate
    }, selectDate(endDate, true, {
      startDate: startDate
    })), {}, {
      showTimePicker: false
    });

    setState(newState);
  };

  watch(function () {
    return state;
  }, function (value) {
    currentValue.value[0] = value.startDate;
    currentValue.value[1] = value.endDate;
  }, {
    deep: true
  });
  watch(function () {
    return props.defaultValue;
  }, function () {
    if (props.visible && props.defaultValue) {
      shortcutSelect(props.defaultValue[0], props.defaultValue[1]);
    }
  });

  if (props.defaultValue) {
    var defaultValue = props.defaultValue;

    var newState = _objectSpread(_objectSpread({}, state), selectDate(defaultValue[1], true, {
      startDate: defaultValue[0]
    }));

    setState(newState);
  }

  return {
    state: state,
    shortcutSelect: shortcutSelect,
    onClose: onClose,
    renderCalendar: renderCalendar
  };
};