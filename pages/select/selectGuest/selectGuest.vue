<template>
	<view class="selectGuest">
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
				listArr:[],
			};
		},
		onShow(){
			this.getListArr()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addGuest()
			}
		},
		methods:{
			// 获取本店所有员工
			async getListArr(){
				let res = await this.$post({
					url:'/customer/list',
					data:{
						keyText:'',
						pageNo: 1,
						pageSize: 999,
					}
				})
				console.log(res)
				this.listArr = res.data.data
			},
			
			selectListArr(item){
				let data = {
					user:item,
					id:item.id,
					username:item.username
				}
				uni.setStorageSync('selectGuest',data)
				this.$back()
			},
		}
	}
</script>

<style lang="scss">
	@import "./selectGuest.scss";
</style>
