<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">添加标签</span>
            <span class="rightIcon"/>
        </div>
        <div class="form-wrapper">
            <FormItem :value="tag.name"
                      @update:value="addTagName"
                      field-name="标签名"
                      placeholder="请输入签名"/>
        </div>
        <div class="tag-pics">
            <span class="text">请选择图标:</span>
            <ul class="pictures">
                <li v-for="number in pictures" :key="number"
                    :class="{selected: selectedTags.indexOf(number)>=0}"
                    @click="toggle(number);addTagIcon(number)" >
                    <Icon :name="number"/>
                </li>
            </ul>
        </div>
        <div class="button-wrapper">
            <Button class="finish" @click="createTag">完成</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components:{Button, FormItem},
  })
  export default class CreateTag extends Vue {
    selectedTags: string[]=[];
    tag: NewTag={name:'',icon:''}

    get pictures() {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    }
    toggle(tag:string){
      const index = this.selectedTags.indexOf(tag);
      if(this.selectedTags.length===0){
        this.selectedTags.push(tag)
        console.log('执行了a')
      } else if(index===0){
        this.selectedTags.splice(0,1)
        console.log('执行了b')

      } else {
        this.selectedTags.splice(0,1)
        this.selectedTags.push(tag)
        console.log('执行了c')

      }
    }
    addTagName(name:string){
      this.tag.name=name;
    }


    addTagIcon(number:string){
      this.tag.icon=number;
      console.log(this.tag.icon)
    }

    createTag() {
      if (this.tag.name === '') { return window.alert("标签名不能为空");}
      this.$store.commit('createTag', this.tag);
      if (this.$store.state.createTagError === null) {
        window.alert('已保存');
        this.tag.name = '';
        this.selectedTags.splice(0,1);
      }
    }

      goBack()
      {
        this.$router.back();
      }
    }
</script>

<style lang="scss" scoped>
    .navBar{
        text-align: center;
        font-size: 16px;
        padding:12px 16px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >.title {
        }
        >.leftIcon {
            width:24px;
            height: 24px;
        }
        >.rightIcon{
            width:24px;
            height: 24px;
        }
    }
    .form-wrapper {
        background: white;
        margin-top: 8px;
    }
    .button-wrapper {
        text-align: center;
        padding:16px;
        margin-top:44-16px;
    }
    .finish{
        background: #e98f36;
    }
    .tag-pics {
        padding-left: 14px;
        margin-top:16px;
        background:white;
        > .pictures {
            padding-top: 16px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            > li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;

                .icon {
                    width: 36px;
                    height: 36px;
                }

                &.selected {
                    background: #c4c4c4;
                    color: white;
                }
            }
        }
    }
</style>