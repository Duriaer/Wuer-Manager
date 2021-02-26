<template>
	<view class="guestAdminister">
		<view class="total">
			<text>员工总数:999个</text>
		</view>
		<view class="list">
			<view class="left">
				<view class="title">
					<text>大美丽</text>
					<image src="../../../static/administer/man.png"></image>
				</view>
				<text>手机号码:</text>
				<text>创建时间:</text>
				<text>最后交易:</text>
			</view>
			<view class="right">
				<view class="top">
					<view class="li">
						<text>vip</text>
					</view>
					<view class="li">
						<text>vvip</text>
					</view>
				</view>
				<view class="bot">
					<image src="../../../static/administer/phone.png"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="left">
				<view class="title">
					<text>大美丽</text>
					<image src="../../../static/administer/women.png"></image>
				</view>
				<text>手机号码:</text>
				<text>创建时间:</text>
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
				customer:'',
				
				pageNo: 1,
				pageSize: 10,
				keyText: '', //搜索关键字
			};
		},
		onShow() {
			this.getCustomer()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addGuest()
			}
		},
		methods:{
			// 获取客户列表
			async getCustomer(){
				let params = {
					pageNo: 1,
					pageSize: this.pageSize,
					keyText: this.keyText, //搜索关键字(字符串)
				};
				let res = await this.$post({
					url:'/customer/list',
					data:params,
				})
				console.log(res.data.data)
				this.customer = res.data.data
			},
		}
	}
</script>

<style lang="scss">
    @import "./guestAdminister.scss";
</style>
