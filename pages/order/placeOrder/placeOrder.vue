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
				<view class="right" @tap.stop="$toPath('../../select/singleStaff/singleStaff')">
					<view class="picker">
						<text class="noSet" v-if="!operatorId">请选择</text>
						<text v-else>{{operatorName}}</text>
						<image src="../../../static/addGoods/go.png" ></image>
					</view>
				</view>
			</view>
		</view>
		<view class="commodity">
			<view class="content">
				<view class="img">
					<image :src="$imgUrl+pic.imagePath"></image>
				</view>
				<view class="middle">
					<view class="goods-title">
						<text style="margin-left: -10rpx;">【{{goods.qualityInfo}}】{{goods.name}}</text>
					</view>
					<view class="label">
						<view class="label_li" v-if="goods.originTypeInfo=='店铺囤货'" style="background:#E5F9F4 ;color: #57BFA3;">
							<text>{{goods.originTypeInfo}}</text>
						</view>
						<view class="label_li" v-else-if="goods.originTypeInfo=='回收客人'" style="background:#EFF7FF ;color: #759FFF;">
							<text>{{goods.originTypeInfo}}</text>
						</view>
						<view class="label_li" v-else-if="goods.originTypeInfo=='客人寄售'" style="background:#FFF3E2 ;color: #EFA22A;">
							<text>{{goods.originTypeInfo}}</text>
						</view>
						<view class="label_li" v-else-if="goods.originTypeInfo=='合作销售'" style="background:#FFF0F5 ;color: #DDA0DD;">
							<text>{{goods.originTypeInfo}}</text>
						</view>
						<!-- 自定义标签 -->
						<!-- <view class="label_li labal_li2" v-if="goods.customLabelList!=null&&goods.customLabelList!=''">
							<text>{{goods.customLabelList}}</text>
						</view> -->
						<!-- 品牌标签 -->
						<view class="label_li">
							<text>{{goods.goodsBrandName}}</text>
						</view>
						<!-- 分类标签 -->
						<view class="label_li">
							<text>{{goods.goodsTypeName}}</text>
						</view>
					</view>
					<view class="address">
						<image src="../../../static/goods/coordinate.png"></image>
						<text>{{goods.storePlaceName}}</text>
					</view>
					<view class="money"><!-- 选择客人时为销售价 选择同行时为同行价 -->
						<text class="paid">销售价</text>
						<text class="symbol" style="color: #EFA22A;">¥</text>
						<text class="price">{{goods.salePrice}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="payment">
			<view class="line_input" v-if="mode == 'sale'">
				<view class="line_name">
					<text>实付金额(元)</text>
				</view>
				<view class="right">
					<input v-model="realPrice" type="text" placeholder="请填写金额" />
				</view>
			</view>
			<view class="line_input" v-if="mode == 'reserve'">
				<view class="line_name">
					<text>定金(元)</text>
				</view>
				<view class="right">
					<input v-model="downPayment" type="text" placeholder="请填写金额" />
				</view>
			</view>
			<view class="line_picker" v-if="mode == 'sale'">
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
					<textarea v-model="remark" placeholder="请输入" maxlength="100"/>
					<text class="count">{{remark.length}}/100</text>
				</view>
			</view>
			<view class="line_img" v-if="mode == 'sale'">
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
		<view class="footer_placeholder"></view>
		<view class="botBox">
			<view class="bot">
				<view class="left">
					<text class="paid">合计</text>
					<text class="symbol" v-if="realPrice">¥</text>
					<text class="price">{{realPrice}}</text>
				</view>
				<view class="right">
					<text>下单</text>
				</view>
			</view>
			<view class="safety"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:uni.getStorageSync('token'),
				shopUser: uni.getStorageSync("shopUser"),
				shopId: uni.getStorageSync("shopUser").shopId,
				
				mode:'',
				goods:{
					
				},
				pic:'',
				realPrice:'',// 订单实售总价
				downPayment:'',//定金
				remark:'',// 备注
				
				customertype:false,//客户类型 客人/同行
				
				operatorId:'',//销售员工id
				operatorName:'',//销售员工
				
				delivery:'',//发货方式
				deliveryInfo:'',//发货方式描述
				deliveryArr:[],//发货方式数组
				deliveryPickerArr:[],//发货方式选择器数组
				deliveryIndex:'',
				
			};
		},
		onLoad(options) {
			console.log(options)
			if(options.mode){
				this.mode = options.mode
			}else{
				this.mode = 'sale'
			}
			if(this.mode == 'sale'){
				uni.setNavigationBarTitle({title:'下单'})
			}else if(this.mode == 'reserve'){
				uni.setNavigationBarTitle({title:'预订'})
			}
			this.goodsId = options.id
			//搜索商品信息的函数（接口）
			this.getDetailArr()
			this.getShopUser()
			this.getPickerArr('/goodsSku/getDeliveryMethodItems')
		},
		watch:{
			deliveryIndex(val){
				this.delivery = this.deliveryArr[val].itemValue
				this.deliveryInfo = this.deliveryArr[val].itemName
			},
		},
		methods:{
			tabCustomertype(type){
				this.customertype = type
			},
			//普通选择器触发
			pickerChang(e,type){
				if(type == 'delivery'){
					this.deliveryIndex = e.detail.value
				}
			},
			//获取选择器数组
			async getPickerArr(url){
				let res = await this.$get({
					url:url,
				})
				if(url == '/goodsSku/getDeliveryMethodItems'){
					this.deliveryArr = res.data.data
					for(let item of res.data.data){
						this.deliveryPickerArr.push(item.itemName)
					}
				}
			},
			getShopUser(){
				let user = uni.getStorageSync('user')
				if(this.$isObject(user)&&user!={}){
					this.operatorId = user.userId
					this.operatorName = user.userName
					uni.removeStorageSync('user')
				}
			},
			// 获取商品详情数据
			async getDetailArr(){
				let res = await this.$get({
					url:'/goodsSku/detail?id='+this.goodsId,
				})
				console.log(res.data.data)
				this.goods = res.data.data
				this.pic = this.goods.picList[0]
			},
			//保存订单
			async saveOrder(){
				uni.showLoading()
				if(this.operatorId==''||this.operatorId==null){
					uni.hideLoading()
					uni.showToast({
						title:'请选择销售员工',
						icon:'none'
					})
					return
				}else if(this.delivery==''||this.delivery==null){
					uni.hideLoading()
					uni.showToast({
						title:'请选择发货方式',
						icon:'none'
					})
					return
				}
				let res = await this.$post({
					url:'/shopOrder/save',
					data:{
						"accessories": this.accessories,
						"actualPaidAmount": this.actualPaidAmount,//实付金额
						
						// consignee	收货人
						
						// createTime	
						// customerId	// 客户id
						
						// customerName	// 客户名称
						
						// customerType	// 客户类型(代码)：1-客人,2-同行
						
						// customerTypeDesc	// 客户类型描述：1-客人,2-同行
						
						// deliveryMethod	// 快递方式代码
						
                        // deliveryMethodDesc	// 快递方式描述
						
						// deliveryPrice// 快递费
						
						// downPayment	// 预付金额
						
						// goodsSkuId	// 商品id
						
						// hasPaid	// 是否已付款
						
						// id	integer($int64)
						// itemCount	// 订单项数量
						
						
						// operator	ShopUser{...}
						// operatorId	// 操作员工id
						
						// operatorName	// 操作员工用户名
						
						// orderNo	// 订单号
						
						// orderStatus	// 订单状态: 1-未确认,2-已确认,3-已取销,4-无效,5-退货,6-已关闭
						
						// orderTime	// 下(预)订单时间,格式:　yyyy-MM-dd HH:mm:ss
						
						// payTime	// 付款时间，格式：yyyy-MM-dd HH:mm:ss
						
						// payType	// 付款方式
						
						// realPrice	// 订单实售总价
						
						// remark	// 备注
						
						// reserved	// 是否是预订单 boolean
						
						// shop	Shop{...}
						// shopId	// 门店id
					},
				})
				uni.hideLoading()
				if(res.data.succeed){
					uni.showToast({title:'下单成功',icon:'none'})
					setTimeout(()=>{
						this.$back()
					},500)
				}else if(res.data.failed){
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
    @import "./placeOrder.scss";
</style>
