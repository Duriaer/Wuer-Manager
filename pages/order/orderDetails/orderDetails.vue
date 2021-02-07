<template>
	<view class="order-detail">
		<view class="head">
			<view class="left">
				<image src="../../../static/addGoods/fh.png"></image>
			</view>
			<view class="middle">
				<text>销售单信息</text>
			</view>
			<view class="right">
				<text>查看日志</text>
			</view>
		</view>
		<view class="wares">
			<view class="title">
				<text>商品</text>
				<image src="../../../static/addGoods/go.png"></image>
			</view>
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
					<view class="right">
						<text>已销售</text>
					</view>
				</view>
				<view class="bot">
					<view class="left">
						<text>销售价¥销售价</text>
					</view>
					<view class="middle">
						<text>优惠¥600</text>
					</view>
					<view class="right">
						<text>实付价</text><text>¥</text><text>100800</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="details">
			<view class="title">
				<text>订单详情</text>
			</view>
			<view class="ul">
				<view class="li">
					<view class="left">
						<text>单号</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>实付金额（元）</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>客户类型</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>客户名称</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>销售员工</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>销售日期</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>发货方式</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>备注</text>
					</view>
					<view class="right">
						<text></text>
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
