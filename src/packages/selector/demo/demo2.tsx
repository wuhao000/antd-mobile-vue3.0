import { options } from './options'
import {List, Selector} from '../../'

export default () => {
  return (
    <>
      <List.Item title='选项带描述'>
        <Selector
          columns={2}
          options={[
            {
              label: '选项一',
              description: '描述信息',
              value: '1',
            },
            {
              label: '选项二',
              description: '描述信息',
              value: '2',
            },
          ]}
          defaultValue={['1']}
        />
      </List.Item>

      <List.Item title='自定义样式'>
        <Selector
          style={{
            '--border-radius': '100px',
            '--border': 'solid transparent 1px',
            '--checked-border': 'solid var(--adm-color-primary) 1px',
            '--padding': '8px 24px',
          }}
          showCheckMark={false}
          options={options}
          defaultValue={['1']}
        />
      </List.Item>
    </>
  )
}
