<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"/>
        </div>
        <div class="form-wrapper">
            <FormItem :value="currentTag.name"
                      @update:value="update"
                      field-name="标签名"
                      placeholder="请输入标签名"/>
        </div>
        <div class="tag-pics">
            <span class="text">请选择图标:</span>
            <ul class="pictures">
                <li v-for="number in pictures" :key="number"
                    :class="{selected:selectedTags.indexOf(number)>=0}"
                    @click="changeIcon(number)">
                    <Icon :name="number" />
                </li>
            </ul>
        </div>
        <div class="button-wrapper">
            <Button class="delete" @click="remove">删除标签</Button>
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
    export default class EditLabel extends Vue{


      get pictures(){
        return ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
      }

      get currentTag(){
        return this.$store.state.currentTag;
      }
      selectedTags: string[]=[this.currentTag.icon];
      changeIcon(number:string){
        const index = this.selectedTags.indexOf(number);
        if(this.selectedTags.length===0){
          this.selectedTags.push(number)
        } else if(index===0){
          this.selectedTags.splice(0,1)
        } else {
          this.selectedTags.splice(0,1)
          this.selectedTags.push(number)
        }
        if (this.currentTag.name === '') { return window.alert("标签名不能为空");}
        this.$store.commit('updateTagIcon', {id:this.currentTag.id,icon:this.selectedTags[0]});
      }

        created(){
        const id = this.$route.params.id;
        this.$store.commit('fetchTags');
        this.$store.commit('setCurrentTag',id);
          if(!this.currentTag){
            this.$router.replace('/404');
          }
        }

        update(name:string){
          if (this.currentTag){
             this.$store.commit('updateTag',
               {id:this.currentTag.id,name,icon:this.currentTag.icon});
          }
        }
        remove(){
          if (this.currentTag){
            this.$store.commit('removeTag',this.currentTag.id);
          }
        }
        goBack(){
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
    .delete{
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