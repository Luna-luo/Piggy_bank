<template>
    <div class="output">{{output}}</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Output extends Vue {
    @Prop(String) value!:string;
    output:string = this.value;
  }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .output {
        @extend %clearFix;
        @extend %innerShadow;
        font-size: 36px;
        font-family: Consolas, monospace;
        padding: 9px 16px;
        text-align: right;
    }

</style>