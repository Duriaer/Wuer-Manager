<template>
	<view class="place-order">
		<view class="group">
			<view class="line_button">
				<view class="line_name">
					<text>客户类型</text>
				</view>
				<view class="right">
					<view><text >客人</text></view>
					<view><text>同行</text></view>
				</view>
			</view>
			<view class="line_picker">
				<view class="line_name">
					<text>客户名称</text>
				</view>
				<view class="right">
					<!-- <picker>
						<view class="picker">
							<text class="noSet">请选择</text>
							<text v-else></text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</picker> -->
				</view>
			</view>
			<view class="line_picker">
				<view class="line_name">
					<text>销售员工</text>
				</view>
				<view class="right">
					<!-- <picker>
						<view class="picker">
							<text class="noSet">请选择</text>
							<text v-else></text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</picker> -->
				</view>
			</view>
		</view>
		<view class="commodity">
			<view class="content">
				<view class="top">
					<view class="img">
						<image src="../../../static/addGoods/add.png"></image>
					</view>
					<view class="middle">
						<view class="goods-title">
							<text style="margin-left: -10rpx;">【99新】GUCCI 迷你手提包</text>
						</view>
						<view class="label">
							<!-- <view class="label_li" v-if="item.originTypeInfo=='店铺囤货'" style="background:#E5F9F4 ;color: #57BFA3;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='回收客人'" style="background:#EFF7FF ;color: #759FFF;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='客人寄售'" style="background:#FFF3E2 ;color: #EFA22A;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='合作销售'" style="background:#FFF0F5 ;color: #DDA0DD;">
								<text>{{item.originTypeInfo}}</text>
							</view> -->
							<!-- 自定义标签 -->
							<!-- <view class="label_li labal_li2" v-if="item.customLabelList!=null&&item.customLabelList!=''">
								<text>{{item.customLabelList}}</text>
							</view> -->
							<!-- 品牌标签 -->
							<!-- <view class="label_li">
								<text>{{item.goodsBrandName}}</text>
							</view> -->
							<!-- 分类标签 -->
							<!-- <view class="label_li">
								<text>{{item.goodsTypeName}}</text>
							</view> -->
							<view class="label_li">
								<text>拉啊啦啦</text>
							</view>
						</view>
						<view class="address">
							<image src="../../../static/goods/coordinate.png"></image>
							<text>什么什么店</text>
						</view>
					</view>
				</view>
				<view class="bot">
					<view class="li">
						<text class="paid">销售价</text>
						<text class="symbol" style="color: #EFA22A;">¥</text>
						<text class="price">155262</text>
					</view>
				</view>
			</view>
		</view>
		<view class="payment">
			
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
    @import "./placeOrder.scss";
</style>
