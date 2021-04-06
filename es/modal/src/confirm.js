import alert from './alert';
export default function confirm(title, message) {
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [{
    text: '取消'
  }, {
    text: '确定'
  }];
  var platform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ios';
  return alert(title, message, actions, platform);
}