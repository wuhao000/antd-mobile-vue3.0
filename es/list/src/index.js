import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import { createVNode as _createVNode } from "vue";
import classNames from 'classnames';
import { defineComponent, ref } from 'vue';
import Item from './item';
export default defineComponent({
  Item: Item,
  install: null,
  inheritAttrs: false,
  name: 'MList',
  props: {
    section: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      default: 'am-list'
    },
    role: {
      type: String
    },
    title: {
      type: [String, Object]
    },
    spaceBetweenSection: {
      type: Number,
      default: 8
    },
    touchFeedback: {
      type: Boolean,
      default: true
    },
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  provide: function provide() {
    return {
      list: this
    };
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var fields = ref([]);

    var clearValidate = function clearValidate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var localFields = props.length ? typeof props === 'string' ? fields.value.filter(function (field) {
        return props === field.prop;
      }) : fields.value.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : fields.value;
      localFields.forEach(function (field) {
        field.clearValidate();
      });
    };

    var resetFields = function resetFields() {
      if (!props.model) {
        console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }

      fields.value.forEach(function (field) {
        field.resetField();
      });
    };

    var validate = function validate(callback) {
      if (!props.model) {
        return;
      }

      var promise;
      var copyCallback = callback; // if no callback, return promise

      if (typeof copyCallback !== 'function' && Promise) {
        promise = new Promise(function (resolve, reject) {
          copyCallback = function copyCallback(valid) {
            var errorField = fields.value.find(function (it) {
              return it.validateStatus === 'error';
            });

            if (errorField) {
              errorField.focus();
            }

            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      var valid = true;
      var count = 0; // 如果需要验证的fields为空，调用验证时立刻返回callback

      if (fields.value.length === 0 && copyCallback) {
        copyCallback(true);
      }

      var invalidFields = {};
      fields.value.forEach(function (field) {
        field.validate('', function (message, field) {
          if (message) {
            valid = false;
          }

          invalidFields = _extends({}, invalidFields, field);

          if (typeof copyCallback === 'function' && ++count === fields.value.length) {
            copyCallback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    };

    var validateField = function validateField(props, cb) {
      var copyProps = [].concat(props);
      var localFields = fields.value.filter(function (field) {
        return copyProps.indexOf(field.prop) !== -1;
      });

      if (!localFields.length) {
        console.warn('[Element Warn]please pass correct props!');
        return;
      }

      localFields.forEach(function (field) {
        field.validate('', cb);
      });
    };

    return {
      fields: fields,
      clearValidate: clearValidate,
      resetFields: resetFields,
      validate: validate,
      validateField: validateField
    };
  },
  render: function render() {
    var _this = this,
        _this$$slots$title,
        _this$$slots$title2,
        _this$$slots;

    var prefixCls = this.prefixCls;
    var wrapCls = classNames(prefixCls, _defineProperty({}, prefixCls + '-section', this.section));
    var children = [];

    if (this.$slots.default) {
      this.$slots.default().forEach(function (it, index) {
        if (index < _this.$slots.default().length - 1) {
          if (_this.section && it.props) {
            if (it.props.style) {
              it.props.style.marginBottom = "".concat(_this.spaceBetweenSection, "px");
            } else {
              it.props.style = {
                marginBottom: "".concat(_this.spaceBetweenSection, "px")
              };
            }
          }
        }

        children.push(it);
      });
    }

    return _createVNode("div", {
      "class": wrapCls
    }, [this.$slots.title || this.title ? _createVNode("div", {
      "class": classNames("".concat(prefixCls, "-header"), _defineProperty({}, "".concat(prefixCls, "-required"), this.required))
    }, [(_this$$slots$title = (_this$$slots$title2 = (_this$$slots = this.$slots).title) === null || _this$$slots$title2 === void 0 ? void 0 : _this$$slots$title2.call(_this$$slots)) !== null && _this$$slots$title !== void 0 ? _this$$slots$title : this.title]) : '', children.length ? _createVNode("div", {
      "class": "".concat(prefixCls, "-body")
    }, [children]) : null, this.$slots.footer ? this.$slots.footer() : null]);
  }
});