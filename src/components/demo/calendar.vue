<template>
  <div>
    <m-list>
      <m-calendar-item v-model="dateRange2"
                       title="日期范围选择"/>
      <m-calendar-item v-model="dateRange"
                       :maxDate="new Date()"
                       :minDate="new Date(2017, 0, 1)"
                       title="日期范围选择"/>
      <!--      <m-calendar-item pick-time-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item show-shortcut-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item v-model="date"-->
      <!--                       title="日期选择"-->
      <!--                       type="one"/>-->
      <!--      <m-calendar-item pick-time-->
      <!--                       title="时间选择"-->
      <!--                       type="one"/>-->
      <!--      <m-calendar-item row-size="xk"-->
      <!--                       title="大行距"/>-->
      <!--      <m-calendar-item title="默认日期"-->
      <!--                       :default-value="defaultValue"/>-->
      <!--      <m-calendar-item default-value=""-->
      <!--                       title="默认时间"/>-->
    </m-list>
    <m-calendar :default-date="new Date()"
                :maxDate="maxDate"
                :minDate="minDate"
                :visible.sync="value"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const date = ref(new Date());
      const dateRange = ref([new Date(2019, 4, 28), new Date()]);
      const dateRange2 = ref([new Date(2019, 4, 28), new Date()]);
      const defaultValue = ref([new Date(2019, 3, 1, 0, 0, 0), new Date()]);
      const maxDate = ref(new Date(Date.now() + 31536000000));
      const minDate = ref(new Date(Date.now() - 5184000000));
      const value = ref(false);


      return {
        date,
        dateRange,
        dateRange2,
        defaultValue,
        maxDate,
        minDate,
        value
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
