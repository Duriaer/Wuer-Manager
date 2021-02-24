<template>
	<view class="selectPeer">
		<view class="total">
			<text>员工总数:{{listArr.length}}个</text>
		</view>
		<view class="list" v-for="item in listArr" :key="item.id" @tap.stop="selectListArr(item)">
			<view class="left">
				<view class="title">
					<text>{{item.shortName}}</text>
				</view>
				<text>手机号码:{{item.telephone}}</text>
				<text>创建时间:{{item.createTime}}</text>
				<text>最后交易:</text>
			</view>
			<view class="right">
				<view class="top">
					<view class="li">
						<text>vip</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr:[],
			};
		},
		onShow(){
			this.getListArr()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addPeer()
			}
		},
		methods:{
			// 获取所有友店信息
			async getListArr(){
				let res = await this.$get({
					url:'/shop/getFriendShops',
				})
				console.log(res.data.data)
				this.listArr = res.data.data
			},
			
			selectListArr(item){
				let data = {
						id:item.id,
						shortName:item.shortName
					}
				uni.setStorageSync('selectPeer',data)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
    @import "./selectPeer.scss";
</style>
