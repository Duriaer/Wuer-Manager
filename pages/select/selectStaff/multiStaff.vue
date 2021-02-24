<template>
	<view class="multiStaff">
		<view class="total">
			<text>员工总数:{{listArr.length}}个</text>
		</view>
		<checkbox-group @change="checkboxChange">
			<label class="select" v-for="(item,index) in listArr" :key="item.id">
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
						<view class="state-y" v-if="item.enable">
							<text>启用</text>
						</view>
						<view class="state-n" v-else>
							<text>禁用</text>
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
				listArr:[],
				selectArr:[],
				selectLength:''
			};
		},
		onShow(){
			this.getListArrArr()
		},
		onNavigationBarButtonTap(e){
			if(e.index ==0){
				let idArr = []
				let usernameArr = []
				for(let i of this.selectArr){
					idArr.push(i.id)
					usernameArr.push(i.username)
				}
				uni.setStorageSync('multiStaff',{idArr,usernameArr})
				this.$back()
			}
		},
		watch:{
			selectLength(val){
				if(val>=2){
					for(let i of this.listArr){
						for(let j of this.selectArr){
							if(i.id!=j.id){
								i.disabled = true
							}else{
								i.disabled = false
							}
						}
					}
				}else{
					for(let i of this.listArr){
						i.disabled = false
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
			async getListArrArr(){
				let res = await this.$get({
					url:'/goodsSku/getShopUserItems',
				})
				for(let item of res.data.data){
					item.disabled = false
				}
				this.listArr = res.data.data
			},
			
			checkboxChange(e){
				console.log(e.detail)
				this.selectArr = e.detail.value
				this.selectLength = this.selectArr.length
			}
		}
	}
</script>

<style lang="scss">
	@import "./multiStaff.scss";
</style>
