<template>
	<view class="orderScreen">
		<view class="message">
			<view class="ul">
				<view class="line_picker">
					<view class="line_name">
						<text>订单状态</text><!-- 只有已销售和已取消 -->
					</view>
					<view class="right">
						<picker>
							<view class="picker">
								<text class="noSet">请选择</text>
								<text>{{orderStatus}}</text>
								<image src="../../../static/addGoods/go.png" ></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>销售员工</text>
					</view>
					<view class="right" >
						<view class="picker" @tap.stop="$toSingleStaff(1)">
							<text class="noSet" v-if="!operatorId">请选择</text>
							<text v-else>{{operatorName}}</text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>回收员工</text>
					</view>
					<view class="right" @tap.stop="$toSingleStaff(2)">
						<view class="picker">
							<text class="noSet" v-if="!recycleUserId">请选择</text>
							<text v-else>{{recycleUserName}}</text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>鉴定员工</text>
					</view>
					<view class="right"  @tap.stop="$toSingleStaff(3)">
						<view class="picker">
							<text class="noSet" v-if="!checkupUserId">请选择</text>
							<text v-else>{{checkupUserName}}</text>
							<image src="../../../static/addGoods/go.png" ></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="date">
			<view class="ul">
				<view class="line_picker">
					<view class="line_name">
						<text>快捷日期</text>
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
						<text>开始日期</text>
					</view>
					<view class="right">
						<picker mode="date" :value="orderDateStart" :start="startDate" :end="endDate" @change="orderDateStartChange">
							<view class="picker">
								<text class="noSet" v-if="!orderDateStart">请选择</text>
								<text>{{orderDateStart}}</text>
								<image src="../../../static/addGoods/go.png" ></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>结束日期</text>
					</view>
					<view class="right">
						<picker mode="date" :value="orderDateEdn" :start="orderDateStart" :end="endDate" @change="orderDateEdnChange">
							<view class="picker">
								<text class="noSet" v-if="!orderDateEdn">请选择</text>
								<text>{{orderDateEdn}}</text>
								<image src="../../../static/addGoods/go.png" ></image>
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="botBox">
			<view class="bottom-but">
				<view class="left">
					<text>重置</text>
				</view>
				<view class="right">
					<text>筛选</text>
				</view>
			</view>
			<view class="safety"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				searchText: '', //搜索文本
				orderType:null, // 订单类型列表 (列表中各项为整型: 0-订单,1-预订单,此项值为null时为不区分订单和预订单),此项传null值时为不限制
				orderStatus:null, // 订单状态列表 (列表中各项为整型: 1-未确认,2-已确认,3-已取消,4-无效,5-退货,6-关闭),此项传null值时为不限制
				operatorIdList: null, // 经办人id列表 (列表中各项长整型，在js中最好转为字符再传递，辟免丢失精度),此项传null值时为不限制
				
				operatorId:'',//销售员工id
				operatorName:'',//销售员工用户名
				
				recycleUserId:'',//回收员工id
				recycleUserName:'',//回收员工用户名
				
				checkupUserId:'',//鉴定员工id
				checkupUserName:'',//鉴定员工用户名
				
				date:'',
				orderDateStart:'',//开始时间
				orderDateEdn:'',//结束时间
			};
		},
		onLoad(){
			this.getShopOrder()
		},
		onShow() {
			this.getOperator()
			this.getCheckupUser()
			this.getRecycleUser()
		},
		computed:{
			startDate(){
				return this.getDate('start');
			},
			endDate(){
				return this.getDate('end');
			}
		},
		methods:{
			orderDateStartChange: function(e) {
				this.orderDateStart = e.target.value
			},
			orderDateEdnChange: function(e) {
				this.orderDateEdn = e.target.value
			},
			getDate(type){
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if(type === 'start') {
					year = year - 60;
				}else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//选择销售员工
			getOperator(){
				let data = uni.getStorageSync('operator')
				if(this.$isObject(data)&&data !={}){
					this.operatorId = data.id
					this.operatorName = data.username
					uni.removeStorageSync('operator')
				}
			},
			//选择回收员工
			getRecycleUser(){
				let data = uni.getStorageSync('recycleUser')
				if(this.$isObject(data)&&data!={}){
					console.log(data)
					this.recycleUserId = data.id
					this.recycleUserName = data.username
					uni.removeStorageSync('recycleUser')
				}
			},
			//选择鉴定员工
			getCheckupUser(){
				let data = uni.getStorageSync('checkupUser')
				if(this.$isObject(data)&&data !={}){
					this.checkupUserId = data.id
					this.checkupUserName = data.username
					uni.removeStorageSync('checkupUser')
				}
			},
			// 获取订单列表
			async getShopOrder(){
				let params = {
					keyText: this.searchText, //搜索关键字(字符串)
					orderType:this.orderType,
					orderStatus:this.orderStatus,
					operatorIdList: this.operatorIdList,
					orderDateStart:this.orderDateStart,
					orderDateEdn:this.orderDateEdn,
				};
				let res = await this.$post({
					url:'/shopOrder/list',
					data:params,
				})
				console.log(res.data.data)
				this.shopOrder = res.data.data
			},
		}
	}
</script>

<style lang="scss">
    @import "./orderScreen.scss";
</style>
