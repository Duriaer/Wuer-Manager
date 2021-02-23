<template>
	<view class="roleAdminister">
		<view class="list" style="margin-top: 16rpx;">
			<view class="left">
				<view class="title">
					<text>{{role.roleName}}</text>
				</view>
				<text>备注:</text>
				<text>创建时间:{{role.createTime}}</text>
			</view>
			<view class="right">
				<view class="top">
					<view class="li">
						<text>系统内置角色</text>
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
				role:{},
				shopRole:'',
				
				keyText: '', //搜索关键字
			};
		},
		onLoad(){
			// this.getShopRole()
			this.getRoleArr()
		},
		onNavigationBarButtonTap(e){
			console.log(e)
			if(e.index ==0){
				this.$addRole()
			}
		},
		methods:{
			// 获取角色详情数据
			async getRoleArr(){
				let res = await this.$get({
					// url:'/shopRole/detail?id='+this.id,
					url:'/shopRole/detail?id=1',
				})
				console.log(res.data.data)
				this.role = res.data.data		
			},
			// 获取角色列表
			// async getShopRole(){
			// 	let params = {
			// 		keyText: this.keyText, //搜索关键字(字符串)
			// 	};
			// 	let res = await this.$post({
			// 		url:'/shopRole/list',
			// 		data:params,
			// 	})
			// 	console.log(res.data.data)
			// 	this.shopRole = res.data.data
			// },
		}
	}
</script>

<style lang="scss">
    @import "./roleAdminister.scss";
</style>
