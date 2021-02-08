<template>
	<view class="order-detail">
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
					<view class="li">
						<text>销售价</text>
						<text class="symbol">¥</text>
						<text>155862</text>
					</view>
					<view class="li">
						<text>优惠</text>
						<text class="symbol">¥</text>
						<text>600</text>
					</view>
					<view class="li">
						<text class="paid">实付价</text>
						<text class="symbol" style="color: #EFA22A;">¥</text>
						<text class="price">155262</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="cancel">
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
		<!-- 退货详情 -->
		<view class="details">
			<view class="title">
				<text>退货详情</text>
			</view>
			<view class="ul">
				<view class="li">
					<view class="left">
						<text>退款金额</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>退货员工</text>
					</view>
					<view class="right">
						<text></text>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<text>退货日期</text>
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
		<view class="bottom-but">
			<view class="left">
				<text>编辑</text>
			</view>
			<!-- <view class="middle">
				<text>取消</text>
			</view> -->
			<view class="right" @tap.stop="showPopup()">
				<text>退货</text>
			</view>
		</view>
		<view class="popupMask" v-if="popupMaskShow" @touchmove.prevent @tap.stop="hidePopup()">
			<view class="popup" @tap.stop>
				<view class="popup-title">
					<text>退货</text>
				</view>
				<view class="popupul">
					<view class="line_input">
						<view class="left">
							<text>退款金额（元）</text>
						</view>
						<view class="right">
							<text>1000</text>
						</view>
					</view>
					<view class="line_textarea">
						<view class="line_name">
							<text>备注</text>
						</view>
						<view class="textarea">
							<textarea placeholder="请输入" maxlength="100" />
							<text class="count">0/100</text>
						</view>
					</view>
				</view>
				<view class="popup_btn">
					<view class="popup_left" @tap.stop="hidePopup()">取消</view>
					<view class="popup_right">确定</view>
				</view>
				<view class="safety"></view>
			</view>
		</view>
		<view class="safety"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupMaskShow: false //弹窗蒙层
			};
		},
		methods:{
			//弹窗
			showPopup(){
				this.popupMaskShow = true
			},
			//关闭弹窗
			hidePopup(){
				this.popupMaskShow = false
			},
		}
	}
</script>

<style lang="scss">
    @import "./orderDetails.scss";
</style>
