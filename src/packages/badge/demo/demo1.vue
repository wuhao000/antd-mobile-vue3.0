<template>
  <div>
    <m-list>
      <m-list-item arrow="horizontal"
                   extra="extra content">
        <m-badge dot>
          <span :style="{ width : '26px', height : '26px', background : '#ddd', display : 'inline-block' }"/>
        </m-badge>
        <span :style="{ marginLeft : '12px' }">Dot badge</span>
      </m-list-item>
      <m-list-item arrow="horizontal"
                   thumb="https://zos.alipayobjects.com/rmsportal/faMhXAxhCzLvveJ.png">
        <template>
          <m-badge slot="extra"
                   :overflowCount="55"
                   text='77'></m-badge>
        </template>
        Content
      </m-list-item>
      <m-list-item>
        <m-badge corner
                 text='促'>
          <div class="corner-badge">Use corner prop</div>
        </m-badge>
      </m-list-item>
      <m-list-item class="special-badge">
        <m-badge slot="extra"
                 text="促"/>
        Custom corner
      </m-list-item>
      <m-list-item arrow="horizontal"
                   extra="extra">
        <m-badge :style="{ marginLeft : '12px' }"
                 :text="0">
          Text number 0
        </m-badge>
        <m-badge :style="{ marginLeft : '12px' }"
                 text='new'/>
      </m-list-item>
      <m-list-item>
        Marketing:
        <m-badge :style="{ marginLeft : '12px' }"
                 hot
                 text="减"/>
        <m-badge :style="{ marginLeft : '12px' }"
                 hot
                 text="惠"/>
        <m-badge :style="{ marginLeft : '12px' }"
                 hot
                 text="免"/>
        <m-badge :style="{ marginLeft : '12px' }"
                 hot
                 text="反"/>
        <m-badge :style="{ marginLeft : '12px' }"
                 hot
                 text="HOT"/>
      </m-list-item>
      <m-list-item>
        Customize
        <m-badge :textStyle="{ marginLeft : '12px', padding : '0 3px', backgroundColor : '#f19736', borderRadius : '2px'
                 }"
                 text="券"/>
        <m-badge :textStyle="{ marginLeft : '12px', padding : '0 3px', backgroundColor : '#21b68a', borderRadius : '2px'
                 }"
                 text="NEW"/>
        <m-badge :textStyle="{
               marginLeft : '12px',
               padding : '0 3px',
        backgroundColor : '#fff',
        borderRadius : '2px',
        color : '#f19736',
        border : '1px solid #f19736'
        }"
                 text="自动缴费"
        />
      </m-list-item>
    </m-list>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'BadgeDemo1'
});

</script>
<style lang="less">
.corner-badge {
  height: 50px;
  width: 200px;
}

.special-badge .am-list-line {
  padding-right: 0;
}

.special-badge .am-list-line .am-list-extra {
  padding: 0;
  height: 44px;
}

.special-badge .am-badge {
  transform: rotate(45deg);
  transform-origin: right bottom;
  right: 0;
  top: 13px;
  width: 50px;
}

.special-badge .am-badge-text {
  border-radius: 1px;
}
</style>
