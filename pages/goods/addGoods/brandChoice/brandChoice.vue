<template>
	<view class="brand_content">
		<view class="brand_header">
			<view class="status"></view>
			<view class="header">
				<view class="searchBox" >
					<image class="search" src="../../../../static/goods/fdj.png"></image>
					<text></text>
				</view>
			</view>
		</view>
		<view class="brand_main">
			<view class="left">
				<view class="brand_tille" :class="!optIndex ? 'active':''" @tap.stop="brandTilleTap(0)">
					<text>常用品牌</text>
				</view>
				<view class="brand_tille" :class="optIndex ? 'active':''" @tap.stop="brandTilleTap(1)">
					<text>全部品牌</text>
				</view>
			</view>
			<scroll-view class="scroll" scroll-y="true" :scroll-into-view="scrollId">
				<template v-if="!optIndex">
					<view class="scroll_ul" id="list0">
						<view class="scroll_li" v-for="(item,index) in frequentlyUseBrandList" :key="index" @tap.stop="selectGoodsBrands(item,0)">
							<text>{{item.goodsBrandName}}</text>
						</view>
					</view>
				</template>
				<template v-if="optIndex">
					<view class="scroll_ul" :id="'list'+index" v-for="(item,index) in goodsBrandsAllIndexData" :key="index">
						<view class="scroll_li" v-for="(item2,index2) in item.list" :key="index2"  @tap.stop="selectGoodsBrands(item2,1)">
							<text>{{item2.name}}</text>
						</view>
					</view>
				</template>
			</scroll-view>
		</view>
		<view class="initial">
			<template v-if="optIndex">
				<view class="initial_li" :class="select==index?'active':''" v-for="(item,index) in goodsBrandsAllIndexList" :key="index" @tap.stop="scrollTo(index)">
					{{item}}
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				token:uni.getStorageSync('token'),
				optIndex:0,
				scrollId:'list0',
				select:null,
				frequentlyUseBrandList:[],//常用品牌数组
				goodsBrandsAllIndexData:[],//全部品牌数组
				goodsBrandsAllIndexList:[],//全部品牌检索
			}
		},
		onLoad() {
			this.getGoodsBrandArr()
			this.getGoodsBrandsAllArr()
		},
		methods:{
			//获取常用品牌
			async getGoodsBrandArr(){
					let res = await this.$get({
						url:'/goodsSku/getFrequentlyUseBrandList',
					})
					this.frequentlyUseBrandList = res.data.data
					// console.log(this.frequentlyUseBrandList)
			},
			
			//获取全部品牌
			async getGoodsBrandsAllArr(){
					let res = await this.$get({
						url:'/goodsSku/getGoodsBrandIndexes',
					})
					this.goodsBrandsAllIndexData= res.data.data.goodsBrandsAllIndexData
					this.goodsBrandsAllIndexList= res.data.data.goodsBrandsAllIndexList
			},
			
			brandTilleTap(type) {
				this.optIndex = type
				this.scrollId = 'list0'
			},
			
			scrollTo(index){
				// this.scrollId = 'list'+index
				this.scrollId = `list${index}`
				this.select = index
				setTimeout(()=>{
					this.select = null
				},200)
			},
			
			selectGoodsBrands(item,type){
				//type：0常用 1全部
				let goodsBrands = {}
				if(type){
					goodsBrands = {
						goodsBrand:item,
						goodsBrandId:item.id,
						goodsBrandName:item.name
					}
				}else{
					goodsBrands = {
						goodsBrand:{
							createTime:null,
							id:item.goodsBrandId,
							name:item.goodsBrandName,
							recommended:false,
							updateTime:null,
						},
						goodsBrandId:item.goodsBrandId,
						goodsBrandName:item.goodsBrandName
					}
				}
				uni.setStorageSync('goodsBrands',goodsBrands)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
    @import "./brandChoice.scss"
</style>
