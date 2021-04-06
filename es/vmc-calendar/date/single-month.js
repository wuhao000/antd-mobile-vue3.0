import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { createVNode as _createVNode } from "vue";
import { defineComponent, inject, onMounted, reactive, watch } from 'vue';
import { SelectType } from '../data-types';
var SingleMonth = defineComponent({
  name: 'SingleMonth',
  props: {
    displayMode: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object
    },
    monthData: {
      type: Object
    },
    rowSize: {
      type: String,
      default: 'normal'
    },
    getDateExtra: {
      type: Function
    },
    callback: {
      type: Function
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var currentValue = inject('currentValue');
    var state = reactive({
      monthData: props.monthData
    });

    var genWeek = function genWeek(weeksData, index) {
      var getDateExtra = props.getDateExtra,
          displayMode = props.displayMode,
          monthData = props.monthData,
          locale = props.locale,
          rowSize = props.rowSize;
      var rowCls = 'row';

      if (rowSize === 'xl') {
        rowCls += ' row-xl';
      }

      return _createVNode("div", {
        "key": index,
        "class": rowCls
      }, [weeksData.map(function (day, dayOfWeek) {
        var extra = getDateExtra && getDateExtra(new Date(day.tick), _toConsumableArray(currentValue.value)) || {};
        var info = extra.info;
        var disable = extra.disable || day.outOfDate;
        var cls = 'date';
        var lCls = 'left';
        var rCls = 'right';
        var infoCls = 'info';

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          cls += ' grey';
        }

        if (disable) {
          cls += ' disable';
        } else if (info) {
          cls += ' important';
        }

        if (displayMode && extra.selected) {
          cls += ' date-selected selected-single';
        }

        if (day.selected) {
          cls += ' date-selected';
          var styleType = day.selected;

          switch (styleType) {
            case SelectType.Only:
              info = locale.begin;
              infoCls += ' date-selected';
              break;

            case SelectType.All:
              info = locale.begin_over;
              infoCls += ' date-selected';
              break;

            case SelectType.Start:
              info = locale.begin;
              infoCls += ' date-selected';

              if (dayOfWeek === 6 || day.isLastOfMonth) {
                styleType = SelectType.All;
              }

              break;

            case SelectType.Middle:
              if (dayOfWeek === 0 || day.isFirstOfMonth) {
                if (day.isLastOfMonth || dayOfWeek === 6) {
                  styleType = SelectType.All;
                } else {
                  styleType = SelectType.Start;
                }
              } else if (dayOfWeek === 6 || day.isLastOfMonth) {
                styleType = SelectType.End;
              }

              break;

            case SelectType.End:
              info = locale.over;
              infoCls += ' date-selected';

              if (dayOfWeek === 0 || day.isFirstOfMonth) {
                styleType = SelectType.All;
              }

              break;
          }

          switch (styleType) {
            case SelectType.Single:
            case SelectType.Only:
            case SelectType.All:
              cls += ' selected-single';
              break;

            case SelectType.Start:
              cls += ' selected-start';
              rCls += ' date-selected';
              break;

            case SelectType.Middle:
              cls += ' selected-middle';
              lCls += ' date-selected';
              rCls += ' date-selected';
              break;

            case SelectType.End:
              cls += ' selected-end';
              lCls += ' date-selected';
              break;
          }
        }

        var defaultContent = [_createVNode("div", {
          "key": "wrapper",
          "class": "date-wrapper"
        }, [_createVNode("span", {
          "class": lCls
        }, null), _createVNode("div", {
          "class": cls
        }, [day.dayOfMonth]), _createVNode("span", {
          "class": rCls
        }, null)]), _createVNode("div", {
          "key": "info",
          "class": infoCls
        }, [info])];
        return _createVNode("div", {
          "key": dayOfWeek,
          "class": "cell ".concat(extra.cellCls || ''),
          "onClick": function onClick() {
            if (!disable) {
              if (!displayMode) {
                emit('cellClick', day, monthData);
              }
            }
          }
        }, [extra.cellRender ? extra.cellRender(new Date(day.tick)) : defaultContent]);
      })]);
    };

    var updateWeeks = function updateWeeks(monthData) {
      state.monthData = monthData !== null && monthData !== void 0 ? monthData : props.monthData;
    };

    watch(function () {
      return props.monthData;
    }, function (data) {
      updateWeeks(data);
    });
    onMounted(function () {
      props.callback({
        updateWeeks: updateWeeks
      });
    });

    var renderWeeks = function renderWeeks() {
      return state.monthData.weeks.map(function (week, index) {
        return genWeek(week, index);
      });
    };

    return {
      state: state,
      renderWeeks: renderWeeks
    };
  },
  render: function render() {
    var title = this.monthData.title;
    var renderWeeks = this.renderWeeks;
    return _createVNode("div", {
      "class": "single-month"
    }, [_createVNode("div", {
      "class": "month-title"
    }, [title]), _createVNode("div", {
      "class": "date"
    }, [renderWeeks()])]);
  }
});
export default SingleMonth;