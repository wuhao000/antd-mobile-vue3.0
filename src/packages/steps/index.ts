import {App} from 'vue';
import Steps from './src';
import Step from './src/step';
import './style';

Steps.Step = Step;

Steps.install = (app: App) => {
  app.component(Steps.name, Steps);
  app.component(Step.name, Step);
};

export default Steps;
