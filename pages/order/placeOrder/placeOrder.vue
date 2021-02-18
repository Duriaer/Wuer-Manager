<template>
	<view class="place-order">
		<view class="group">
			<view class="line_button">
				<view class="line_name">
					<text>客户类型</text>
				</view>
				<view class="right">
					<text :class="!customertype?'active':''" @tap.stop="tabCustomertype(0)">客人</text>
				    <text :class="customertype?'active':''" @tap.stop="tabCustomertype(1)">同行</text>
				</view>
			</view>
			<view class="line_picker">
				<view class="line_name">
					<text>客户名称</text><!-- 默认匿名 -->
				</view>
				<view class="right">
					<picker>
						<view class="picker">
							<text class="noSet">请选择</text>
							<text></text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="line_picker">
				<view class="line_name">
					<text>销售员工</text>
				</view>
				<view class="right">
					<picker :value="shopUserIndex" :range="shopUserPickerArr" @change="pickerChang($event,'shopUser')" >
						<view class="picker">
							<text class="noSet" v-if="!shopUserId">请选择</text>
							<text v-else>{{shopUserName}}</text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="commodity">
			<view class="content">
				<view class="img">
					<image src="../../../static/addGoods/add.png"></image>
				</view>
				<view class="middle">
					<view class="goods-title">
						<text style="margin-left: -10rpx;">【99新】GUCCI 迷你手提包单肩背</text>
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
					<view class="money">
						<text class="paid">销售价</text>
						<text class="symbol" style="color: #EFA22A;">¥</text>
						<text class="price">155262</text>
					</view>
				</view>
			</view>
		</view>
		<view class="payment">
			<view class="line_picker">
				<view class="line_name">
					<text>实付金额(元)</text><!-- realPrice -->
				</view>
				<view class="right">
					<input type="text" placeholder="请填写金额" />
				</view>
			</view>
			<view class="line_picker">
				<view class="line_name">
					<text>发货方式</text>
				</view>
				<view class="right">
					<picker :value="deliveryIndex" :range="deliveryPickerArr" @change="pickerChang($event,'delivery')" >
						<view class="picker">
							<text class="noSet" v-if="!delivery">请选择</text>
							<text v-else>{{deliveryInfo}}</text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="line_textarea">
				<view class="line_name">
					<text>备注</text>
				</view>
				<view class="textarea">
					<textarea  placeholder="请输入" maxlength="100"/>
					<text class="count">0/200</text>
				</view>
			</view>
			<view class="line_img">
				<view class="line_name">
					<view class="left">
						<text>附件</text>
					</view>
					<text class="right">0/3 张</text>
				</view>
				<view class="img_ul">
					<image src="../../../static/addGoods/add.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="bot">
			<view class="left">
				<text class="paid">合计</text>
				<text class="symbol">¥</text>
				<text class="price">108500</text>
			</view>
			<view class="right">
				<text>下单</text>
			</view>
		</view>
		<view class="safety"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customertype:false,//客户类型 客人/同行
				
				shopUserId:'',//所有员工id
				shopUserName:'',//所有员工名
				shopUserArr:[],//所有员工 传id 获取
				shopUserPickerArr:[],//所有员工选择器数组
				shopUserIndex:'',
				
				delivery:'',//发货方式
				deliveryInfo:'',//发货方式描述
				deliveryArr:[],//发货方式数组
				deliveryPickerArr:[],//发货方式选择器数组
				deliveryIndex:'',
			};
		},
		onLoad() {
			this.getPickerArr('/goodsSku/getShopUserItems')
			this.getPickerArr('/goodsSku/getDeliveryMethodItems')
			
		},
		watch:{
			deliveryIndex(val){
				this.delivery = this.deliveryArr[val].itemValue
				this.deliveryInfo = this.deliveryArr[val].itemName
			},
			shopUserIndex(val){
				this.shopUserId = this.shopUserArr[val].id
				this.shopUserName = this.shopUserArr[val].username
			}
		},
		methods:{
			tabCustomertype(type){
				this.customertype = type
			},
			//普通选择器触发
			pickerChang(e,type){
				if(type == 'shopUser'){
					this.shopUserIndex = e.detail.value
				}else if(type == 'delivery'){
					this.deliveryIndex = e.detail.value
				}
			},
			//获取选择器数组
			async getPickerArr(url){
				let res = await this.$get({
					url:url,
				})
				if(url == '/goodsSku/getShopUserItems'){
					this.shopUserArr = res.data.data
					for(let item of res.data.data){
						this.shopUserPickerArr.push(item.username)
					}
				}else if(url == '/goodsSku/getDeliveryMethodItems'){
					this.deliveryArr = res.data.data
					for(let item of res.data.data){
						this.deliveryPickerArr.push(item.itemName)
					}
				}
			},
		}
	}
</script>

<style lang="scss">
    @import "./placeOrder.scss";
</style>
