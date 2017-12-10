<template>
  <div class="ratings" ref='ratings'>
    <div class="ratings-content">
      <div class="overview">
            <div class="overview-left">
              <h1 class="score">{{seller.score}}</h1>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.serviceScore" class="star"></star>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper">
                <span class="title">商品评分</span>
                <star :size="36" :score="seller.foodScore"></star>
                <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <span class="delivery">{{seller.deliveryTime}} 分钟</span>
              </div>
            </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>  
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up">↑</span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>  
  </div>
</template>
<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import {formatDate} from '../../common/js/date.js'
import BScroll from 'better-scroll'
const ALL = 2
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      ratings: []
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  created () {
    this.$http.get('../../../static/data.json').then((response) => {
      this.ratings = response.body.ratings
      this.$nextTick(() => {
        this._initScroll()
      })
    })
  },
  methods: {
    _initScroll () {
      this.ratingsScroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  events: {
    'ratingType.select' (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    'content.toggle' (onlyContent) {
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
 .ratings 
  position:absolute
  top:174px
  left:0
  bottom :0
  width:100%
  overflow :hidden
  .overview
   display:flex
   padding:18px 0
   .overview-left
    flex: 0 0 137px
    width: 137px
    padding: 6px 0
    border-right: 1px solid rgba(7, 17, 27, 0.1)
    text-align: center
    .score
     line-height :28px
     font-size:24px
     color:rgb(255,153,0)
     margin-bottom:6px
    .title
     line-height :12px
     font-size:12px
     color:rgb(7,17,27)
     margin-bottom:8px
    .rank
     font-size:10px
     line-height :10px
     color:rgb(147,153,159)
    @media only screen and (max-width: 320px)
     flex: 0 0 120px
     width: 120px
   .overview-right
    flex:1
    padding:6px 0 6px 24px
    @media only screen and (max-width: 320px)
     padding-left: 6px
    .score-wrapper 
     margin-bottom :8px
     font-size:0
     .title
      display:inline-block
      line-height:18px
      font-size:12px
      color:rgb(7,17,27)
      vertical-align :top
     .star
      display:inline-block
      line-height:18px
      vertical-align :top
      margin:0 12px
     .score
      color:rgb(255,153,0)
      line-height:18px
      vertical-align :top
      display:inline-block
      font-size:12px
    .delivery-wrapper
     fonts-size:0
     .title
      line-height:18px
      font-size:12px
      color:rgb(7,17,27)
     .delivery
      font-size:12px
      color:rgb(147,153,159)
      margin-left:12px
  .rating-wrapper
   padding:0 18px
   .rating-item
    padding:18px 0
    border-1px(rgba(7, 17, 27, 0.1))
    display:flex
    .avatar
     flex: 0 0 28px
     width: 28px
     margin-right: 12px
     img
       border-radius: 50%
    .content
     position: relative
     flex: 1
     .name 
      line-height :12px
      font-size:10px
      color:rgb(7,17,27)
      margin-bottom:4px
     .star-wrapper
      font-size:0
      margin-bottom:6px
      .star
       display:inline-block
       margin-right:16px
       vertical-align :top
      .delivery
       vertical-align :top
       font-size:10px
       color:rgb(147,153,159)
       display: inline-block
       line-height: 12px
     .text
      margin-bottom:8px
      line-height: 18px
      color: rgb(7, 17, 27)
      font-size: 12px
     .recommend
      line-height: 16px
      font-size： 0
      .icon-thumb_up, .item
       display: inline-block
       margin: 0 8px 4px 0
       font-size: 9px
      .icon-thumb_up
       color: rgb(0, 160, 220)
      .item
       padding: 0 6px
       border: 1px solid rgbs(7,17,27,.1)
       border-radius: 1px
       color: rgb(147,153, 159)
       background: #fff
     .time  
      position:absolute
      top:0
      right: 0
      line-height:12px
      font-size:10px
      color:rgb(147,153,159)
</style>

