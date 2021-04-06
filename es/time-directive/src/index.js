/**
 * Created by wuhao on 2016/11/22.
 */
var createContent = function createContent(el, binding, vnode) {
  var bindValue = binding.value;
  var text = '';
  var format = 'YYYY-MM-DD HH:mm:ss';
  var date;

  if (typeof bindValue === 'string') {
    var reg1 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

    if (reg1.test(bindValue)) {
      date = moment(bindValue, 'YYYY-MM-DDTHH:mm:ss.sZ').toDate();
      date.setHours(date.getHours() + 8);
    } else {
      text = bindValue;
    }
  } else {
    var value = binding.value;
    date = new Date(value);

    if (!value) {
      text = '';
    } else {
      var _vnode$props;

      text = moment(value).format(format);

      if ((_vnode$props = vnode.props) !== null && _vnode$props !== void 0 && _vnode$props.format) {
        text = moment(value).format(vnode.props.format);
      }
    }
  } // @ts-ignore


  if (binding.modifiers.pretty && date) {
    var now = new Date();
    var nowTime = now.getTime();
    var difference = nowTime - date.getTime();

    if (difference > 0) {
      if (difference < 1000) {
        text = '刚刚';
      } else if (difference < 60 * 1000) {
        text = "".concat(Math.floor(difference / 1000), "\u79D2\u524D");
      } else if (difference < 60 * 1000 * 60) {
        text = "".concat(Math.floor(difference / 1000 / 60), "\u5206\u949F\u524D");
      } else if (now.getFullYear() === date.getFullYear()) {
        if (now.getMonth() === date.getMonth() && now.getDay() === date.getDay()) {
          text = moment(date).format('HH:mm:ss');
        } else {
          text = moment(date).format('MM-DD HH:mm:ss');
        }
      }
    } else if (now.getFullYear() === date.getFullYear()) {
      if (now.getMonth() === date.getMonth() && now.getDay() === date.getDay()) {
        text = moment(date).format('HH:mm:ss');
      } else {
        text = moment(date).format('MM-DD HH:mm:ss');
      }
    }
  }

  el.innerHTML = text;
};

export default {
  created: function created(el, binding, vnode) {
    createContent(el, binding, vnode);
  },
  updated: function updated(el, binding, vnode) {
    createContent(el, binding, vnode);
  }
};