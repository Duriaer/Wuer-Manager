<template>
	<view class="order-box">
		<view class="status"></view>
		<view class="pagination">
			<view class="ul">
				<view class="li">
					<text>销售单</text>
				</view>
				<view class="line"></view>
				<view class="li">
					<text>预订单</text>
				</view>
				<view class="line"></view>
				<view class="li">
					<text>退货单</text>
				</view>
			</view>
			<view class="img">
				<image src="../../../static/order/tj.png"></image>
			</view>
		</view>
		<view class="pagination_search">
			<view class="search">
				<image src="../../../static/depot/fdj.png" />
			</view>
			<view class="screen">
				<image src="../../../static/order/sx.png"></image>
				<text>筛选</text>
			</view>
		</view>
		<view class="statistics">
			<view class="ul">
				<view class="li">
					<text>订单:</text>
					<text class="number">1</text>
					<text>件</text>
				</view>
				<view class="li">
					<text>总销售额:</text>
					<text class="number">648654657</text>
					<text>元</text>
				</view>
				<view class="li">
					<text>净利润:</text>
					<text class="number">416847878</text>
					<text>元</text>
				</view>
			</view>
		</view>
		<view class="order-details">
			<view class="img">
				<image src="../../../static/addGoods/add.png"></image>
			</view>
			<view class="details">
				<view class="title">
					<text style="margin-left: -10rpx;">【99新】GUCCI 迷你手提包</text>
				</view>
				<text>销售时间:2021-02-02 15:13</text>
				<text>销售员工:莉莉卡</text>
				<text>订单客户:薇薇安</text>
			</view>
			<view class="state">
				<view class="top">
					<text>已销售</text>
				</view>
				<view class="centre">
					<text class="symbol">¥</text>
					<text>10000</text>
				</view>
				<view class="bot">
					<text>实收款</text>
				</view>
			</view>
		</view>
		<view class="order-details">
			<view class="img">
				<image src="../../../static/addGoods/add.png"></image>
			</view>
			<view class="details">
				<view class="title">
					<text style="margin-left: -10rpx;">【99新】GUCCI 迷你手提包</text>
				</view>
				<text>销售时间:2021-02-02 15:13</text>
				<text>销售员工:莉莉卡</text>
				<text>订单客户:薇薇安</text>
			</view>
			<view class="state">
				<view class="top">
					<text>已销售</text>
				</view>
				<view class="centre">
					<text class="symbol">¥</text>
					<text>10000</text>
				</view>
				<view class="bot">
					<text>实收款</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
	}
</script>

<style lang="scss">
	@import "./order.scss";
</style>
