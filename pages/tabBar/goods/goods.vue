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
					<text>添加商品</text>
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
			<view class="search-r" @tap.stop="scanCode()">
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
			
			<view class="filterTopUlBox" v-if="filterTopShow" @touchmove.prevent>
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
					<!-- <view class="ul">
						<view class="list" :class="item.selected?'active':''" v-for="(item,index) in storePlaceArr" :key="index" @tap.stop="selectItem(storePlaceArr,index)">
							<text>{{item.storePlaceName}}</text>
						</view>
					</view> -->
					<view class="picker_box">
						<view class="one_bar">
							<scroll-view scroll-y="true">
								<view class="list" :class="oneBarIndex==index?'active':''" v-for="(item,index) in storePlaceArr" :key='index' @tap.stop="selectOneBar(index,item)">
									<text>{{item.storePlaceName}}</text>
								</view>
								<view class="list" :class="oneBarIndex==-1?'active':''" @tap.stop="selectOneBar(-1)">
									<text>{{oneBotName}}</text>
								</view>
							</scroll-view>
						</view>
						<template v-if="!threeBarShow">
							<view class="two_bar_big">
								<scroll-view scroll-y="true">
									<view class="list" :class="twoBigBarIndex==index+1?'active':''" v-for="(item,index) in twoBigBarArr" :key='index' @tap.stop="selectTwoBigBar(index+1,item)">
										<text></text>
									</view>
								</scroll-view>
							</view>
						</template>
						<template v-else>
							
							<view class="two_bar">
								<scroll-view scroll-y="true">
									<scroll-view scroll-y="true">
										<view class="list" style="color: #000000;">
											<text>全部借出</text>
											<text></text>
										</view>
										<view class="list" :class="twoBarIndex==index+1?'active':''" v-for="(item,index) in twoBarArr" :key='index' @tap.stop="selectTwoBar(index+1,item)">
											<text>{{item.itemName}}</text>
											<text></text>
										</view>
									</scroll-view>
								</scroll-view>
							</view>
							
							<view class="three_bar">
								<scroll-view scroll-y="true">
									<scroll-view scroll-y="true">
										<view class="list" style="color: #000000;">
											<text>{{threeTitle}}</text>
											<text></text>
										</view>
										<view class="list" :class="threeBarIndex==index+1?'active':''" v-for="(item,index) in threeBarArr" :key='index' @tap.stop="selectThreeBar(index+1,item)">
											<text></text>
										</view>
									</scroll-view>
								</scroll-view>
							</view>
						</template>
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
				
				<view class="box_bot" v-if="filterTopShow!=3">
					<view class="btn" @tap.stop="reset()">
						<text>重置</text>
					</view>
					<view class="btn btn_green" @tap.stop="startPull()">
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
							<view class="label_li" v-if="item.originTypeInfo=='本店自持'" style="background:#E5F9F4 ;color: #57BFA3;">
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
							<view class="label_li labal_li2" v-if="item.customLabelList">
								<text>{{item.customLabelList}}</text>
							</view>
							<!-- 品牌标签 -->
							<view class="label_li" v-if="item.goodsBrandName">
								<text>{{item.goodsBrandName}}</text>
							</view>
							<!-- 分类标签 -->
							<view class="label_li" v-if="item.goodsTypeName">
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
							<view class="address" v-if="item.storePlaceName">
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
						<view class="window-li" @tap.stop="toPlaceOrder(item.id)">
							<image src="../../../static/goods/xd.png"></image>
							<text>下单</text>
						</view>
						<view class="window-li" @tap.stop="editGoods(item.id)">
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
						<!-- <view class="filterRightUlBox" v-if="storePlaceArr.length">
							<view class="ulBox_top">
								<text class="left">位置</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in storePlaceArr" :key="index" @tap.stop="selectItem(storePlaceArr,index)">
									<text>{{item.storePlaceName}}</text>
								</view>
							</view>
						</view> -->
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
						<!-- 现有品牌 -->
						<!-- <view class="filterRightUlBox" v-if="qualityArr.length">
							<view class="ulBox_top">
								<text class="left">品牌</text>
							</view>
							<view class="ul">
								<view class="list" :class="item.selected?'active':''" v-for="(item,index) in qualityArr" :key="index" @tap.stop="selectItem(qualityArr,index)">
									<text>{{item.itemName}}</text>
								</view>
							</view>
						</view> -->
					</scroll-view>
				</view>
				<view class="box_bot">
					<view class="btn" @tap.stop="reset()">
						<text>重置</text>
					</view>
					<view class="btn btn_green" @tap.stop="startPull()">
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
				
				storePlaceList:[],//所选所在位置
				oneBarIndex:'',
				oneBotName:'外借中',
				storehouse:'',//仓库
				zone:[],//仓库分区
				twoBigBarArr:[],
				twoBigBarIndex:'',
				twoBarArr:[],
				twoBarIndex:'',
				threeTitle:'',
				threeBarArr:[],
				threeBarIndex:'',
				threeBarShow:false,
				
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
			this.getTwoBigBarArr()
			this.getTwoBarArr()
			
			this.getQualityArr()
			uni.startPullDownRefresh()
		},
		onShow() {
			if(this.$store.state.upGoodsId == 'all'){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100
				});
				uni.startPullDownRefresh()
				this.$store.commit('setUpGoodsId','')
			}else if(this.$store.state.upGoodsId&&typeof(this.$store.state.upGoodsId*1)=='number'&&this.$store.state.upGoodsId*1!=NaN){
				this.replaceDetailObj(this.$store.state.upGoodsId)
			}else{
				console.log('无刷新')
			}
		},
		onPullDownRefresh(){
			this.getGoodArr()
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
				},
				deep:true
			},
			//所在位置列表
			// storePlaceArr:{
			// 	handler(val){
			// 		this.storePlaceList = []
			// 		for(let i=0;i<val.length;i++){
			// 			if(val[i].selected){
			// 				let obj = {
			// 					storePlaceId:val[i].storePlaceId,
			// 					storeInCurrShop:val[i].storeInCurrShop,
			// 				}
			// 				this.storePlaceList.push(obj)
			// 			}
			// 		}
			// 	},
			// 	deep:true
			// },
			oneBarIndex(val){
				if(val==-1&&this.twoBarIndex!=''&&this.twoBarArr[this.twoBarIndex-1].itemValue=='WASH_PROTECT'){
					this.oneBotName = '借出'
				}else{
					this.oneBotName = '外借中'
				}
			},
			twoBarIndex(val){
				if(this.twoBarArr[val-1].itemValue=='WASH_PROTECT'){
					this.oneBotName = '借出'
				}else{
					this.oneBotName = '外借中'
				}
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
			startPull(){
				uni.startPullDownRefresh()
			},
			async getGoodArr(){
				// uni.showLoading()
				this.hideMask()
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
				// uni.hideLoading()
				uni.stopPullDownRefresh()
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
			// 获取商品详情数据
			async replaceDetailObj(goodsId){
				console.log(goodsId)
				let res = await this.$get({
					url:'/goodsSku/detail?id='+goodsId,
				})
				console.log(res.data.data)
				if(res.data.succeed){
					for(let i=0;i<this.goodsArr.length;i++){
						if(this.goodsArr[i].id==goodsId){
							res.data.data.windowShow = false
							this.goodsArr.splice(i,1,res.data.data)
							this.$store.commit('setUpGoodsId','')
							return
						}
					}
				}
			},
			//动态获取数量
			async getCount(){
				let params = {
					goodsTypeIdList:this.goodsTypeIdList,// 所选分类
					saleStatusList:this.saleStatusList,//  所选销售状态
					originTypeList:this.originTypeList, //  所选来源
					storePlaceList: this.storePlaceList,//所选所在位置
					qualityList: this.qualityList,//所选成色
					shopId: this.shopId,
				};
				let res = await this.$post({
					url:'/goodsSku/getCountByCondition',
					data:params,
				})
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
				// this.allSelectedFasle(this.storePlaceArr)
				this.allSelectedFasle(this.qualityArr)
				this.searchText = ''
				this.goodsTypeIdList= []
				this.saleStatusList = []
				this.originTypeList = []
				this.storePlaceList = []
				this.qualityList =  []
				uni.startPullDownRefresh()
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
				setTimeout(()=>{
					this.getCount()
				},100)
				
			},
			selectOneBar(index,item){
				this.oneBarIndex = index
				if(index>-1){
					this.threeBarShow = false
					if(!item.storeInCurrShop){
						this.storePlaceList = []
						let obj = {
							storePlaceId:item.storePlaceId,
							storeInCurrShop:item.storeInCurrShop,
							storeWarehouseZoneId:item.storeWarehouseZoneId,
							storeWarehouseZoneName:item.storeWarehouseZoneName
						}
						this.storePlaceList.push(obj)
						uni.startPullDownRefresh()
					}
				}else{
					this.threeBarShow = true
				}
			},
			selectTwoBigBar(index,item){
				this.twoBigBarIndex = index
				this.storePlaceList = []
				let obj = {
					storePlaceId:this.storePlaceArr[this.oneBarIndex].storePlaceId,
					storeInCurrShop:this.storePlaceArr[this.oneBarIndex].storeInCurrShop,
					storeWarehouseZoneId:item.storeWarehouseZoneId,
					storeWarehouseZoneName:item.storeWarehouseZoneName
				}
				this.storePlaceList.push(obj)
				uni.startPullDownRefresh()
			},
			selectTwoBar(index,item){
				this.twoBarIndex = index
				this.threeTitle = '全部'+item.itemName
				this.getThreeBarArr(item.itemValue)
			},
			selectThreeBar(index,item){
				this.threeBarIndex = index
				// this.storePlaceList = []
				// let obj = {}
				// this.storePlaceList.push(obj)
				// uni.startPullDownRefresh()
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
				this.storePlaceArr = res.data.data
				console.log(res.data.data)
			},
			//获取仓库列表
			async getTwoBigBarArr(){
				let res = await this.$post({
					url:'/warehouse/list',
					data:{
						shopId:5,
						pageNo: 1,
						pageSize: this.pageSize,
					}
				})
				console.log(res.data.data)
				this.storehouse = res.data.data
				this.zone = this.storehouse.records
				
			},
			//获取所有商品外借备注
			async getTwoBarArr(){
				let res = await this.$get({
					url:'/dictItem/getGoodsLendRemarkItems',
				})
				// console.log(res.data)
				if(res.data.succeed){
					this.twoBarArr = res.data.data
					// console.log(res.data.data)
				}
			},
			async getThreeBarArr(val){
				
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
			//下单
			toPlaceOrder(goodsId){
				this.hideWindow()
				this.$toPlaceOrder(goodsId,1)
			},
			//编辑商品
			editGoods(goodsId){
				this.hideWindow()
				this.$editGoods(goodsId)
			},
			//删除商品
			delGoods(goodsId){
				this.hideWindow()
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
			scanCode(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "./goods.scss"
</style>
