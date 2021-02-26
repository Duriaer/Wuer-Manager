<template>
	<view class="addGuest">
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
						<input type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="line_radio">
					<view class="line_name">
						<text>性别</text>
					</view>
					<view class="right">
						<radio-group class="gender">
							<radio value="man" color="#57BFA3" style="transform:scale(0.6)" />男
							<radio value="woman" color="#57BFA3" style="transform:scale(0.6)" />女
						</radio-group>
					</view>
				</view>
				<view class="line_input">
					<view class="line_name">
						<text>手机</text>
					</view>
					<view class="right">
						<input type="number" placeholder="请输入" />
					</view>
				</view>
				<view class="line_picker">
					<view class="line_name">
						<text>生日</text>
					</view>
					<view class="right">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
							<view class="picker">
								<text class="noSet" v-if="!date">请选择</text>
								<text>{{date}}</text>
								<image src="../../../../static/addGoods/go.png" ></image>
							</view>
						</picker>
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
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			const currentDate = this.getDate({
				format: true
			})
			return{
				date:'',
			};
		},
		onLoad(){
			this.addGuestSave()
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
			dateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type){
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if(type === 'start') {
					year = year - 100;
				}else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//保存客户信息
			async addGuestSave(){
				uni.showLoading({title:'添加中...'})
				if(this.name==''||this.name==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					setTimeout(()=>{
						this.scrollTopId = 'goodsBrand'
					},100)
					return
				}
				let res = await this.$post({
					url:'/customer/save',
					data:{
						name:this.name,	//客户名称
						
						// shopId	本客户所属店铺id
						
						
						// telephone	客户手机号码
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
    @import "./addGuest.scss";
</style>
