import MModal from './src';
import './style';

MModal.install = function (Vue) {
  Vue.component('MModal', MModal);
};

export default MModal;