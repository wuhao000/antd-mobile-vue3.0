// 导入颜色选择器组件
import HttpMethod from './http-method';
import VueIcon from '@ant-design/icons-vue';
import Accordion from './accordion';
import ActionSheet from './action-sheet';
import ActivityIndicator from './activity-indicator';
import Badge from './badge';
import Button from './button';
import Calendar from './calendar';
import Card from './card';
import Carousel from './carousel';
import Checkbox from './checkbox';
import DatePicker from './date-picker';
import DatePickerView from './date-picker-view';
import Drawer from './drawer';
import Flex from './flex';
import Grid from './grid';
import Icon from './icon';
import ImagePicker from './image-picker';
import Input from './input';
import CascaderView from './cascader-view';
import List from './list';
import LoadingDirective from './loading-directive';
import Menu from './menu';
import Modal from './modal';
import NavBar from './nav-bar';
import NoticeBar from './notice-bar';
import Pagination from './pagination';
import Picker from './picker';
import PickerView from './picker-view';
import Popover from './popover';
import Popup from './popup';
import Progress from './progress';
import PullRefresh from './pull-refresh';
import Radio from './radio';
import Range from './range';
import Result from './result';
import Empty from './empty';
import Loading from './loading';
import SearchBar from './search-bar';
import SegmentedControl from './segmented-control';
import Slider from './slider';
import Stepper from './stepper';
import Steps from './steps';
import InfiniteScroll from './infinite-scroll';
import Switch from './switch';
import TabBar from './tab-bar';
import Tabs from './tabs';
import Tag from './tag';
import Textarea from './textarea';
import Toast from './toast';
import Mask from './mask';
import WhiteSpace from './white-space';
import Space from './space';
import WingBlank from './wing-blank';
// 存储组件列表
const components = [
  Accordion,
	ActionSheet,
	ActivityIndicator,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	CascaderView,
	List,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	PickerView,
	Popover,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	Empty,
	Loading,
	SearchBar,
	SegmentedControl,
	Slider,
	Stepper,
	Steps,
	InfiniteScroll,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	Toast,
	Mask,
	WhiteSpace,
	Space,
	WingBlank
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否可以安装
  // if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.use(component));
};

export {
  // 以下是具体的组件列表
  HttpMethod,
  Accordion,
	ActionSheet,
	ActivityIndicator,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	CascaderView,
	List,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	PickerView,
	Popover,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	Empty,
	Loading,
	SearchBar,
	SegmentedControl,
	Slider,
	Stepper,
	Steps,
	InfiniteScroll,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	Toast,
	Mask,
	WhiteSpace,
	Space,
	WingBlank
};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  HttpMethod,
  Accordion,
	ActionSheet,
	ActivityIndicator,
	Badge,
	Button,
	Calendar,
	Card,
	Carousel,
	Checkbox,
	DatePicker,
	DatePickerView,
	Drawer,
	Flex,
	Grid,
	Icon,
	ImagePicker,
	Input,
	CascaderView,
	List,
	LoadingDirective,
	Menu,
	Modal,
	NavBar,
	NoticeBar,
	Pagination,
	Picker,
	PickerView,
	Popover,
	Popup,
	Progress,
	PullRefresh,
	Radio,
	Range,
	Result,
	Empty,
	Loading,
	SearchBar,
	SegmentedControl,
	Slider,
	Stepper,
	Steps,
	InfiniteScroll,
	Switch,
	TabBar,
	Tabs,
	Tag,
	Textarea,
	Toast,
	Mask,
	WhiteSpace,
	Space,
	WingBlank
};
