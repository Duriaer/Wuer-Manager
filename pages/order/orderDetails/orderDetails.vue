<template>
	<view class="order-detail">
		<view class="wares">
			<view class="title">
				<text>商品</text>
				<image src="../../../static/addGoods/go.png"></image>
			</view>
			<view class="content" >
				<view class="top">
					<view class="img">
						<image :src="$imgUrl+pic.imagePath"></image>
					</view>
					<view class="middle">
						<view class="goods-title">
							<text style="margin-left: -10rpx;">【{{order.qualityInfo}}】</text>
							<text>{{order.name}}</text>
						</view>
						<view class="label">
							<view class="label_li" v-if="order.originTypeInfo=='店铺囤货'" style="background:#E5F9F4 ;color: #57BFA3;">
								<text>{{order.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="order.originTypeInfo=='回收客人'" style="background:#EFF7FF ;color: #759FFF;">
								<text>{{order.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="order.originTypeInfo=='客人寄售'" style="background:#FFF3E2 ;color: #EFA22A;">
								<text>{{order.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="order.originTypeInfo=='合作销售'" style="background:#FFF0F5 ;color: #DDA0DD;">
								<text>{{order.originTypeInfo}}</text>
							</view>
							<!-- 自定义标签 -->
							<view class="label_li labal_li2" v-if="order.customLabelList!=null&&order.customLabelList!=''">
								<text>{{order.customLabelList}}</text>
							</view>
							<!-- 品牌标签 -->
							<view class="label_li">
								<text>{{order.goodsBrandName}}</text>
							</view>
							<!-- 分类标签 -->
							<view class="label_li">
								<text>{{order.goodsTypeName}}</text>
							</view>
						</view>
						<view class="address"  v-if="order.storePlaceName">
							<image src="../../../static/goods/coordinate.png"></image>
							<text>{{order.storePlaceName}}</text>
						</view>
					</view>
					<view class="right">
						<text v-if="mode == 'sale'">已销售</text>
						<text v-if="mode == 'reserve'">已预定</text>
					</view>
				</view>
				<view class="bot">
					<view class="li">
						<text>销售价</text>
						<text class="symbol">¥</text>
						<text>{{order.salePrice}}</text>
					</view>
					<view class="li">
						<text class="paid" v-if="mode == 'sale'">实付价</text>
						<text class="paid" v-if="mode == 'reserve'">定金</text>
						<text class="symbol" style="color: #EFA22A;">¥</text>
						<text class="price" v-if="mode == 'sale'">{{ord.actualPaidAmount}}</text><!-- 销售单 -->
						<text class="price" v-if="mode == 'reserve'">{{ord.downPayment}}</text><!-- 预订单 -->
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
				<view class="li" v-if="ord.orderNo">
					<view class="left">
						<text>单号</text>
					</view>
					<view class="right">
						<text>{{ord.orderNo}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.actualPaidAmount">
					<view class="left">
						<text>实付金额（元）</text>
					</view>
					<view class="right">
						<text>{{ord.actualPaidAmount}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.customerTypeDesc">
					<view class="left">
						<text>客户类型</text>
					</view>
					<view class="right">
						<text>{{ord.customerTypeDesc}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.customerName">
					<view class="left">
						<text>客户名称</text>
					</view>
					<view class="right">
						<text>{{ord.customerName}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.operatorName">
					<view class="left">
						<text>销售员工</text>
					</view>
					<view class="right">
						<text>{{ord.operatorName}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.orderTime">
					<view class="left">
						<text>销售日期</text>
					</view>
					<view class="right">
						<text>{{ord.orderTime}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.deliveryMethodDesc">
					<view class="left">
						<text>发货方式</text>
					</view>
					<view class="right">
						<text>{{ord.deliveryMethodDesc}}</text>
					</view>
				</view>
				<view class="li" v-if="ord.remark">
					<view class="left">
						<text>备注</text>
					</view>
					<view class="right">
						<text>{{ord.remark}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 退货详情 -->
		<!-- <view class="details">
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
		</view> -->
		<view class="footer_placeholder"></view>
		<view class="botBox">
			<view class="bottom-but" v-if="mode == 'sale'">
				<view class="left">
					<text>编辑</text>
				</view>
				<view class="right" @tap.stop="showPopup()">
					<text>退货</text>
				</view>
			</view>
			<view class="bottom-but" v-if="mode == 'reserve'">
				<view class="left">
					<text>编辑</text>
				</view>
				<view class="middle">
					<text>取消</text>
				</view>
				<view class="right" @tap.stop="showPopup()">
					<text>付尾款</text>
				</view>
			</view>
			<view class="safety"></view>
		</view>
		
		
		<view class="popupMask" v-if="popupMaskShow" @touchmove.prevent @tap.stop="hidePopup()">
			<view class="popup" @tap.stop v-if="mode == 'sale'">
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
			<view class="popup" @tap.stop v-if="mode == 'reserve'">
				<view class="popup-title">
					<text>付尾款</text>
				</view>
				<view class="popupul">
					<view class="line_input">
						<view class="left">
							<text>尾款金额（元）</text>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode:'',
				token:uni.getStorageSync('token'),
				shopId: uni.getStorageSync("shopUser").shopId,
				id:'',
				ord:{
					
				},
				order:{
					
				},
				pic:'',
				popupMaskShow: false //弹窗蒙层
			};
		},
		onLoad(options){
			console.log(options)
			if(options.mode){
				this.mode = options.mode
			}else{
				this.mode = 'sale'
			}
			if(this.mode == 'sale'){
				uni.setNavigationBarTitle({title:'销售单信息'})
			}else if(this.mode == 'reserve'){
				uni.setNavigationBarTitle({title:'预订单信息'})
			}
			this.id = options.id
			this.getOrderDetails()
		},
		methods:{
			//获取订单详情数据
			async getOrderDetails(){
					let res = await this.$get({
						url:'/shopOrder/detail?id='+this.id,
					})
					console.log(res.data.data)
					this.ord = res.data.data
					this.order = res.data.data.items[0].goodsSku
					this.pic = this.order.picList[0]
					console.log(res.data.data.items[0].goodsSku)
			},
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
