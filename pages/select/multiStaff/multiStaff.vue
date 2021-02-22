<template>
	<view class="multiStaff">
		<view class="total">
			<text>员工总数:{{this.shopUser.length}}个</text>
		</view>
		<checkbox-group @change="checkboxChange">
			<label class="select" v-for="item in this.shopUser" :key="item.id" @tap.stop="selectRecycleUser(item)">
				<view class="list">
					<view class="checkbox">
						<checkbox style="transform:scale(0.7)" color="#57BFA3"/>
					</view>
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
			</label>
		</checkbox-group>
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
			
			selectRecycleUser(item){
				let recycleUser = {}
					recycleUser = {
						recycleUser:item,
						recycleUserId:item.id,
						recycleUserName:item.username
					}
				uni.setStorageSync('recycleUser',recycleUser)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
	@import "./multiStaff.scss";
</style>
