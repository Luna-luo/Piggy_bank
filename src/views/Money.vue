<template>
  <Layout class-prefix="layout">
    <div class="numberPad">
      <div class="buttons" >
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button ><div class="createAt">
          <FormItem
                  type="date"
                  :value.sync="record.createAt"/>
        </div></button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">OK</button>
        <button @click="inputContent" class="zero">0</button>
        <button @click="inputContent">.</button>
      </div>
    </div>


    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags=$event" />
    <div class="output">{{output}}</div>
    <Tabs class-prefix="navbar" :data-source="recordTypeList" :value.sync="record.type"/>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';


  @Component({
    components:{Tabs, FormItem, Tags, NumberPad},
  })
  export default class Money extends Vue {
    get recordList(){
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem={
      tags:[],notes:'',type:'-',amount:0,createAt:new Date().toISOString()
    };
    created(){
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value:string){
      this.record.notes = value;
    }

    saveRecord(){
      if(!this.record.tags || this.record.tags.length === 0 ){
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecord',this.record);
      if(this.$store.state.createRecordError === null){
        window.alert('已保存');
        this.record.notes = '';
      }
    }
    output:string = this.record.amount.toString();
    inputContent(event:MouseEvent){
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if(this.output.length === 16){return;}
      if(this.output ==='0'){
        if('0123456789'.indexOf(input) >= 0){
          this.output = input;
        }else {
          this.output += input;
        }
        return;
      }
      if(this.output.indexOf('.') >= 0 && input === '.'){return;}
      this.output += input;
    }

    remove(){
      if(this.output.length === 1){
        this.output = '0';
      }else{
        this.output = this.output.slice(0,-1);
      }
    }
    clear(){
      this.output = '0';
    }
    ok(){
      const number = parseFloat(this.output);
      this.record.amount = number;
      this.saveRecord();
      this.output = '0';
    }
  }


</script>

<style lang="scss" scoped>

  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding:6px 0;
  }
  ::v-deep .navbar-tabs-item {
    height: 58px;
  }
  @import "~@/assets/style/helper.scss";
  .numberPad {
    .buttons {
      @extend %clearFix;
      > button {
        width: 25%;
        height: 60px;
        float: left;
        background: transparent;
        border: none;
        &.ok {
          height: 60*2px;
          float: right;
        }
        &.zero {
          width: 25*2%;
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }
        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }
        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
  .output {
    flex-shrink: 1;
    @extend %clearFix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 0 16px;
    text-align: right;
  }



</style>

