<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreasecart($event)" transition="move">
      <span class="inner" >-</span>
      </div>
    <div class="cart-count"  v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addcart($event)">+</div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    addcart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
      this.$emit('newNodeEvent', event.target)
    },
    decreasecart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count --
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .cartcontrol
  font-size:0
  .cart-add
   display:inline-block
   line-height :24px
   font-size:24px
   text-align:center
   color:#fff
   box-sizing:border-box
   width:24px
   height:24px
   background:rgb(0,160,220)
   border-radius:50%
   margin:10px
  .cart-decrease
   display:inline-block
   margin:10px
   width:24px
   height:24px
   text-align:center
   border-radius:50%
   box-sizing:border-box
   line-height :24px
   font-size:24px
   color:#fff
   background:rgb(0,160,220)
  .cart-count
   display:inline-block
   vertical-align :top
   width:12px
   padding-top:6px
   line-height :24px
   text-align:center
   font-size:10px
   color:rgb(147,153,159)
</style>


