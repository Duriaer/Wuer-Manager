<template>
	<view class="singleStaff">
		<view class="total">
			<text>员工总数:{{listArr.length}}个</text>
		</view>
		<view class="list" v-for="item in listArr" :key="item.id" @tap.stop="selectListArr(item)">
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
				listArr:[],
			};
		},
		onShow(){
			this.getListArr()
		},
		onNavigationBarButtonTap(e){
			if(e.index ==0){
				this.$addStaff()
			}
		},
		methods:{
			// 获取本店所有员工
			async getListArr(){
				let res = await this.$get({
					url:'/goodsSku/getShopUserItems',
				})
				this.listArr = res.data.data
			},
			
			selectListArr(item){
				let data = {
					// user:item,
					id:item.id,
					username:item.username
				}
				uni.setStorageSync('singleStaff',data)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
	@import "./singleStaff.scss";
</style>
