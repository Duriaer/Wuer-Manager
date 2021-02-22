<template>
	<view class="singleStaff">
		<view class="total">
			<text>员工总数:{{this.shopUser.length}}个</text>
		</view>
		<view class="list" v-for="item in this.shopUser" :key="item.id">
			<view class="left">
				<text class="title">{{item.realname}}</text>
				<text>登录账号:{{item.username}}</text>
				<text>手机号码:{{item.telephone}}</text>
				<text>创建时间:{{item.createTime}}</text>
			</view>
			<view class="right">
				<view class="state">
					<text>启用</text>
				</view>
				<view class="role">
					<text>销售</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopUser:[],
			};
		},
		onLoad(){
			this.getShopUserArr()
		},
		methods:{
			// 获取本店所有员工
			async getShopUserArr(){
				let res = await this.$get({
					url:'/goodsSku/getShopUserItems',
				})
				console.log(res.data.data)
				this.shopUser = res.data.data
			},
		}
	}
</script>

<style lang="scss">
	@import "./singleStaff.scss";
</style>
