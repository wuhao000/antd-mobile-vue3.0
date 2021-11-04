import {defineComponent, reactive} from 'vue';
import {ImagePicker, SegmentedControl, WingBlank} from '../../index';
import Toast from '../../toast';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121'
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122'
}];

export default defineComponent({
  name: 'ImagePickerExample',
  setup(props, {emit, slots}) {
    const state = reactive({
      files: data,
      multiple: false
    });


    const onChange = (files, type, index) => {
      state.files = files;
    };
    const onSegChange = (index) => {
      state.multiple = index === 1;
    };


    return {
      state,
      onChange,
      onSegChange
    };
  },
  render() {
    const {files} = this.state;
    return (
        <WingBlank>
          <SegmentedControl
              values={['切换到单选', '切换到多选']}
              value={this.state.multiple ? 1 : 0}
              onChange={this.onSegChange}
          />
          <ImagePicker
              value={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              onFail={(msg) => {
                Toast.fail(msg);
              }}
              multiple={this.state.multiple}
          />
        </WingBlank>
    );
  }
});
