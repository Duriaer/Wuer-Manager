<template>
	<view class="guestAdminister">
		<!-- nav -->
		<view class="nav">
			<view class="nav_title">
				<view :class="{'active':navIndex==1}" @tap.stop="tabNav(1)">
					已启用
				</view>
			</view>
			<view class="nav_title">
				<view :class="{'active':navIndex==2}" @tap.stop="tabNav(2)">
					已禁用
				</view>
			</view>
		</view>
		<view class="total">
			<text>员工总数:{{shopUser.length}}个</text>
		</view>
		<template v-if="navIndex==1">
			<view class="list" v-for="item in shopUser" :key="item.id" v-if="item.enable">
				<view class="left">
					<text class="title">{{item.realname}}</text>
					<text>登录账号:{{item.username}}</text>
					<text>手机号码:{{item.telephone}}</text>
					<text>创建时间:{{item.createTime}}</text>
				</view>
				<view class="right">
					<view class="state-y">
						<text>启用</text>
					</view>
					<view class="role">
						<text>销售</text>
					</view>
				</view>
			</view>
		</template>
		<template v-if="navIndex==2">
			<view class="list" v-for="item in shopUser" :key="item.id" v-if="!item.enable">
				<view class="left">
					<text class="title">{{item.realname}}</text>
					<text>登录账号:{{item.username}}</text>
					<text>手机号码:{{item.telephone}}</text>
					<text>创建时间:{{item.createTime}}</text>
				</view>
				<view class="right">
					<view class="state-n">
						<text>禁用</text>
					</view>
					<view class="role">
						<text>销售</text>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,//导航栏index
				shopUser:[],
			};
		},
		onLoad(){
			this.tabNav(1)
			this.getShopUserArr()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addStaff()
			}
		},
	    methods:{
			tabNav(index) {
				if(this.navIndex==1){
					this.shopUser.enable = true
					this.getShopUserArr()
				}else if(this.navIndex==2){
					this.shopUser.enable = false
					this.getShopUserArr()
				}
				this.navIndex = index
			},
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
    @import "./staffAdminister.scss";
</style>
