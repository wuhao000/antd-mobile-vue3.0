import {defineComponent, reactive, ref} from 'vue';
import {Button, Input, List, Range, Switch} from '../../index';

const Item = List.Item;

export default defineComponent({
  name: 'BasicInput',
  setup() {
    const data2 = reactive({
      account: null,
      password: null
    });
    const state = reactive({
      value: 1,
      range: [20, 80]
    });
    const formRef = ref(null);

    const onSubmit = () => {
      formRef.value.validate().then(valid => {
        if (valid) {
        } else {
          alert('Validation failed');
        }
      });
    };
    const onReset = () => {
      data2.account = null;
      data2.password = null;
    };
    const validateAccount = (rule, value, callback) => {
      if (value && value.length > 4) {
        callback();
      } else {
        callback(new Error('At least four characters for account'));
      }
    };
    return {
      data2,
      state,
      setFormRef(el) {
        formRef.value = el;
      },
      onSubmit,
      onReset,
      validateAccount
    };
  },
  render() {
    return (<form>
      <List ref={this.setFormRef}
            {...{model: this.data2}}
            title="Form Validation">
        <Input clearable v-model={[this.data2.account, 'value']}
               placeholder="please input account"
        >Account</Input>
        <Input v-model={[this.data2.password, 'value']}
               placeholder="please input password" type="password">
          Password
        </Input>
        <Item
          control={<Switch/>}
        >Confirm Infomation</Item>
        <Item control={<div style={{padding: '15px'}}><Range v-model={[this.state.range, 'value']}/></div>}/>
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit.bind(this)}>Submit</Button>
          <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset.bind(this)}>Reset</Button>
        </Item>
      </List>
    </form>);
  }
});
