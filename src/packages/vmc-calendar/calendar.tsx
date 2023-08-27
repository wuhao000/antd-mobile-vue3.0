import {defineComponent, watch} from 'vue';
import Popup from '../popup';
import {useBaseCalendar} from './calendar-base';
import CalendarProps from './calendar-props';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';

const Calendar = defineComponent({
  DefaultHeader: Header,
  DefaultShortcut: ShortcutPanel,
  name: 'Calendar',
  props: {
    ...CalendarProps
  },
  setup(props, ctx) {
    const {state, shortcutSelect, onClose, renderCalendar} = useBaseCalendar(props, ctx);
    watch(() => props.open, () => {
      state.open = props.open;
      const defaultValue = props.defaultValue;
      if (props.open && defaultValue) {
        shortcutSelect(defaultValue[0], defaultValue[1]);
      }
    });
    return {onClose, state, renderCalendar};
  },
  render() {
    const height = document.body.clientHeight;
    const popupProps = {
      onClose: this.onClose,
      open: this.open,
      height: `${height}px`,
      width: `${height}px`,
      value: this.state.open,
      placement: this.enterDirection === 'vertical' ? 'bottom' : 'right'
    };
    return (
      <Popup {...popupProps}>
        {this.renderCalendar()}
      </Popup>
    );
  }
});
export default Calendar as any;
