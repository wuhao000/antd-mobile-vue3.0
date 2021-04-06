import Steps from './src';
import Step from './src/step';
import './style';
var Plugin = Steps;
Steps.Step = Step;

Plugin.install = function (Vue) {
  Vue.component('MSteps', Steps);
  Vue.component('MStep', Step);
};

export default Plugin;