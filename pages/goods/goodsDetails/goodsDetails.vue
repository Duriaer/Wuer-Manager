<template>
	<view class="details_box">
		<!-- 商品信息 -->
		<view class="details_content">
			<view class="details_img">
				 <view class="list" v-for="(item,index) in imgArr" :key="index">
				 	<image :src="item" mode="aspectFill" @tap.stop="$previewImg(index,imgArr)"></image>
				 </view>
			</view>
			<view class="detailsTitle">
				<view class="details_title">
					<view class="goodstitle">
						<view class="overdue" v-if="goods.overdueDays">
							<text>超期</text>
						</view>
						<text style="margin-left: -10rpx;">【{{goods.qualityInfo}}】</text>
						<text>{{goods.name}}</text>
					</view>
					
					<view class="label_ul">
						<!-- 来源标签 -->
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
						<!-- 新增标签 -->
						<!-- <view class="label_li labal_li2">
							<text>标签标签</text>
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
				</view>
				<view class="right" @tap.stop="downImg(imgArr)">
					<image src="../../../static/goodsDetails/xz.png"></image>
				</view>
			</view>
			<view class="details_price">
				<view class="price">
					<text>¥</text>
					<text>{{goods.salePrice}}</text>
				</view>
				<view class="share" v-if="goods.peerSharing">
					<text>已共享</text>
				</view>
			</view>
			<view class="details_bot">
				<view class="left" v-if="goods.peerPrice">
					<text>同行价¥{{goods.peerPrice}}</text>
				</view>
				<view class="right">
					<image src="../../../static/goods/coordinate.png"></image>
					<text>员工-萍萍借出（客户看货） 1小时</text>
				</view>
			</view>
		</view>
		<!-- 商品描述 -->
		<view class="details_describe">
			<view class="title">
				<text>商品描述</text>
				<image src="../../../static/goodsDetails/fz.png"></image>
			</view>
			<view class="describe" v-if="goods.marketingDocument" @tap.stop="copyDescribe(goods.marketingDocument)">
				<text>{{goods.marketingDocument}}</text>
			</view>
			<view class="ul">
				<view class="li" v-if="goods.manufacturerCode">
					<view class="left">
						<text>刻印&序列号</text>
					</view>
					<view class="right">
						<text>{{goods.manufacturerCode}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.goodsTypeName">
					<view class="left">
						<text>系列</text>
					</view>
					<view class="right">
						<text>{{goods.goodsTypeName}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.material">
					<view class="left">
						<text>材质</text>
					</view>
					<view class="right">
						<text>{{goods.material}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.size">
					<view class="left">
						<text>尺寸</text>
					</view>
					<view class="right">
						<text>{{goods.size}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.defects">
					<view class="left">
						<text>瑕疵</text>
					</view>
					<view class="right">
						<text>{{goods.defects}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.accessoriesInfo">
					<view class="left">
						<text>配件</text>
					</view>
					<view class="right">
						<text>{{goods.accessoriesInfo}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 来源信息 -->
		<view class="details_origin">
			<view class="title">
				<text>来源信息</text>
			</view>
			<view class="ul" v-if="goods.costPrice">
				<view class="li">
					<view class="left">
						<text>总成本</text>
					</view>
					<view class="right">
						<text>{{goods.costPrice}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.originTypeInfo">
					<view class="left">
						<text>商品来源</text>
					</view>
					<view class="right">
						<text>{{goods.originTypeInfo}}</text>
					</view>
				</view>
				<!-- <view class="agent">
					<view class="agent_box" style="border-bottom: 2rpx solid #F4F4F4;height: 96rpx;">
						<view class="top">
							<text>本店</text>
							<view class="top1">
								<text>发起人</text>
							</view>
						</view>
						<view class="bot">
							<text style="margin-right: 30rpx;">出资50000元</text>
							<text>分润比例50%</text>
						</view>
					</view>
					<view class="agent_box" style="display: flex;justify-content: space-between;align-items: center;">
						<view>
							<view class="top" style="margin-top: 14rpx;">
								<text>GUGUS</text>
								<view class="top2">
									<text>同行合作</text>
								</view>
							</view>
							<view class="bot">
								<text style="margin-right: 30rpx;">出资50000元</text>
								<text>分润比例50%</text>
							</view>
						</view>
						<view class="right">
							<text>待确认</text>
						</view>
					</view>
				</view> -->
				<view class="li" v-if="goods.recycleUserName">
					<view class="left">
						<text>回收人员</text>
					</view>
					<view class="right">
						<text>{{goods.recycleUserName}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.checkupUserName">
					<view class="left">
						<text>鉴定人员</text>
					</view>
					<view class="right">
						<text>{{goods.checkupUserName}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.operatorName">
					<view class="left">
						<text>入库人员</text>
					</view>
					<view class="right">
						<text>{{goods.operatorName}}</text>
					</view>
				</view>
				<view class="li" v-if="goods.operateDatetime">
					<view class="left">
						<text>入库时间</text>
					</view>
					<view class="right">
						<text>{{goods.operateDatetime}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 日志 -->
		<!-- <view class="details_journal">
			<view class="title">
				<text>日志</text>
			</view>
	
		</view> -->
		<view class="footer_placeholder"></view>
		<view class="details_nav">
			 <view class="nav_scroll">
				<view class="li" @tap.stop="$editGoods(goodsId)">
					<view class="li-box">
						<image src="../../../static/goods/bj1.png"></image>
						<text>编辑</text>
					</view>
				</view>
				<view class="li" @tap.stop="delGoods(goodsId)">
					<view class="li-box">
						<image src="../../../static/goods/sc1.png"></image>
						<text>删除</text>
					</view>
				</view>
				
				<view class="li" @tap.stop="$toPlaceOrder(goodsId,1)">
					<view class="li-box">
						<image src="../../../static/goods/xd1.png"></image>
						<text>下单</text>
					</view>
				</view>
				<view class="li" @tap.stop="$toPlaceOrder(goodsId,2)">
					<view class="li-box">
						<image src="../../../static/goods/hold.png"></image>
						<text>hold</text>
					</view>
				</view>
				<view class="li">
					<view class="li-box">
						<image src="../../../static/goods/jc.png"></image>
						<text>借出</text>
					</view>
				</view>
				<view class="li">
					<view class="li-box">
						<image src="../../../static/goods/bq1.png"></image>
						<text>打印标签</text>
					</view>
				</view>
				<view class="li">
					<view class="li-box">
						<image src="../../../static/goods/fx1.png"></image>
						<text>分享</text>
					</view>
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
				goodsId:'',
				
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				previousMargin:'24rpx',
				nextMargin:'265rpx',
				
				goods:{
					
				},
				imgArr:[]
			};
		},
		onLoad(options) {
			console.log(options)
			this.goodsId = options.goodsId
			this.getDetailObj()
		},
		methods:{
			// 获取商品详情数据
			async getDetailObj(){
				let res = await this.$get({
					url:'/goodsSku/detail?id='+this.goodsId,
				})
				console.log(res.data.data)
				this.goods = res.data.data
				this.imgArr = []
				for(let i=0;i<this.goods.picList.length;i++){
					this.imgArr.push(this.$imgUrl+this.goods.picList[i].imagePath)
				}
			},
			//删除商品
			delGoods(goodsId){
				uni.showModal({
					title: '提示',
					content: '确实要删除商品吗？',
					success: async (resolve)=> {
						if(resolve.confirm){
					        let res = await this.$get({
							    url:'/goodsSku/logicDelete?id='+goodsId,
							})
							if(res.data.succeed){
								for(let i=0;i<this.goodsArr.length;i++){
									if(goodsId==this.goodsArr[i].id){
										this.goodsArr.splice(i,1)
										return
									}
								}
							}
						}else if(resolve.cancel) {
			
						}
					}
				})
			},
			downImg(arr){
				for(let i=0;i<arr.length;i++){
					uni.downloadFile({
					    url: arr[i], 
					    success: (res) => {
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success: () => {
									if(i==arr.length-1){
										uni.showToast({title:"保存成功",icon:'none'})
									}
								}
							})
					    }
					});
				}
			},
			copyDescribe(val){
				uni.setClipboardData({
				    data: val,
				    success: function (res) {
						console.log('success');
						uni.showToast({title: '复制成功',icon:'none'});
				    }
				})
			}
		}
	}
</script>

<style lang="scss">
    @import "./goodsDetails.scss";
</style>
