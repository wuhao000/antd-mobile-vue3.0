import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { inject, onBeforeMount, reactive, ref, watch } from 'vue';
import { SelectType } from './data-types';
import { formatDate, genWeekData, getDateWithoutTime, getMonthDate } from './util';

function monthsBetween(minDate, maxDate) {
  return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + maxDate.getMonth() - minDate.getMonth();
}

export var useDatePickerBase = function useDatePickerBase(props, _ref, _ref2) {
  var emit = _ref.emit;
  var genMonthComponent = _ref2.genMonthComponent;
  var currentValue = inject('currentValue');
  var visibleMonth = ref([]);
  var updateFlag = ref(0);
  var state = reactive({
    months: []
  });

  var getBegin = function getBegin() {
    if (props.startDate) {
      return props.startDate;
    } else {
      var min = props.minDate || props.defaultValue;
      var max = props.maxDate || props.defaultValue;

      if (monthsBetween(min, max) < 6) {
        return props.minDate;
      } else {
        var date = new Date(max.getTime());
        date.setMonth(date.getMonth() - 6);
        return date;
      }
    }
  };

  onBeforeMount(function () {
    var _props$initialMonths = props.initialMonths,
        initialMonths = _props$initialMonths === void 0 ? 6 : _props$initialMonths;
    var begin = getBegin();

    for (var i = 0; i < initialMonths; i++) {
      canLoadNext() && genMonthData(begin, i);
    }

    visibleMonth.value = _toConsumableArray(state.months);
  });

  var canLoadPrev = function canLoadPrev() {
    var minDate = props.minDate;
    return !minDate || state.months.length <= 0 || +getMonthDate(minDate).firstDate < +state.months[0].firstDate;
  };

  var canLoadNext = function canLoadNext() {
    var maxDate = props.maxDate;
    return !maxDate || state.months.length <= 0 || +getMonthDate(maxDate).firstDate > +state.months[state.months.length - 1].firstDate;
  };

  var genMonthData = function genMonthData(date) {
    var addMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var copyDate = date;

    if (!copyDate) {
      copyDate = addMonth >= 0 ? state.months[state.months.length - 1].firstDate : state.months[0].firstDate;
    }

    if (!copyDate) {
      copyDate = new Date();
    }

    var locale = props.locale;

    var _getMonthDate = getMonthDate(copyDate, addMonth),
        firstDate = _getMonthDate.firstDate,
        lastDate = _getMonthDate.lastDate;

    var weeks = genWeekData(firstDate, props.minDate, props.maxDate);
    var title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', props.locale);
    var data = {
      title: title,
      firstDate: firstDate,
      lastDate: lastDate,
      weeks: weeks
    };
    data.component = genMonthComponent(data);

    if (addMonth >= 0) {
      state.months.push(data);
    } else {
      state.months.unshift(data);
    }

    var startDate = props.startDate,
        endDate = props.endDate;

    if (startDate) {
      selectDateRange(startDate, endDate);
    }

    return data;
  };

  var inDate = function inDate(date, tick) {
    return date <= tick && tick < date + 24 * 3600000;
  };

  var selectDateRange = function selectDateRange(startDate, endDate) {
    var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var getDateExtra = props.getDateExtra,
        type = props.type,
        onSelectHasDisableDate = props.onSelectHasDisableDate;
    var copyEndDate = endDate;

    if (type === 'one') {
      copyEndDate = undefined;
    }

    var time1 = getDateWithoutTime(startDate);
    var time2 = getDateWithoutTime(copyEndDate);
    var startDateTick = !time2 || time1 < time2 ? time1 : time2;
    var endDateTick = time2 && time1 > time2 ? time1 : time2;
    var startMonthDate = getMonthDate(new Date(startDateTick)).firstDate;
    var endMonthDate = endDateTick ? new Date(endDateTick) : getMonthDate(new Date(startDateTick)).lastDate;
    var unuseable = [];
    var needUpdate = false;
    state.months.filter(function (m) {
      return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
    }).forEach(function (m) {
      m.weeks.forEach(function (w) {
        return w.filter(function (d) {
          if (!endDateTick) {
            return d.tick && inDate(startDateTick, d.tick);
          } else {
            return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
          }
        }).forEach(function (d) {
          var oldValue = d.selected;

          if (clear) {
            d.selected = SelectType.None;
          } else {
            var info = getDateExtra && getDateExtra(new Date(d.tick), _toConsumableArray(currentValue.value)) || {};

            if (d.outOfDate || info.disable) {
              unuseable.push(d.tick);
            }

            if (inDate(startDateTick, d.tick)) {
              if (type === 'one') {
                d.selected = SelectType.Single;
              } else if (!endDateTick) {
                d.selected = SelectType.Only;
              } else if (startDateTick !== endDateTick) {
                d.selected = SelectType.Start;
              } else {
                d.selected = SelectType.All;
              }
            } else if (inDate(endDateTick, d.tick)) {
              d.selected = SelectType.End;
            } else {
              d.selected = SelectType.Middle;
            }
          }

          needUpdate = needUpdate || d.selected !== oldValue;
        });
      });

      if (needUpdate && m.componentRef) {
        m.componentRef.updateWeeks();
      }
    });

    if (unuseable.length > 0) {
      if (onSelectHasDisableDate) {
        onSelectHasDisableDate(unuseable.map(function (tick) {
          return new Date(tick);
        }));
      } else {
        console.warn('Unusable date. You can handle by onSelectHasDisableDate.', unuseable);
      }
    }
  };

  var computeVisible = function computeVisible(clientHeight, scrollTop) {
    var needUpdate = false;
    var MAX_VIEW_PORT = clientHeight * 2;
    var MIN_VIEW_PORT = clientHeight; // 大缓冲区外过滤规则

    var filterFunc = function filterFunc(vm) {
      return vm.y && vm.height && vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT;
    };

    if (props.infiniteOpt && visibleMonth.value.length > 12) {
      visibleMonth.value = visibleMonth.value.filter(filterFunc).sort(function (a, b) {
        return +a.firstDate - +b.firstDate;
      });
    } // 当小缓冲区不满时填充


    if (visibleMonth.value.length > 0) {
      var last = visibleMonth.value[visibleMonth.value.length - 1];

      if (last.y !== undefined && last.height && last.y + last.height < scrollTop + clientHeight + MIN_VIEW_PORT) {
        var lastIndex = state.months.indexOf(last);

        for (var i = 1; i <= 2; i++) {
          var index = lastIndex + i;

          if (index < state.months.length && visibleMonth.value.indexOf(state.months[index]) < 0) {
            visibleMonth.value.push(state.months[index]);
          } else {
            canLoadNext() && genMonthData(undefined, 1);
          }
        }

        needUpdate = true;
      }

      var first = visibleMonth.value[0];

      if (first.y !== undefined && first.height && first.y > scrollTop - MIN_VIEW_PORT) {
        var firstIndex = state.months.indexOf(first);

        for (var _i = 1; _i <= 2; _i++) {
          var _index = firstIndex - _i;

          if (_index >= 0 && visibleMonth.value.indexOf(state.months[_index]) < 0) {
            visibleMonth.value.unshift(state.months[_index]);
            needUpdate = true;
          }
        }
      }
    } else if (state.months.length > 0) {
      visibleMonth.value = state.months.filter(filterFunc);
      needUpdate = true;
    }

    return needUpdate;
  };

  var createOnScroll = function createOnScroll() {
    var timer;
    var clientHeight = 0;
    var scrollTop = 0;
    return function (data) {
      var client = data.client,
          top = data.top;
      clientHeight = client;
      scrollTop = top;

      if (timer) {
        return;
      }

      timer = setTimeout(function () {
        timer = undefined;

        if (computeVisible(clientHeight, scrollTop)) {
          updateFlag.value++;
        }
      }, 64);
    };
  };

  var onCellClick = function onCellClick(day) {
    if (!day.tick) {
      return;
    }

    emit('cellClick', new Date(day.tick));
  };

  watch(function () {
    return {
      startDate: props.startDate,
      endDate: props.endDate
    };
  }, function (newValue, oldValue) {
    if (oldValue.startDate) {
      selectDateRange(oldValue.startDate, oldValue.endDate, true);
    }

    if (newValue.startDate) {
      selectDateRange(newValue.startDate, newValue.endDate);
    }
  });
  return {
    onCellClick: onCellClick,
    createOnScroll: createOnScroll,
    visibleMonth: visibleMonth,
    updateFlag: updateFlag,
    genMonthData: genMonthData,
    state: state,
    canLoadPrev: canLoadPrev
  };
};