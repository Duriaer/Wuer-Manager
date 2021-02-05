<template>
	<view class="login_content">
		<image class="logo" src="" />
		<view class="input_box">
			<input v-model="username" type="text" placeholder="请输入您的账号" />
		</view>
		<view class="input_box">
			<input v-model="password" type="text" placeholder="请输入您的密码" :password="passLook" @confirm="login()" />
			<image v-if="passLook" src="../static/nolook.png" @tap.stop="tabLook()" />
			<image v-else src="../static/look.png" @tap.stop="tabLook()" />
			
		</view>
		<button v-if="btnShow" @tap.stop="login()">登录</button>
		<button v-else disabled style="background: #999999;">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
				passLook:true,
				btnShow:false,
				
			};
		},
		watch:{
			username(val){
				if(val!=''&&val!=null&&val!=undefined&&this.password!=''&&this.password!=null&&this.password!=undefined){
					this.btnShow=true
				}else{
					this.btnShow=false
				}
			},
			password(val){
				if(val!=''&&val!=null&&val!=undefined&&this.username!=''&&this.username!=null&&this.username!=undefined){
					this.btnShow=true
				}else{
					this.btnShow=false
				}
			},
		},
		methods:{
			tabLook(){
				this.passLook = !this.passLook
			},
			async login(){
				if(this.username==''||this.username==null||this.username==undefined){
					uni.showToast({
						"title":"请输入账号",
						"icon":"none",
					})
					return false
				}
				if(this.password==''||this.password==null||this.password==undefined){
					uni.showToast({
						"title":"请输入密码",
						"icon":"none"
					})
					return false
				}
				uni.showLoading({"title":"登陆中..."})
				let res = await this.$post({
					url:'/shopUser/login?password='+this.password+'&username='+this.username,
				})
				console.log(res.data);
				uni.hideLoading()
				if(res.data.succeed){
					uni.showToast({"title":"登录成功","icon":"none"})
					uni.setStorageSync('token', res.data.data.token);
					uni.setStorageSync('shopUser', res.data.data.shopUser);
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/tabBar/index/index"
						})
					},500)
				}else if(res.data.failed){
					uni.showToast({
						"title":"登陆失败",
						"icon":"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss"
</style>
