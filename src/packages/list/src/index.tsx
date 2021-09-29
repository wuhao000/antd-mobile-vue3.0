import classNames from 'classnames';
import {defineComponent, PropType, Ref, ref, VNode} from 'vue';
import {filterHTMLAttrs} from '../../utils/dom';

export default defineComponent({
  install: null,
  inheritAttrs: false,
  name: 'MList',
  props: {
    section: {type: Boolean, default: false},
    sectionSize: {type: String, default: 'default'},
    prefixCls: {default: 'am-list'},
    role: {type: String},
    title: {type: [String, Object] as PropType<string | VNode>},
    spaceBetweenSection: {type: Number, default: 8},
    touchFeedback: {type: Boolean, default: true},
    model: {type: Object},
    rules: {type: Object},
    disabled: {type: Boolean, default: false},
    editable: {type: Boolean, default: true},
    required: {type: Boolean, default: false}
  },
  provide() {
    return {
      list: this
    };
  },
  setup(props, {emit, slots}) {
    const fields: Ref<any[]> = ref([]);
    const clearValidate = (props = []) => {
      const localFields = props.length
          ? (typeof props === 'string'
                  ? fields.value.filter(field => props === (field as any).prop)
                  : fields.value.filter(field => props.indexOf((field as any).prop) > -1)
          ) : fields.value;
      localFields.forEach(field => {
        (field as any).clearValidate();
      });
    };
    const resetFields = () => {
      if (!props.model) {
        console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }
      fields.value.forEach(field => {
        (field as any).resetField();
      });
    };
    const validate = callback => {
      if (!props.model) {
        return;
      }
      let promise;
      let copyCallback = callback;
      // if no callback, return promise
      if (typeof copyCallback !== 'function' && Promise) {
        promise = new Promise((resolve, reject) => {
          copyCallback = valid => {
            const errorField = fields.value.find(it => it.validateStatus === 'error');
            if (errorField) {
              errorField.focus();
            }
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (fields.value.length === 0 && copyCallback) {
        copyCallback(true);
      }
      let invalidFields = {};
      fields.value.forEach(field => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = Object.assign({}, invalidFields, field);
          if (typeof copyCallback === 'function' && ++count === fields.value.length) {
            copyCallback(valid, invalidFields);
          }
        });
      });
      if (promise) {
        return promise;
      }
    };
    const validateField = (props, cb) => {
      const copyProps = [].concat(props);
      const localFields = fields.value.filter(field => copyProps.indexOf((field as any).prop) !== -1);
      if (!localFields.length) {
        console.warn('[Element Warn]please pass correct props!');
        return;
      }
      localFields.forEach(field => {
        (field as any).validate('', cb);
      });
    };
    return {
      fields,
      clearValidate,
      resetFields,
      validate,
      validateField
    };
  },
  render() {
    const {prefixCls} = this;
    const wrapCls = classNames(prefixCls, {
      [prefixCls + '-section']: this.section,
      [`${prefixCls}-section-${this.sectionSize}`]: this.section
    }, this.$attrs.class);
    return (
        <div {...filterHTMLAttrs(this.$attrs)}
             class={wrapCls}>
          {this.$slots.title || this.title ? <div class={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-required`]: this.required
          })}>
            {this.$slots.title?.() ?? this.title}
          </div> : ''}
          {this.$slots.default ? (
              <div class={`${prefixCls}-body`}>{this.$slots.default()}</div>
          ) : null}
          {this.$slots.footer?.()}
        </div>
    );
  }
});
