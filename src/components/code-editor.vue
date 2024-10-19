<template>
  <div>
    <textarea
      ref="elRef"
      :style="textAreaStyle"
      :value="value" />
  </div>
</template>
<script lang="ts">
import CodeMirror, { EditorConfiguration } from 'codemirror';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import { defineComponent, nextTick, onMounted, Prop, ref, shallowRef, watch } from 'vue';
import beautify from '../utils/beautify';

const types = {
  freemarker: 'freemarkermixed',
  html: 'text/html',
  javascript: 'text/javascript',
  typescript: 'text/typescript',
  json: 'application/ld+json',
  kotlin: 'text/x-kotlin',
  nginx: 'text/x-nginx-conf',
  powershell: 'application/x-powershell',
  python: 'text/x-python',
  shell: 'application/x-sh',
  yaml: 'text/x-yaml',
  vue: 'text/x-vue'
};

export default defineComponent({
  name: 'CodeEditor',
  props: {
    beautify: { type: Boolean, default: false },
    config: {
      type: Object
    } as Prop<EditorConfiguration>,
    /**
     * 编辑区高度
     */
    height: String,
    /**
     * 代码类型（同codemirror的mode）
     * 'json' | 'shell' | 'powershell' | 'python' | 'javascript' | 'kotlin' | 'html' | 'nginx' | string
     */
    mode: String,
    /**
     * 主题
     */
    theme: { type: String, default: 'blackboard' },
    /**
     * 编辑的内容，支持v-model
     */
    value: String,
    /**
     * 编辑区域宽度，默认自动
     */
    width: String
  },
  emits: ['update:value'],
  setup(props) {
    const changed = ref(false);
    /*
     * 如果这里使用了ref，将导致代码提示框无法正常关闭
     * 在show-hint.js的第90行，this.cm.state.completionActive == this;
     * 在使用ref的情况下，this.cm.state.completionActive将是一个代理对象，导致这个判断永远为false，
     */
    const viewer = shallowRef<CodeMirror.EditorFromTextArea>(null);
    watch(
      () => props.theme,
      value => {
        if (viewer.value) {
          viewer.value.setOption('theme', value);
        }
      }
    );
    watch(
      () => props.value,
      (value, old) => {
        if (viewer.value) {
          const currentValue = viewer.value.getValue();
          if (currentValue !== value) {
            viewer.value.setValue(value);
          }
        }
        if (old && value !== old) {
          changed.value = true;
        }
      },
      { immediate: true }
    );
    const elRef = ref(null);
    const create = () => {
      let config = {
        size: [props.width || 'auto', props.height || 'auto']
      };
      if (props.config) {
        config = Object.assign({}, config, props.config);
      }
      let text = props.value || '';
      if (props.beautify) {
        text = beautify(text, { format: props.mode || 'json' });
      }
      const getRealMode = () => types[props.mode] || props.mode || 'application/ld+json';
      const defaultConfig: EditorConfiguration = {
        extraKeys: { Alt: 'autocomplete' },
        foldGutter: true,
        indentWithTabs: false,
        lineNumbers: true,
        lineWrapping: false,
        mode: {
          globalVars: true,
          name: getRealMode()
        },
        readOnly: true,
        tabSize: 2,
        theme: props.theme,
        value: text
      };
      viewer.value = CodeMirror.fromTextArea(
        elRef.value as HTMLTextAreaElement,
        Object.assign(defaultConfig, config)
      );
      if (config.size) {
        viewer.value.setSize(config.size[0], config.size[1]);
      }
    };
    onMounted(() => {
      create();
    });
    const refresh = () => {
      nextTick().then(() => {
        viewer.value.refresh();
      });
    };
    return {
      elRef,
      refresh,
      textAreaStyle: {
        display: 'none'
      }
    };
  }
});
</script>
<style lang="less" scoped>
.CodeMirror pre.CodeMirror-line {
  font-size: 16px;
  line-height: 26px;
}

.cm-s-idea {
  span {
    &.cm-property,
    &.cm-variable {
      color: #660e7a;
    }

    &.cm-keyword {
      color: #0033b3;
      font-weight: normal;
    }

    &.cm-comment {
      color: #8c8c8c;
    }

    &.cm-number {
      color: #1750eb;
    }

    &.cm-string-2 {
      color: #264eff;
    }

    &.cm-string {
      color: #067d17;
    }
  }
}

.CodeMirror-scroll {
  min-height: 100px;
  max-width: 100%;
}

.CodeMirror-hint {
  font-size: 16px;
  font-weight: bold;
  line-height: 28px;
}
</style>
