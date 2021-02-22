<template>
	<view class="staffManagement">
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
			<text>员工总数:999个</text>
		</view>
		<view class="list">
			<view class="left">
				<text class="title">大美丽</text>
				<text>登录账号:</text>
				<text>手机号码:</text>
				<text>创建时间:</text>
			</view>
			<view class="right">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex: 0,//导航栏index
			};
		},
		onLoad(){
			this.tabNav(1)
		},
	    methods:{
			tabNav(index) {
				if(this.navIndex == index){
					return
				}
				this.navIndex = index
			},
		}
	}
</script>

<style lang="scss">
    @import "./staffAdminister.scss";
</style>
