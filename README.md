> 本项目是在本人之前移植的antd-mobile-vue的基础上使用vue3+vite2进行了改造，目前绝大部分组件都可以正常使用

#### v0.0.1-9
* 修复GridItem点击的bug


如有问题可添加个人微信（wuhao1200），欢迎共同交流
![](http://chuantu.xyz/t6/740/1595927552x-633054266.jpg)

[查看文档](https://antdmobilevue3.aegis-info.com)

# antd-mobile-vue

> 基于 Vue3 的组件库，代码由antd-mobile转为Vue版本，目前已具备antd-mobile的绝大部分组件

部分组件的示例已和 <code>ant design mobile</code> 官网同步

**与antd-mobile的组件对比**

antd-mobile 共有 <code>47</code>个组件，本项目截至现在移植了<code>42</code>个, 组件完成度达到95%

## 与ant design mobile的组件比较

组件名称 | antd-mobile | antd-mobile-vue | 示例移植 |说明
--- | :---: | :---: | :---: | ---
Accordion | √ | √ | √
ActionSheet | √ | √ | √
ActivityIndicator | √ | √ | √
Badge | √ | √ | √
Button | √ | √ | √
Calendar | √ | √ | √
Card | √ | √ | √
Carousel | √ | √ | √
Checkbox | √ | √ | √
DatePicker | √ | √ | √
DatePickerView | √ | √ | √
Drawer | √ | √ | √
Flex | √ | √ | √
Grid | √ | √
Icon | √ | √ | √
ImagePicker | √ | √ | √
InputItem | √ | v | √
List | √ | √ | √
ListView | √ | [无]
Menu | √ | √ | √
Modal | √ | √ | √
NavBar | √ | √ | √
NoticeBar | √ | √ | √
Pagination | √ | √ | √
Picker | √ | √ | √
PickerView | √ | √
Popover | √ |  | √
Progress | √ | √ | √
Radio | √ | √ | √
PullToRefresh | √ | √ | √
Result | √ | √ | √
SearchBar | √ | √
SegmentedControl | √ | √ | √
Slider | √ | √ | √
Range | √ | √ | √
Stepper | √ | √ | √
Steps | √ | √ | √
SwipeAction | √ |  [无]
Switch | √ | √
TabBar | √ |  | √
Tabs | √ | √ | √
Tag | √ | √ | √
TextareaItem | √ | √ | √
Toast | √ | √ | √
WhiteSpace | √ | √ | √
WingBlank | √ | √ | √
LocaleProvider | √ | [无]

## 安装

```bash
 npm i antd-mobile-vue3 -S
```
## 使用

### 完整引入

```javascript
import AntdMobile from 'antd-mobile-vue'
Vue.use(AntdMobile)
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
        libraryName: 'antd-mobile-vue',
        libraryDirectory: 'es',
        style: true
      },
      'antd-mobile-vue'
    ]
  ]
};
```

引入组件

```html
import { Alert } from "antd-mobile-vue";
@Component({
  components: {
    Alert
  }
})
```

### cdn引入 ###

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<link rel="stylesheet" href="https://public-file.aegis-info.com/antd-mobile-vue/0.3.0/antdm.css.gz">
<script src="https://public-file.aegis-info.com/antd-mobile-vue/<version>/antdm.umd.min.js.gz"></script>
```

> cdn没有打包vue，因此需要独立引入vue的cdn资源

### 开发环境启动
```bash
npm run dev 
```

### 创建组件
```bash
npm run create <name> <cn-name> <type> 
```

* name为组件名称，格式要求如下：
    * 命名统一使用小写单词，多个单词之间以-分隔
    * vue指令或工具类组件按实际作用命名
* cn-name为组件的中文名称
* type 可选ui（ui组件）、directive（vue指令）、tool（工具）

### 自动生成文档

 ```bash
npm run docs
```

### 代码检查
```bash
npm run lint
``` 

### 生成库文件
```bash
npm run lib
``` 
打包后的文件可以在html中直接引用

### 生产环境打包

```bash
npm run build
```

> 用于部署，如果发布到npm仓库则不需要执行


### 删除组件
``` bash
npm run remove <name>
```

* name：要删除的组件名称


### 发布到npm仓库

```bash
npm publish
```

