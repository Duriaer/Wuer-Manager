<template>
	<view class="addStaff">
		<view class="message">
			<view class="title">
				<text>基本信息</text>
			</view>
			<view class="ul">
				<view class="line_input">
					<view class="line_name">
						<text>姓名</text><text class="star">*</text>
					</view>
					<view class="right">
						<input v-model="realname" type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="line_radio">
					<view class="line_name">
						<text>性别</text>
					</view>
					<view class="right">
						<radio-group class="gender">
							<radio value="sex" color="#57BFA3" style="transform:scale(0.6)" />男
							<radio value="sex" color="#57BFA3" style="transform:scale(0.6)" />女
						</radio-group>
					</view>
				</view>
				<view class="line_input">
					<view class="line_name">
						<text>手机</text>
					</view>
					<view class="right">
						<input v-model="telephone" type="number" placeholder="请输入" />
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>角色</text>
					</view>
					<view class="right">
						<picker>
							<view class="picker">
								<text class="noSet">请选择</text>
								<text>{{roleName}}</text>
								<image src="../../../../static/addGoods/go.png" ></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="line_switch">
					<view class="line_name">
						<text>状态</text>
					</view>
					<view class="right"><!-- enable -->
						<switch checked color="#57BFA3" style="transform:scale(0.6)"/>
						<text>启用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="account">
			<view class="title">
				<text>登录账号</text>
			</view>
			<view class="ul">
				<view class="line_input">
					<view class="line_name">
						<text>账号</text><text class="star">*</text>
					</view>
					<view class="right">
						<input v-model="username" type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="line_input">
					<view class="line_name">
						<text>密码</text><text class="star">*</text>
					</view>
					<view class="right">
						<input v-model="password" password="ture" type="text" placeholder="请输入" />
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
				realname:'',	//真实名
				sex:'',	//性别
				telephone:'',	//电话
				
				roleName:'',	//角色名称
				roleNameArr:[],//角色名称数组
				roleNamePickerArr:[],//角色名称选择器数组
				roleNameIndex:'',
				
				enable:'',	//启用状态	
				username:'',	//用户名
				password:'',	//密码
				
				shopRole:'',
				
				
				
			};
		},
		onLoad() {
			this.getDetailArr()
			this.getShopRole()
		},
		watch:{
			roleNameIndex(val){
				this.deliveryMethod = this.deliveryArr[val].itemValue
				this.deliveryMethodDesc = this.deliveryArr[val].itemName
			},
		},
		methods:{
			// 获取员工详情数据
			async getDetailArr(){
				this.dragShow=false
				let res = await this.$get({
					// url:'/shopUser/detail?id='+this.id,
					url:'/shopUser/detail?id=2',
				})
				// console.log(res.data.data)
				let data = res.data.data		
			},
			// 获取角色列表
			async getShopRole(){
				let params = {
					keyText: this.keyText, //搜索关键字(字符串)
					pageNo: 1,
					pageSize: 999,
				};
				let res = await this.$post({
					url:'/shopRole/list',
					data:params,
				})
				console.log(res.data.data)
				this.shopRole = res.data.data
			},
			async addStaffSave(){
				uni.showLoading({title:'添加中...'})
				if(this.realname==''||this.realname==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}else if(this.username==''||this.username==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入账号',
						icon:'none'
					})
					return
				}
				else if(this.password==''||this.password==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return
				}
				let res = await this.$post({
					url:'/shopUser/save',
					data:{
						realname:this.realname,	//真实名
						sex:this.sex,	//性别
						telephone:this.telephone,	//电话
						roleName:this.roleName,	//角色名称
						enable:this.enable,	//启用状态	
						username:this.username,	//用户名
						password:this.password,	//密码
						createTime:this.createTime,
						id:this.id,
						//isFinancial	//boolean是否财务
						//isManager	//boolean是否管理员
						//manager
						shopId:this.shopId,	//所属门店id
						shopName:this.shopName,	//所属门店简称
						//shopRoleList	
						//updateTime	更新时间
					},
				})
				uni.hideLoading()
				if(res.data.succeed){
					if(this.mode == 'edit'){
						this.$store.commit('setUpGoodsId',this.goodsId)
					}else if(this.mode == 'add'){
						this.$store.commit('setUpGoodsId','all')
					}
					uni.showToast({title:'添加成功'})
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
    @import "./addStaff.scss";
</style>
