<template>
	<view class="order-detail">
		<view class="wares">
			<view class="title">
				<text>商品</text>
			</view>
			<view class="content">
				
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="details">
			<view class="title">
				<text>商品描述</text>
			</view>
			<view class="ul">
				<view class="li">
					<view class="left">
						<text>刻印&序列号</text>
					</view>
					<view class="right">
						<text>{{goods.manufacturerCode}}</text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>系列</text>
					</view>
					<view class="right">
						<text>{{goods.goodsTypeName}}</text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>材质</text>
					</view>
					<view class="right">
						<text>{{goods.material}}</text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>尺寸</text>
					</view>
					<view class="right">
						<text>{{goods.size}}</text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>瑕疵</text>
					</view>
					<view class="right">
						<text>{{goods.defects}}</text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>配件</text>
					</view>
					<view class="right">
						<text>{{goods.accessoriesInfo}}</text>
					</view>
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
		}
	}
</script>

<style lang="scss">
    @import "./orderDetails.scss";
</style>
