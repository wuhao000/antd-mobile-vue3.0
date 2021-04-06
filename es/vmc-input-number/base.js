import { onBeforeUnmount, reactive, ref, watch } from 'vue';

function defaultParser(input) {
  if (typeof input === 'number') {
    return input;
  }

  return input.replace(/[^\w.-]+/g, '');
}
/**
 * When click and hold on a button - the speed of auto changin the value.
 */


var SPEED = 200;
/**
 * When click and hold on a button - the delay before auto changin the value.
 */

var DELAY = 600;
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
export var baseComponentProps = {
  step: {
    type: [String, Number]
  },
  parser: {
    type: Function,
    default: defaultParser
  },
  value: {
    type: Number
  },
  defaultValue: {
    type: Number
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  precision: {
    type: Number
  }
};
export var useBaseComponent = function useBaseComponent(props, _ref) {
  var emit = _ref.emit;
  var autoStepTimer = ref(null);
  var state = reactive({
    inputValue: null,
    focused: props.autoFocus
  });
  watch(function () {
    return props.value;
  }, function (value) {
    var v = value !== undefined ? toNumber(value) : props.defaultValue;
    state.inputValue = toPrecisionAsStep(v);
  });
  watch(function () {
    return state.inputValue;
  }, function (v) {
    emit('update:value', v);
  });

  var onChange = function onChange(e) {
    var parser = props.parser;
    var input = typeof e === 'number' ? e : parser && parser(e.target.value);
    state.inputValue = parseFloat(input);
    emit('change', toNumberWhenUserInput(input));
  };

  var onFocus = function onFocus() {
    state.focused = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    emit.apply(void 0, ['focus'].concat(args));
  };

  var onBlur = function onBlur(e) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    state.focused = false;
    var value = getCurrentValidValue(state.inputValue);

    if (e.persist) {
      e.persist(); // fix https://github.com/react-component/input-number/issues/51
    }

    setValue(value, function () {
      emit.apply(void 0, ['blur', e].concat(args));
    });
  };

  var getCurrentValidValue = function getCurrentValidValue(value) {
    var val = value;

    if (val === '') {
      val = '';
    } else if (!isNotCompleteNumber(val)) {
      val = getValidValue(val);
    } else {
      val = state.inputValue;
    }

    return toNumber(val);
  };

  var getValidValue = function getValidValue(value) {
    var val = parseFloat(value.toString());

    if (isNaN(val)) {
      return value;
    }

    if (val < props.min) {
      val = props.min;
    }

    if (val > props.max) {
      val = props.max;
    }

    return val;
  };

  var setValue = function setValue(v, callback) {
    // trigger onChange
    var newValue = isNotCompleteNumber(parseFloat(v)) ? undefined : parseFloat(v);
    var changed = newValue !== state.inputValue || "".concat(newValue) !== "".concat(state.inputValue); // https://github.com/ant-design/ant-design/issues/7363

    if (props.value === undefined) {
      state.inputValue = toPrecisionAsStep(v);
      callback && callback();
    } else {
      // always set input value same as value
      state.inputValue = toPrecisionAsStep(v);
      callback && callback();
    }

    if (changed) {
      emit('change', newValue);
    }
  };

  var getPrecision = function getPrecision(value) {
    if (props.precision) {
      return props.precision;
    }

    var valueString = value.toString();

    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }

    var precision = 0;

    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }

    return precision;
  };

  var getMaxPrecision = function getMaxPrecision(currentValue) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (props.precision) {
      return props.precision;
    }

    var step = props.step;
    var ratioPrecision = getPrecision(ratio);
    var stepPrecision = getPrecision(step);
    var currentValuePrecision = getPrecision(currentValue);

    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }

    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  };

  var getPrecisionFactor = function getPrecisionFactor(currentValue) {
    var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var precision = getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  };

  var toPrecisionAsStep = function toPrecisionAsStep(num) {
    if (isNotCompleteNumber(num)) {
      return num;
    }

    var precision = Math.abs(getMaxPrecision(num));

    if (!isNaN(precision)) {
      return parseFloat(Number(num).toFixed(precision));
    }

    return num;
  };

  var isNotCompleteNumber = function isNotCompleteNumber(num) {
    return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
  };

  var toNumber = function toNumber(num) {
    if (isNotCompleteNumber(num)) {
      return num;
    }

    if (props.precision) {
      return Number(Number(num).toFixed(props.precision));
    }

    return Number(num);
  };

  var toNumberWhenUserInput = function toNumberWhenUserInput(num) {
    // num.length > 16 => prevent input large number will became Infinity
    if ((/\.\d*0$/.test(num) || num.length > 16) && state.focused) {
      return num;
    }

    return toNumber(num);
  };

  var stepCompute = function stepCompute(type, val, rat) {
    var step = props.step,
        min = props.min;
    var precisionFactor = getPrecisionFactor(val, rat);
    var precision = Math.abs(getMaxPrecision(val, rat));
    var result;
    var direct = type === 'up' ? 1 : -1;

    if (typeof val === 'number') {
      result = ((precisionFactor * val + direct * precisionFactor * +step * rat) / precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? direct * +step : min;
    }

    return toNumber(result);
  };

  var stepTo = function stepTo(type, e) {
    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (e) {
      e.preventDefault();
    }

    if (props.disabled) {
      return false;
    }

    var value = getCurrentValidValue(state.inputValue) || 0;

    if (isNotCompleteNumber(value)) {
      return false;
    }

    var val = stepCompute(type, value, ratio);
    var outOfRange = val > props.max || val < props.min;

    if (val > props.max) {
      val = props.max;
    } else if (val < props.min) {
      val = props.min;
    }

    setValue(val);
    state.focused = true;
    return !outOfRange;
  };

  var stop = function stop() {
    if (autoStepTimer.value) {
      clearTimeout(autoStepTimer.value);
    }
  };

  var action = function action(type, e, ratio, recursive) {
    if (e.persist) {
      e.persist();
    }

    stop();

    if (stepTo(type, e, ratio)) {
      autoStepTimer.value = setTimeout(function () {
        action(type, e, ratio, true);
      }, recursive ? SPEED : DELAY);
    }
  };

  var down = function down(e, ratio, recursive) {
    action('down', e, ratio, recursive);
  };

  var up = function up(e, ratio, recursive) {
    action('up', e, ratio, recursive);
  };

  {
    var value = props.value !== undefined ? toNumber(props.value) : props.defaultValue;
    state.inputValue = toPrecisionAsStep(value);
    watch(function () {
      return props.value;
    }, function () {
      state.inputValue = state.focused ? props.value : getValidValue(props.value);
    });
  }
  onBeforeUnmount(function () {
    stop();
  });
  return {
    state: state,
    stop: stop,
    up: up,
    down: down,
    toPrecisionAsStep: toPrecisionAsStep,
    onFocus: onFocus,
    onBlur: onBlur,
    onChange: onChange
  };
};