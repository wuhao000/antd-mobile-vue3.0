import {Dayjs} from 'dayjs';
import {defineComponent, reactive, ref} from 'vue';
import DatePicker from '../index';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}


function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = defineComponent({
  name: 'CustomChildren',
  props: {
    extra: {}
  },
  render() {
    return <div
        onClick={() => {
          this.$emit('click');
        }}
        style={{backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px'}}
    >
      {this.$slots.default?.()}
      <span style={{float: 'right', color: '#888'}}>{this.extra}</span>
    </div>;
  }
});

export default defineComponent({
  name: 'Demo',
  setup(props, {emit, slots}) {
    const state = reactive({
      empty: null,
      date: now,
      time: now,
      timestamp: Date.now(),
      utcDate: utcNow,
      dpValue: null,
      customChildValue: null,
      open: false
    });
    const minDate2 = ref(state.time);
    const maxDate2 = ref(new Date(2024, 7, 1));


    return {
      state,
      minDate2,
      maxDate2
    };
  },
  render() {
    return (
        <m-list class="date-picker-list" style={{backgroundColor: 'white'}}>
          <DatePicker.Item title="空"
                           disabledDate={(dayjs: Dayjs) => {
                             return true;
                           }}
                           v-model={[this.state.empty, 'value']}/>
          <DatePicker.Item title="输入字符串"
                           value="2021-12-28T07:29:49.968Z"/>
          <DatePicker.Item
              title="日期时间"
              v-model={[this.state.date, 'value']}>
          </DatePicker.Item>
          <DatePicker.Item
              title="时间戳"
              value={this.state.timestamp}
              onChange={date => this.state.date = date}>
          </DatePicker.Item>
          <DatePicker.Item
              mode="date"
              title="Select Date"
              extra="Optional"
              value={this.state.date}
              onChange={date => this.state.date = date}>
            <m-list-item arrow="horizontal">日期</m-list-item>
          </DatePicker.Item>
          <m-date-picker
              mode="time"
              minuteStep={2}
              use12Hours={true}
              value={this.state.time}
              onChange={time => this.state.time = time}>
            <m-list-item arrow="horizontal">时间 (am/pm)</m-list-item>
          </m-date-picker>
          <m-list title="限制日期范围">
            <m-date-picker
                mode="date"
                minDate={this.minDate2}
                v-model={[this.minDate2, 'value']}>
              <m-list-item arrow="horizontal">选择最小日期</m-list-item>
            </m-date-picker>
            <m-date-picker
                mode="date"
                maxDate={this.maxDate2}
                v-model={[this.maxDate2, 'value']}>
              <m-list-item arrow="horizontal">选择最大日期</m-list-item>
            </m-date-picker>
            <m-date-picker
                mode="date"
                minDate={this.minDate2}
                maxDate={this.maxDate2}
                value={this.state.time}
                onChange={time => this.state.time = time}>
              <m-list-item arrow="horizontal">限制日期范围</m-list-item>
            </m-date-picker>
          </m-list>
          <m-date-picker
              mode="time"
              minDate={minDate}
              maxDate={maxDate}
              value={this.state.time}
              onChange={time => this.state.time = time}>
            <m-list-item arrow="horizontal">限制时间范围</m-list-item>
          </m-date-picker>
          <m-date-picker
              mode="time"
              format={val => `UTC Time: ${formatDate(val).split(' ')[1]}`}
              value={this.state.utcDate}
              onChange={date => this.state.utcDate = date}>
            <m-list-item arrow="horizontal">UTC time</m-list-item>
          </m-date-picker>
          <m-list-item
              extra={this.state.dpValue && formatDate(this.state.dpValue)}
              onClick={() => this.state.open = true}>
            External control open state
          </m-list-item>
          <m-date-picker
              open={this.state.open}
              value={this.state.dpValue}
              onOk={date => {
                this.state.dpValue = date;
                this.state.open = false;
              }}
              onCancel={() => this.state.open = false}
          />
          <m-date-picker
              mode="time"
              format="HH:mm"
              title="Select Time"
              value={this.state.customChildValue}
              onChange={v => this.state.customChildValue = v}
              extra="click to choose"
          >
            <CustomChildren>With customized children</CustomChildren>
          </m-date-picker>
        </m-list>
    );
  }
});
