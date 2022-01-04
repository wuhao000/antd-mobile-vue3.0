> 在此前发布的[Antd Mobile Vue](https://github.com/wuhao000/antd-mobile-vue)的基础上进行了vue3.0的升级
> 这是目前为止Ant Design Mobile移植到Vue最完整的组件库
> 新增部分v5组件移植

如有问题可添加个人微信（wuhao1200），欢迎共同交流
![](http://chuantu.xyz/t6/740/1595927552x-633054266.jpg)

[查看文档](https://antdmobilevue3.aegis-info.com)

# antd-mobile-vue

> 基于 Vue3 的组件库，代码由antd-mobile转为Vue版本，目前已具备antd-mobile的绝大部分组件

部分组件的示例已和 <code>ant design mobile</code> 官网同步

**与antd-mobile的组件对比**

antd-mobile 共有 <code>47</code>个组件，本项目截至现在移植了<code>44</code>个, 组件完成度达到95%
antd-mobile V5 共有 <code>58</code>个组件(不含ConfigProvider)，本项目截至现在移植了<code>51</code>个, 组件完成度达到88%

## 与ant design mobile的组件比较

| 组件名称              | antd-mobile | antd-mobile-vue | 示例移植 | 说明  |
|-------------------|:-----------:|:---------------:|:----:|-----|
| Accordion         |      √      |        √        |  √   |
| ActionSheet       |      √      |        √        |  √   |
| ActivityIndicator |      √      |        √        |  √   |
| Badge             |      √      |        √        |  √   |
| Button            |      √      |        √        |  √   |
| Calendar          |      √      |        √        |  √   |
| Card              |      √      |        √        |  √   |
| Carousel          |      √      |        √        |  √   |
| Checkbox          |      √      |        √        |  √   |
| DatePicker        |      √      |        √        |  √   |
| DatePickerView    |      √      |        √        |  √   |
| Drawer            |      √      |        √        |  √   |
| Empty             |      √      |        √        |  √   |
| Flex              |      √      |        √        |  √   |
| Grid              |      √      |        √        |      |
| Icon              |      √      |        √        |  √   |
| ImagePicker       |      √      |                 |  √   |
| InfiniteScroll    |      √      |        v        |  √   |
| InputItem         |      √      |        v        |  √   |
| List              |      √      |        √        |  √   |
| ListView          |      √      |       [无]       |
| Loading           |      √      |        √        |  √   |
| Mask              |      √      |        √        |  √   |
| Menu              |      √      |        √        |  √   |
| Modal             |      √      |        √        |  √   |
| NavBar            |      √      |        √        |  √   |
| NoticeBar         |      √      |        √        |  √   |
| Pagination        |      √      |        √        |  √   |
| Picker            |      √      |        √        |  √   |
| PickerView        |      √      |        √        |
| Popover           |      √      |        √        |  √   |
| Progress          |      √      |        √        |  √   |
| Radio             |      √      |        √        |  √   |
| PullToRefresh     |      √      |        √        |  √   |
| Result            |      √      |        √        |  √   |
| SearchBar         |      √      |        √        |      |
| SegmentedControl  |      √      |        √        |  √   |
| Space             |      √      |        √        |  √   |
| Slider            |      √      |        √        |  √   |
| Range             |      √      |        √        |  √   |
| Stepper           |      √      |        √        |  √   |
| Steps             |      √      |        √        |  √   |
| SwipeAction       |      √      |        √        |      |
| Switch            |      √      |        √        |      |
| TabBar            |      √      |        √        |  √   |
| Tabs              |      √      |        √        |  √   |
| Tag               |      √      |        √        |  √   |
| TextareaItem      |      √      |        √        |  √   |
| Toast             |      √      |        √        |  √   |
| WhiteSpace        |      √      |        √        |  √   |
| WingBlank         |      √      |        √        |  √   |
| LocaleProvider    |      √      |       [无]       |      |
| AutoCenter        |             |        √        |      |
| CapsuleTabs       |             |        √        |      |     |
| Cascader          |             |        √        |      |
| CascaderView      |             |        √        |      |
| Dropdown          |             |        √        |      |
| Ellipsis          |             |        √        |      |
| FloatingBubble    |             |        √        |      |     |
| ErrorBlock        |             |        √        |      |
| FloatingPanel     |             |        √        |      |     |
| Image             |             |        √        |      |
| ImageViewer       |             |        √        |      |
| ImageUploader     |             |        √        |      |     |
| IndexBar          |             |        √        |      |
| JumboTabs         |             |        √        |      |     |
| NumberKeyboard    |             |        √        |      |     |
| PasscodeInput     |             |        √        |      |     |
| ProgressCircle    |             |        √        |      |
| SafeArea          |             |        √        |      |     |
| Selector          |             |        √        |      |
| Skeleton          |             |        √        |      |     |
| SideBar           |             |        √        |      |
| Swiper            |             |        √        |      |
| TreeSelect        |             |        √        |      |
| VirtualInput      |             |        √        |      |
| WaterMark         |             |        √        |      |

## 安装

```bash
 npm i antd-mobile-vue-next -S
```

## 使用

```javascript
import AntdMobile from 'antd-mobile-vue-next'

app.use(AntdMobile)
```

### 按需引入

按需加载需要借助<code>babel-plugin-import</code>, 这样就可以只引入需要的组件，以减小项目体积

```shell
npm i babel-plugin-import -D
```

将babel.config.js修改为：

```javascript
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile-vue-next',
        libraryDirectory: 'es',
        style: true
      },
      'antd-mobile-vue-next'
    ]
  ]
};
```

引入组件

```html
import { Alert } from "antd-mobile-vue-next";
defineComponent({
components: {
[Alert.name]: Alert
}
});
```

### 开发环境启动

```bash
npm run dev 
```

### 打包

```bash
npm run build
```

### 发布到npm仓库

```bash
npm publish
```

