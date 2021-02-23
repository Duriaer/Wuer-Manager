<template>
	<view class="singleStaff">
		<view class="total">
			<text>员工总数:{{shopUser.length}}个</text>
		</view>
		<view class="list" v-for="item in shopUser" :key="item.id" @tap.stop="selectShopUser(item)">
			<view class="left">
				<text class="title">{{item.realname}}</text>
				<text>登录账号:{{item.username}}</text>
				<text>手机号码:{{item.telephone}}</text>
				<text>创建时间:{{item.createTime}}</text>
			</view>
			<view class="right">
				<view class="state-y" v-if="item.enable">
					<text>启用</text>
				</view>
				<view class="state-n" v-else>
					<text>禁用</text>
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
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addStaff()
			}
		},
		methods:{
			// 获取本店所有员工
			async getShopUserArr(){
				let res = await this.$get({
					url:'/goodsSku/getShopUserItems',
				})
				this.shopUser = res.data.data
				console.log(this.shopUser)
			},
			
			selectShopUser(item){
				let user = {}
				user = {
					user:item,
					userId:item.id,
					userName:item.username
				}
				uni.setStorageSync('user',user)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
	@import "./singleStaff.scss";
</style>
