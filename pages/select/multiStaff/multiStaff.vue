<template>
	<view class="multiStaff">
		<view class="total">
			<text>员工总数:{{shopUser.length}}个</text>
		</view>
		<checkbox-group @change="checkboxChange">
			<label class="select" v-for="(item,index) in shopUser" :key="item.id">
				<view class="list">
					<view class="checkbox">
						<checkbox :value="item" :disabled="item.disabled" style="transform:scale(0.7)" color="#57BFA3"/>
					</view>
					<view class="left">
						<text class="title">{{item.realname}}</text>
						<text>登录账号:{{item.username}}</text>
						<text>手机号码:{{item.telephone}}</text>
						<text>创建时间:{{item.createTime}}</text>
					</view>
					<view class="right">
						<view class="state">
							<text>启用</text>
						</view>
						<view class="role">
							<text>销售</text>
						</view>
					</view>
				</view>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopUser:[],
				recycleUser:[],
				recycleUserLength:''
			};
		},
		onLoad(){
			this.getShopUserArr()
		},
		onNavigationBarButtonTap(e){
			if(e.index ==0){
				uni.setStorageSync('recycleUser',this.recycleUser)
				this.$back()
			}
		},
		watch:{
			recycleUserLength(val){
				if(val>=3){
					for(let item of this.shopUser){
						for(let j of this.recycleUser){
							if(item.id!=j.id){
								item.disabled = true
							}else{
								item.disabled = false
							}
						}
					}
				}else{
					for(let item of this.shopUser){
						item.disabled = false
					}
				}
				
				if(val>0){
					uni.setNavigationBarTitle({
						title:`选择员工（已选择${val}个）`
					})
				}else{
					uni.setNavigationBarTitle({
						title:`选择员工`
					})
				}
			}
		},
		methods:{
			// 获取本店所有员工
			async getShopUserArr(){
				let res = await this.$get({
					url:'/goodsSku/getShopUserItems',
				})
				console.log(res.data.data)
				for(let item of res.data.data){
					item.disabled = false
				}
				this.shopUser = res.data.data
			},
			
			checkboxChange(e){
				console.log(e.detail)
				this.recycleUser = e.detail.value
				this.recycleUserLength = this.recycleUser.length
				console.log(this.recycleUserLength)
			}
		}
	}
</script>

<style lang="scss">
	@import "./multiStaff.scss";
</style>
