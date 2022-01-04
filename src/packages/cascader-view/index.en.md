# CascaderView

CascaderView is the content area of [Cascader](./cascader).

<code src="./demos/demo1.tsx"></code>

## API

| Name         | Description                                     | Type                                                            | Default    |
| ------------ | ----------------------------------------------- | --------------------------------------------------------------- | ---------- |
| value        | Selected options                                | `CascaderValue[]`                                               | -          |
| defaultValue | Default selected options                        | `CascaderValue[]`                                               | `[]`       |
| options      | Data of the cascade options                     | `CascaderOption[]`                                              | -          |
| onChange     | Triggered when the selected options are changed | `(value: CascaderValue[], extend: CascaderValueExtend) => void` | -          |
| placeholder  | Hint text                                       | `string`                                                        | `'请选择'` |

For the type definition of `CascaderValue` `CascaderOption` `CascaderValueExtend`, please refer to the document of [Cascader](./cascader#api).

### CSS Variables

| Name     | Description                | Default |
| -------- | -------------------------- | ------- |
| --height | height of the CascaderView | `auto`  |
