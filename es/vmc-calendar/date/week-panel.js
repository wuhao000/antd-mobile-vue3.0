import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'WeekPanel',
  props: {
    locale: {
      type: Object
    }
  },
  setup: function setup(props) {
    return {};
  },
  render: function render() {
    var locale = this.locale;
    var week = locale.week;
    return _createVNode("div", {
      "class": "week-panel"
    }, [_createVNode("div", {
      "class": "cell cell-grey"
    }, [week[0]]), _createVNode("div", {
      "class": "cell"
    }, [week[1]]), _createVNode("div", {
      "class": "cell"
    }, [week[2]]), _createVNode("div", {
      "class": "cell"
    }, [week[3]]), _createVNode("div", {
      "class": "cell"
    }, [week[4]]), _createVNode("div", {
      "class": "cell"
    }, [week[5]]), _createVNode("div", {
      "class": "cell cell-grey"
    }, [week[6]])]);
  }
});