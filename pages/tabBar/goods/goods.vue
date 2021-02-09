<template>
	<view class="goods_content">
		<!-- 头部 -->
		<view class="goods_header">
			<!-- 头部安全区 -->
			<view class="status"></view>
			<!-- 标题 -->
			<view class="header">
				<view class="box">
					<text>批量编辑</text>
				</view>
				<text class="title">商品</text>
				<view class="box" @tap.stop="$addGoods()">
					<text>增加商品</text>
				</view>
			</view>
			
		</view>
		<!-- 占位 -->
		<view class="header_placeholder"></view>
		
		<!-- 搜索栏 -->
		<view class="search">
			<view class="search-l">
				<image src="../../../static/goods/fdj.png" />
			</view>
			
			<view class="search-r">
				<image src="../../../static/goods/scanning.png" />
			</view>
		</view>
		<!-- 筛选栏 -->
		<view class="filterTopBox">
			<view class="filterTopBar">
				
				<view class="bar_list" :class="filterTopShow==1?'active':''" @tap.stop="tabFilterTop(0)">
					<text>排序</text>
					<image class="triangle" src="../../../static/goods/triangle_up.png" mode="widthFix" v-if="filterTopShow==1"></image>
					<image class="triangle" src="../../../static/goods/triangle_dn.png" mode="widthFix" v-else></image>
				</view>
				
				<view class="bar_list" :class="filterTopShow==2?'active':''" @tap.stop="tabFilterTop(2)">
					<text>全部分类</text>
					<image class="triangle" src="../../../static/goods/triangle_up.png" mode="widthFix" v-if="filterTopShow==2"></image>
					<image class="triangle" src="../../../static/goods/triangle_dn.png" mode="widthFix" v-else></image>
				</view>
				
				<view class="bar_list" :class="filterTopShow==3?'active':''" @tap.stop="tabFilterTop(3)">
					<text>位置</text>
					<image class="triangle" src="../../../static/goods/triangle_up.png" mode="widthFix" v-if="filterTopShow==3"></image>
					<image class="triangle" src="../../../static/goods/triangle_dn.png" mode="widthFix" v-else></image>
				</view>
				
				<view class="bar_list" :class="filterTopShow==4?'active':''" @tap.stop="tabFilterTop(4)">
					<text>来源</text>
					<image class="triangle" src="../../../static/goods/triangle_up.png" mode="widthFix" v-if="filterTopShow==4"></image>
					<image class="triangle" src="../../../static/goods/triangle_dn.png" mode="widthFix" v-else></image>
				</view>
				<view class="bar_list" @tap.stop="showFilterRight()">
					<text>筛选</text>
					<image class="screenImg" src="../../../static/goods/screen.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="filterTopUlBox" v-if="filterTopShow">
				<!-- 分类 -->
				<template v-if="filterTopShow==2">
					<view class="ul">
						<view class="list" :class="item.selected?'active':''" v-for="(item,index) in goodsTypeIdArr" :key="index" @tap.stop="selectItem(goodsTypeIdArr,index)">
							<text>{{item.name}}</text>
						</view>
					</view>
				</template>
				<!-- 位置 -->
				<template v-if="filterTopShow==3">
					<view class="ul">
						<view class="list" :class="item.selected?'active':''" v-for="(item,index) in storePlaceArr" :key="index" @tap.stop="selectItem(storePlaceArr,index)">
							<text>{{item.storePlaceName}}</text>
						</view>
					</view>
				</template>
				<!-- 来源 -->
				<template v-if="filterTopShow==4">
					<view class="ul">
						<view class="list" :class="item.selected?'active':''" v-for="(item,index) in originTypeArr" :key="index" @tap.stop="selectItem(originTypeArr,index)">
							<text>{{item.itemName}}</text>
						</view>
					</view>
				</template>
				
				<view class="box_bot">
					<view class="btn" @tap.stop="reset()">
						<text>重置</text>
					</view>
					<view class="btn btn_green" @tap.stop="getGoodArr()">
						<text>完成</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="tips_box" v-if="hasTotal">
			<view class="tips">
				<text>商品总数：{{totalCount}}件</text>
				<!-- <text>总成本：{{totalCostPrice}}元</text> -->
				<!-- <text>超期：件</text> -->
			</view>
		</view>
		
		<view class="goods_ul">
			<view class="goods_li" v-for="(item,index) in goodsArr" :key="index" @tap.stop="$toGoods(item.id)">
				<view class="img">
					<image :src="$imgUrl+item.mainImagePath" lazy-load />
					<view class="img_mask" v-if="item.status=='2'">
						<view class="main" style="background: #505050;">
							<text>下架</text>
						</view>
					</view>
					<view class="img_mask" v-else-if="item.saleStatus=='SALED'">
						<view class="main" style="background: #505050;">
							<text>已售</text>
						</view>
					</view>
					<view class="img_mask" v-else-if="item.saleStatus=='RESERVED'">
						<view class="main" style="background: #57BFA3;">
							<text>hold</text>
						</view>
					</view>
					<view class="img_mask" v-else-if="item.saleStatus=='WASHING'">
						<view class="main" style="background: #F1AF48;">
							<text>送洗</text>
						</view>
					</view> -->
				</view>
				<view class="right">
					<view class="top">
						<view class="title">
							<view class="overdue" v-if="item.overdueDays">
								<text>超期</text>
							</view>
							<text style="margin-left: -10rpx;">【{{item.qualityInfo}}】</text>
							<text>{{item.name}}</text>
						</view>
						
						<view class="label_ul">
							<!-- 来源标签 -->
							<view class="label_li" v-if="item.originTypeInfo=='店铺囤货'" style="background:#E5F9F4 ;color: #57BFA3;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='回收客人'" style="background:#EFF7FF ;color: #759FFF;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='客人寄售'" style="background:#FFF3E2 ;color: #EFA22A;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<view class="label_li" v-else-if="item.originTypeInfo=='合作销售'" style="background:#FFF0F5 ;color: #DDA0DD;">
								<text>{{item.originTypeInfo}}</text>
							</view>
							<!-- 自定义标签 -->
							<view class="label_li labal_li2" v-if="item.customLabelList!=null&&item.customLabelList!=''">
								<text>{{item.customLabelList}}</text>
							</view>
							<!-- 品牌标签 -->
							<view class="label_li">
								<text>{{item.goodsBrandName}}</text>
							</view>
							<!-- 分类标签 -->
							<view class="label_li">
								<text>{{item.goodsTypeName}}</text>
							</view>
						</view>
					</view>
					
					<view class="bot">
						<view class="money">
							<view class="price">
								<text class="currency">¥</text>
								<text>{{item.salePrice || '暂无价格'}}</text>
							</view>
							<text class="opponent" v-if="item.peerPrice">同行价¥{{item.peerPrice}}</text>
						</view>
						<view class="bot_bot">
							<view class="address">
								<image src="../../../static/goods/coordinate.png"></image>
								<text>{{item.storePlaceName}}</text>
							</view>
							<view class="dot_ul" @tap.stop="tabWindow(index)">
								<view class="dot"></view><view class="dot"></view><view class="dot"></view>
							</view>
						</view>
						
					</view>
				</view>
				<view class="window" v-if="item.windowShow">
					<view class="window-ul">
						<view class="window-li">
							<image src="../../../static/goods/xd.png"></image>
							<text>下单</text>
						</view>
						<view class="window-li"  @tap.stop="$editGoods(item.id)">
							<image src="../../../static/goods/bj.png"></image>
							<text>编辑</text>
						</view>
						<view class="window-li">
							<image src="../../../static/goods/fx.png"></image>
							<text>分享</text>
						</view>
						<view class="window-li">
							<image src="../../../static/goods/bq.png"></image>
							<text>打印标签</text>
						</view>
						<view class="window-li" @tap.stop="delGoods(item.id)">
							<image src="../../../static/goods/sc.png"></image>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="window_mask" v-if="windowMaskShow"  @tap.stop="hideWindow()"></view>
		
		<view class="mask" v-if="filterTopShow" @touchmove.prevent @tap.stop="hideMask()"></view>
		
		<view class="mask" style="z-index: 100;" v-if="filterRightShow" @touchmove.prevent @tap.stop="hideMask()">
			<view class="filterRightBox" >
				<view class="box_top">
					<scroll-view scroll-y="true" >
						<!-- 分类 -->
						<view class="filterRightUlBox" v-if="goodsTypeIdArr.length">
							<view class="ulBox_top">
								<text class="left">分类</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in goodsTypeIdArr" :key="index" @tap.stop="selectItem(goodsTypeIdArr,index)">
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
						<!-- 状态 -->
						<view class="filterRightUlBox" v-if="saleStatusArr.length">
							<view class="ulBox_top">
								<text class="left">状态</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in saleStatusArr" :key="index" @tap.stop="selectItem(saleStatusArr,index)">
									<text>{{item.itemName}}</text>
								</view>
							</view>
						</view>
						<!-- 来源 -->
						<view class="filterRightUlBox" v-if="originTypeArr.length">
							<view class="ulBox_top">
								<text class="left">来源</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in originTypeArr" :key="index" @tap.stop="selectItem(originTypeArr,index)">
									<text>{{item.itemName}}</text>
								</view>
							</view>
						</view>
						<!-- 位置 -->
						<view class="filterRightUlBox" v-if="storePlaceArr.length">
							<view class="ulBox_top">
								<text class="left">位置</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in storePlaceArr" :key="index" @tap.stop="selectItem(storePlaceArr,index)">
									<text>{{item.storePlaceName}}</text>
								</view>
							</view>
						</view>
						<!-- 成色 -->
						<view class="filterRightUlBox" v-if="qualityArr.length">
							<view class="ulBox_top">
								<text class="left">成色</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in qualityArr" :key="index" @tap.stop="selectItem(qualityArr,index)">
									<text>{{item.itemName}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="box_bot">
					<view class="btn" @tap.stop="reset()">
						<text>重置</text>
					</view>
					<view class="btn btn_green" @tap.stop="getGoodArr()">
						<text>完成</text><text class="small">（{{rightCount}}件商品）</text>
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
				token:uni.getStorageSync('token'),
				
				//获得数据
				hasTotal:true,//是否显示汇总
				totalCount:0,//总商品件数
				rightCount:0,//右总商品件数
				// totalCostPrice:0,//总售价
				goodsArr:[],//总商品列表
				goodsTypeIdArr:[],//全部分类列表
				saleStatusArr:[],//销售状态列表
				originTypeArr:[],//来源列表
				storePlaceArr:[],//所在位置列表
				qualityArr:[],//成色列表
				
				//发送请求
				//页码
				pageNo: 1,
				pageSize: 10,
				//搜索数据
				searchText: '', //搜索文本
				goodsTypeIdList: [],  // 所选分类id 用数组
				saleStatusList: [],//  所选销售状态, 用数组 (value)
				originTypeList:[], //  所选来源id, 用数组 （value)
				storePlaceList:[],//所选所在位置id 
				qualityList: [],//  所选成色, 用数组 （value）
				shopId: uni.getStorageSync("shopUser").shopId, // 所选店铺id,此处为固定值,根据登录用户从本地存储中取
				
				//页面交互
				filterTopShow:0,//上筛选栏显示
				filterRightShow:false,//右筛选栏显示
				windowMaskShow:false,//弹窗
			};
		},
		onLoad() {
			this.getGoodsTypeArr()
			this.getSaleStatusArr()
			this.getOriginTypeArr()
			this.getStorePlaceArr()
			this.getQualityArr()
			this.getGoodArr()
		},
		onShow() {
			if(this.$store.state.upGoodsId == 'all'){
				
			}else if(this.$store.state.upGoodsId){
				
			}
		},
		onReachBottom(){
			this.addGoodArr()
		},
		onPageScroll(){
			this.hideWindow()
		},
		watch:{
			//全部分类列表
			goodsTypeIdArr:{
				handler(val){
					this.goodsTypeIdList = []
					for(let i=0;i<val.length;i++){
						if(val[i].selected){
							this.goodsTypeIdList.push(val[i].id)
						}
					}
				},
				deep:true
			},
			//销售状态列表
			saleStatusArr:{
				handler(val){
					this.saleStatusList = []
					for(let i=0;i<val.length;i++){
						if(val[i].selected){
							this.saleStatusList.push(val[i].itemValue)
						}
					}
				},
				deep:true
			},
			//来源列表
			originTypeArr:{
				handler(val){
					this.originTypeList = []
					for(let i=0;i<val.length;i++){
						if(val[i].selected){
							this.originTypeList.push(val[i].itemValue)
						}
					}
					// console.log(val)
				},
				deep:true
			},
			//所在位置列表
			storePlaceArr:{
				handler(val){
					this.storePlaceList = []
					for(let i=0;i<val.length;i++){
						if(val[i].selected){
							let obj = {
								storePlaceId:val[i].storePlaceId,
								storeInCurrShop:val[i].storeInCurrShop,
							}
							this.storePlaceList.push(obj)
						}
					}
				},
				deep:true
			},
			//成色列表
			qualityArr:{
				handler(val){
					this.qualityList = []
					for(let i=0;i<val.length;i++){
						if(val[i].selected){
							this.qualityList.push(val[i].itemValue)
						}
					}
				},
				deep:true
			},
			filterTopShow(val){
				if(val){
					uni.hideTabBar()
					this.filterRightShow = false
				}else{
					if(!this.filterRightShow){
						uni.showTabBar()
					}
				}
			},
			filterRightShow(val){
				if(val){
					this.filterTopShow = false
					uni.hideTabBar()
				}else{
					uni.showTabBar()
				}
			},
			
		},
		methods:{
			async getGoodArr(){
				uni.showLoading()
				let params = {
					sort: "",
					pageNo: 1,
					pageSize: this.pageSize,
					searchText: this.searchText, //搜索文本
					goodsTypeIdList:this.goodsTypeIdList,// 所选分类
					saleStatusList:this.saleStatusList,//  所选销售状态
					originTypeList:this.originTypeList, //  所选来源
					storePlaceList: this.storePlaceList,//所选所在位置
					qualityList: this.qualityList,//所选成色
					shopId: this.shopId,
				};
				let res = await this.$post({
					url:'/goodsSku/list',
					data:params,
				})
				uni.hideLoading()
				console.log(res.data.data)
				if(res.data.succeed&&res.data.status){
					let data = res.data.data
					this.hasTotal = data.hasTotal
					this.totalCount = this.rightCount = data.totalCount
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 0
					});
					for(let i=0;i<data.pageData.records.length;i++){
						data.pageData.records[i].windowShow = false
					}
					this.goodsArr = data.pageData.records
					this.hideMask()
				}
			},
			async addGoodArr(){
				uni.showLoading({title:'加载更多...'})
				let params = {
					sort: "",
					pageNo: ++this.pageNo,
					pageSize: this.pageSize,
					searchText: this.searchText, 
					goodsTypeIdList:this.goodsTypeIdList,// 所选分类
					saleStatusList:this.saleStatusList,//  所选销售状态
					originTypeList:this.originTypeList, //  所选来源
					storePlaceList: this.storePlaceList,//所选所在位置
					qualityList: this.qualityList,//所选成色
					shopId: this.shopId,
				};
				let res = await this.$post({
					url:'/goodsSku/list',
					data:params,
				})
				uni.hideLoading()
				if(res.data.succeed&&res.data.status){
					let data = res.data.data
					if(data.pageData.records.length>0){
						for(let i=0;i<data.pageData.records.length;i++){
							data.pageData.records[i].windowShow = false
							this.goodsArr.push(data.pageData.records[i])
						}
					}else{
						--this.pageNo
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							position:'bottom'
						})
					}
				}
			},
			async getCount(){
				let params = {
					goodsTypeIdList:this.goodsTypeIdList,// 所选分类id
					saleStatusList:this.saleStatusList,//  所选销售状态
					originTypeList:this.originTypeList, //  所选来源id
					storePlaceList: JSON.stringify(this.storePlaceList),//所选所在位置id
					qualityList: this.qualityList,//所选成色
					shopId: this.shopId,
				};
				let res = await this.$post({
					url:'/goodsSku/getCountByCondition',
					data:params,
				})
				console.log(res.data)
				if(res.data.succeed&&res.data.status){
					this.rightCount = res.data.data
					
				}
			},
			//重置
			reset(){
				this.hideMask()
				this.allSelectedFasle(this.goodsTypeIdArr)
				this.allSelectedFasle(this.saleStatusArr)
				this.allSelectedFasle(this.originTypeArr)
				this.allSelectedFasle(this.storePlaceArr)
				this.allSelectedFasle(this.qualityArr)
				this.searchText = ''
				this.goodsTypeIdList= []
				this.saleStatusList = []
				this.originTypeList = []
				this.storePlaceList = []
				this.qualityList =  []
				this.getGoodArr()
			},
			allSelectedFasle(arr){
				for(let i=0;i<arr.length;i++){
					arr[i].selected = false
				}
			},
			tabWindow(index){
				this.goodsArr[index].windowShow = !this.goodsArr[index].windowShow
				if(this.goodsArr[index].windowShow){
					this.windowMaskShow = true
					for(let i=0;i<this.goodsArr.length;i++){
						if(i!=index){
							this.goodsArr[i].windowShow = false
						}
					}
				}else{
					this.windowMaskShow = false
				}
			},
			hideWindow(){
				for(let i=0;i<this.goodsArr.length;i++){
					this.goodsArr[i].windowShow = false
				}
				this.windowMaskShow = false
			},
			
			tabFilterTop(index){
				this.hideWindow()
				if(index==this.filterTopShow){
					this.filterTopShow = 0
					return false
				}
				this.filterTopShow = index
			},
			showFilterRight(){
				this.hideWindow()
				this.filterRightShow = true
			},
			hideMask(){
				this.filterTopShow = 0
				this.filterRightShow = false
				this.windowMaskShow = false
			},
			selectItem(arr,index){
				arr[index].selected = !arr[index].selected
				this.getCount()
			},
			//获取全部分类列表
			async getGoodsTypeArr(){
					let res = await this.$get({
						url:'/goodsSku/getGoodsTypes',
					})
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].selected = false
					}
					this.goodsTypeIdArr = res.data.data
			},
			//获取销售状态列表
			async getSaleStatusArr(){
					let res = await this.$get({
						url:'/dictItem/getGoodsSaleStatusItems',
					})
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].selected = false
					}
					this.saleStatusArr = res.data.data
			},
			//获取来源列表
			async getOriginTypeArr(){
					let res = await this.$get({
						url:'/dictItem/getOriginTypeItems',
					})
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].selected = false
					}
					this.originTypeArr = res.data.data
			},
			//获取位置列表
			async getStorePlaceArr(){
					let res = await this.$get({
						url:'/shop/getStorePlaces',
					})
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].selected = false
					}
					this.storePlaceArr = res.data.data
			},
			//获取成色列表
			async getQualityArr(){
					let res = await this.$get({
						url:'/dictItem/getGoodsQualityItems',
					})
					for(let i=0;i<res.data.data.length;i++){
						res.data.data[i].selected = false
					}
					this.qualityArr = res.data.data
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
		}
	}
</script>

<style lang="scss">
	@import "./goods.scss"
</style>
