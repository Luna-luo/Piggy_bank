<template>
  <div>
      <template v-if="type ==='date'">
          <label class="dateFormItem">

          <input :type="type ||'text'"
                 :value="x(value)"
                 @input="onValueChanged($event.target.value)"
                 :placeholder="this.placeholder"
                 id="dateBlank">
          </label>
      </template>
      <template v-else>
          <label class="formItem">
        <span class="name">{{this.fieldName}}</span>
        <input :type="type || 'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="this.placeholder">
          </label>
      </template>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import Labels from '@/views/Labels.vue';
  @Component({
    components: {Labels}
  })
  export default class FormItem extends Vue {
    @Prop({default:''}) readonly value!:string;

    @Prop({required:true}) fieldName!:string;
    @Prop() placeholder?:string;
    @Prop() type?:string;

    onValueChanged(value:string){
      this.$emit('update:value',value);
    }
    x(isoString:string){
      return dayjs(isoString).format('YYYY-MM-DD');
    }
  }
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
        border:none;
      padding-right: 16px;
    }
  }
  .dateFormItem {
      font-size: 14px;
      /*display: flex;*/
      align-items: center;

      input {
          border:none;
          display: flex;
          flex-wrap: wrap;
          height: 40px;
          background: transparent;
          padding-right: 16px;

      }
  }
  #dateBlank{
    padding-right: 2px;
    padding-top: 18px;
  }
  input::-webkit-calendar-picker-indicator { margin-left:0px;}
  input::-webkit-datetime-edit {  font-size: 11px;
      margin-left: 4px;}
  /*::-webkit-datetime-edit-fields-wrapper { border:1px solid blue;font-size: 10px; }*/

</style>