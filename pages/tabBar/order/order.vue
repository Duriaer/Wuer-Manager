<template>
	<view class="order-box">
		<view class="status"></view>
		<view class="pagination">
			<view class="ul">
				<view class="li">
					<view :class="{'active':navIndex==1}" @tap.stop="tabPagination(1)">销售单</view>
				</view>
				<view class="li">
					<view :class="{'active':navIndex==2}" @tap.stop="tabPagination(2)">预订单</view>
				</view>
				<view class="li">
					<view :class="{'active':navIndex==3}" @tap.stop="tabPagination(3)">退货单</view>
				</view>
			</view>
			<view class="img">
				<image src="../../../static/order/tj.png"></image>
			</view>
		</view>
		<view class="pagination_search">
			<view class="search">
				<image src="../../../static/goods/fdj.png" />
			</view>
			<view class="screen">
				<image src="../../../static/order/sx.png"></image>
				<text>筛选</text>
			</view>
		</view>
		<!-- 统计栏 -->
		<view class="statistics">
			<view class="ul">
				<view class="li">
					<text>订单:</text>
					<text class="number">{{totalCount}}</text>
					<text>件</text>
				</view>
				<view class="li">
					<text>总销售额:</text>
					<text class="number">{{totalSaleAmount}}</text>
					<text>元</text>
				</view>
				<view class="li">
					<text>净利润:</text>
					<text class="number">{{totalGrossProfits}}</text>
					<text>元</text>
				</view>
			</view>
		</view>
		<!-- 销售单 -->
		<view class="order_ul">
			<view class="order_li" v-for="(item,index) in orderArr" :key="index"  @tap.stop="$toOrder(item.id)">
				<view class="right">
					<view class="img">
						<image :src="item.mainItem.imageUrl" lazy-load></image>
					</view>
					<view class="details">
						<view class="title">
							<text v-if="item.mainItem.qualityInfo" style="margin-left: -10rpx;">【{{item.mainItem.qualityInfo}}】</text>
							{{item.mainItem.name}}
						</view>
						<text>销售时间:{{item.orderTime}}</text>
						<text>销售员工:{{item.operatorName}}</text>
						<text>订单客户:{{item.customerName}}</text>
					</view>
				</view>
				<view class="state">
					<view class="top">
						<text v-if="item.orderStatus==1">未确认</text>
						<text v-if="item.orderStatus==2&&navIndex!=2" style="color: #57BFA3;">已销售</text>
						<text v-if="item.orderStatus==3&&navIndex!=2">已取消</text>
						<text v-if="item.orderStatus==2&&navIndex==2" style="color: #EFA22A;">已预定</text>
						<text v-if="item.orderStatus==3&&navIndex==2">预定取消</text>
						<text v-if="item.orderStatus==4">无效订单</text>
						<text v-if="item.orderStatus==5">已退货</text>
						<text v-if="item.orderStatus==6">已关闭</text>
					</view>
					<view class="centre">
						<text class="symbol">¥</text>
						<text>{{item.sumPrice}}</text>
					</view>
					<view class="bot">
						<text v-if="item.orderStatus==2&&navIndex!=2">实收款</text>
						<text v-if="item.orderStatus==2&&navIndex==2">定金</text>
						<text v-if="item.orderStatus==3&&navIndex==2">定金</text>
						<text v-if="item.orderStatus==5">退款</text>
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
				navIndex: 0,//导航栏index
				
				//发送请求
				//页码
				pageNo: 1,
				pageSize: 10,
				//搜索数据
				searchText: '', //搜索文本
				orderTypeList:null, // 订单类型列表 (列表中各项为整型: 0-订单,1-预订单,此项值为null时为不区分订单和预订单),此项传null值时为不限制
				orderStatus:null, // 订单状态列表 (列表中各项为整型: 1-未确认,2-已确认,3-已取消,4-无效,5-退货,6-关闭),此项传null值时为不限制
				operatorIdList: null, // 经办人id列表 (列表中各项长整型，在js中最好转为字符再传递，辟免丢失精度),此项传null值时为不限制
				orderDateStart:null, // 查询下单范围的起始时间(格式：yyyy-MM-dd，如2020-11-01)
				orderDateEdn:null,// 查询下单范围的结束时间(格式：yyyy-MM-dd，如2020-11-07)
				
				totalCount:'',
				totalSaleAmount:'',
				totalGrossProfits:'',
				sumPrice:'',
				orderArr:[],
			};
		},
		onLoad(){
			this.tabPagination(1)
		},
		onPullDownRefresh(){
			if(this.navIndex==1){
				this.orderTypeList = [0]
				this.orderStatus = null
				this.getOrderArr()
			}else if(this.navIndex==2){
				this.orderTypeList = [1]
				this.orderStatus = null
				this.getOrderArr()
			}else if(this.navIndex==3){
				this.orderTypeList = null
				this.orderStatus = [5]
				this.getOrderArr()
			}
		},
		onReachBottom(){
			this.addOrderArr()
		},
		methods:{
			tabPagination(index) {
				if(this.navIndex == index){
					return
				}
				this.navIndex = index
				this.orderArr = []
				this.totalCount = ''
				this.totalSaleAmount = ''
				this.totalGrossProfits =''
				this.sumPrice = ''
				uni.startPullDownRefresh()
				console.log(index)
			},
			//获取订单详情数据
			async getOrderArr(){
				// uni.showLoading()
				let params = {
					pageNo: 1,
					pageSize: this.pageSize,
					// searchText: this.searchText,
					keyText: this.searchText, 
					orderTypeList:this.orderTypeList,
					orderStatus:this.orderStatus,
					operatorIdList: this.operatorIdList,
					orderDateStart:this.orderDateStart,
					orderDateEdn:this.orderDateEdn,
				};
				let res = await this.$post({
					url:'/shopOrder/list',
					data:params,
				})
				// uni.hideLoading()
				uni.stopPullDownRefresh()
				// console.log(res.data)
				let data = res.data.data
				this.totalCount = data.totalCount,
				this.totalSaleAmount = data.totalSaleAmount,
				this.totalGrossProfits = data.totalGrossProfits,
				this.sumPrice = data.sumPrice,
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
				for(let item of data.pageData.records){
					if(item.items.length>0&&item.items[0].goodsSku){
						item.mainItem = item.items[0].goodsSku
						item.mainItem.imageUrl = this.$imgUrl+item.items[0].goodsSku.picList[0].imagePath
					}else{
						item.mainItem = {
							name:'',
							imageUrl:'',
							qualityInfo:'',
						}
					}
				}
				// console.log(data.pageData.records)
				this.orderArr = data.pageData.records
			},
			//下滑订单详情数据
			async addOrderArr(){
				uni.showLoading()
				let params = {
					pageNo: ++this.pageNo,
					pageSize: this.pageSize,
					// searchText: this.searchText,
					keyText: this.searchText, 
					orderTypeList:this.orderTypeList,
					orderStatus:this.orderStatus,
					operatorIdList: this.operatorIdList,
					orderDateStart:this.orderDateStart,
					orderDateEdn:this.orderDateEdn,
				};
				let res = await this.$post({
					url:'/shopOrder/list',
					data:params,
				})
				uni.hideLoading()
				let data = res.data.data
				if(data.pageData.records.length>0){
					for(let item of data.pageData.records){
						if(item.items.length>0&&item.items[0].goodsSku){
							item.mainItem = item.items[0].goodsSku
							item.mainItem.imageUrl = this.$imgUrl+item.items[0].goodsSku.picList[0].imagePath
						}else{
							iitem.mainItem = {
								name:'',
								imageUrl:'',
								qualityInfo:'',
							}
						}
						this.orderArr.push(item)
					}
				}else{
					--this.pageNo
					uni.showToast({
						title:'没有更多了',
						icon:'none',
						position:'bottom'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "./order.scss";
</style>
