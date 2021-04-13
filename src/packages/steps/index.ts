import {App} from 'vue';
import Steps from './src';
import Step from './src/step';
import './style';

Steps.Step = Step;

Steps.install = (app: App) => {
  app.component('MSteps', Steps);
  app.component('MStep', Step);
};

export default Steps;
