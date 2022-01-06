import {defineComponent, reactive, ref, Ref} from 'vue';
import {List} from '../../index';
import './index1.less';

const options = [{
  label: '选项1', value: 1
}, {
  label: '选项2', value: 2
}, {
  label: '选项3', value: 3
}];

export default defineComponent({
  name: 'ListExample',
  setup(props, {emit, slots}) {
    const state = reactive({
      disabled: false,
      slider: 5,
      switch: false,
      range: [0, 100],
      readonly: false,
      error: false,
      errorMessage: '出错了',
      errorDisplayType: 'toast'
    });
    const disabled: Ref<boolean> = ref(false);


    const onClick = () => {
      console.log('item clicked');
    };


    return {
      state,
      disabled,
      onClick
    };
  },
  render() {
    return (<div>
      <List title="状态控制"
            layout={'vertical'}>
        <m-switch-item title="禁用" v-model={this.state.disabled}/>
        <m-switch-item title="只读" v-model={this.state.readonly}/>
        <m-switch-item title="错误状态" v-model={this.state.error}/>
      </List>
      <List title="表单"
            layout={'vertical'}
            disabled={this.state.disabled}
            editable={!this.state.readonly}>
        <m-input required={true}
                 placeholder={'请输入'}
                 title="输入框"
                 error={this.state.error}
                 errorDisplayType={this.state.errorDisplayType}
                 errorMessage={'不少于20个字符'}/>
        <m-textarea required={true} title="长文本"
                    error={this.state.error}
                    placeholder={'请输入'}
                    errorDisplayType={this.state.errorDisplayType}
                    errorMessage={this.state.errorMessage}/>
        <m-textarea required={true} title="长文本"
                    value="这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字，这是一大段文字, 这是结束的地方"
                    error={this.state.error}
                    errorDisplayType={this.state.errorDisplayType}
                    errorMessage={this.state.errorMessage}/>
        <m-input title="数字"
                 type="number" error={this.state.error} errorDisplayType={this.state.errorDisplayType}
                 errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required={true} title="日期时间选择" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required={true} title="日期选择" mode="date" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required={true} title="年份选择" mode="year" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required={true} title="月份选择" mode="month" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-date-picker-item required={true} title="时间选择" mode="time" value={new Date()} error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType} errorMessage={this.state.errorMessage}/>
        <m-calendar-item required={true} title="日期范围"
                         error={this.state.error}
                         errorDisplayType={this.state.errorDisplayType}
                         errorMessage={this.state.errorMessage}
                         value={[new Date(), new Date()]}/>
        <m-range-item title="范围选择"
                      value={this.state.range}
                      error={this.state.error}
                      errorDisplayType={this.state.errorDisplayType}
                      errorMessage={this.state.errorMessage}/>
        <m-radio-popup-list required={true} title="弹出单选"
                            value={1}
                            options={options}
                            error={this.state.error}
                            errorDisplayType={this.state.errorDisplayType}
                            errorMessage={this.state.errorMessage}/>
        <m-checkbox-popup-list required={true} title="弹出多选" options={options}
                               error={this.state.error}
                               value={[1, 2]}
                               errorDisplayType={this.state.errorDisplayType}
                               errorMessage={this.state.errorMessage}/>
        <m-switch-item title="开关"
                       v-model={this.state.switch}
                       error={this.state.error}
                       errorDisplayType={this.state.errorDisplayType}
                       errorMessage={this.state.errorMessage}/>
        <m-slider-item title="滑动输入条" v-model={this.state.slider}
                       error={this.state.error}
                       errorDisplayType={this.state.errorDisplayType}
                       errorMessage={this.state.errorMessage}/>
        <m-radio-list required={true}
                      title="单选"
                      options={options}
                      error={this.state.error}
                      errorDisplayType={this.state.errorDisplayType}
                      errorMessage={this.state.errorMessage}/>
        <m-checkbox-list
          required={true}
          title="多选"
          options={options}
          error={this.state.error}
          errorDisplayType={this.state.errorDisplayType}
          errorMessage={this.state.errorMessage}/>
      </List>
    </div>);
  }
});
