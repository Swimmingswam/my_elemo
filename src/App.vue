<template>
  <div id="app">
     <v-header :seller="seller"></v-header>
   <div>
     <ul class="tab">
       <router-link class="tab-item" to="/goods" router-link-active="active" tag="li">
	    		<a href="javascript:;">商品</a>
	    	</router-link>
        <router-link class="tab-item" to="/ratings"  tag="li">
	    		<a href="javascript:;">评论</a>
	    	</router-link>
        <router-link class="tab-item" to="/seller"  tag="li">
	    		<a href="javascript:;">商家</a>
	    	</router-link>
     </ul>
   </div>
  <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import {urlParse} from './common/js/util.js'
  // const ERR_OK = 0
  export default {
    components: {'v-header': header},
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id // ?
          })()  // 立即执行函数
        },
        goods: []
      }
    },
    created () {
      this.$http.get('../static/data.json').then((response) => {
        this.seller = response.body.seller
        this.seller = Object.assign({}, this.seller, response.data) // ?
      })
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
 @import "./common/stylus/mixin.styl"
 #app
  .tab
    display:flex
    width:100%
    height:40px
    line-height :40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        font-size:14px
        color:rgb(77,85,93)
        & .active
          color:rgb(240,20,20)
</style>


