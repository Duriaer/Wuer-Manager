<template>
	<view class="peerAdminister">
		<view class="total">
			<text>员工总数:{{this.friendShops.length}}个</text>
		</view>
		<view class="list" v-for="item in this.friendShops" :key="item.id">
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
				<view class="bot">
					<image src="../../../static/administer/phone.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				friendShops:[],
			};
		},
		onShow(){
			this.getFriendShopsArr()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addPeer()
			}
		},
		methods:{
			// 获取所有友店信息
			async getFriendShopsArr(){
				let res = await this.$get({
					url:'/shop/getFriendShops',
				})
				console.log(res.data.data)
				this.friendShops = res.data.data
			},
		}
	}
</script>

<style lang="scss">
    @import "./peerAdminister.scss";
</style>
