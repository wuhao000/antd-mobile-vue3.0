<template>
  <div>
    <m-result img-url="https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg"
              message="这是描述"
              title="测试结果页"/>
  </div>
  <div>
    <m-result message="这是描述"
              button-text="关闭"
              button-type="primary"
              title="测试结果页">
      <template #img>
        <m-icon type="check-circle"
                size="lg" color="green"/>
      </template>
    </m-result>
  </div>
</template>
<script lang="ts">
export default {};
</script>
