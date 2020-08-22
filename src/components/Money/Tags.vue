<template>
  <div class="tags" >

    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <Icon :name="tag.icon"/>
        {{tag.name}}
      </li>
      <li>
        <router-link to="/labels" class="item" active-class="selected">
          <Icon name="plus"/>
          <div class="center">编辑</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper){
    selectedTags: string[]=[];

    get tagList(){
      return this.$store.state.tagList;
    }

    created(){
      this.$store.commit('fetchTags');
    }

    toggle(tag:string){
      const index = this.selectedTags.indexOf(tag);
      if(index>=0){
        this.selectedTags.splice(index,1);
      }else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value',this.selectedTags);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    > .current {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      > li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        .icon {
          width:36px;
          height:36px;
        }
        &.selected {
          background:#c4c4c4;
          color:white;
        }
      }
    }
    .center {
        text-align: center;
    }

  }

</style>