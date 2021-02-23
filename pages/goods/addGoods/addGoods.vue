<template>
	<view class="newProduct_content">
		<!-- nav -->
		<view class="newProduct_nav">
			<view class="nav_title">
				<view :class="{'active':navIndex==1}" @tap.stop="tabNav(1)">
					商品描述
				</view>
			</view>
			<view class="nav_title">
				<view :class="{'active':navIndex==2}" @tap.stop="tabNav(2)">
					价格
				</view>
			</view>
			<view class="nav_title">
				<view :class="{'active':navIndex==3}" @tap.stop="tabNav(3)">
					来源&其他
				</view>
			</view>
		</view>
		<scroll-view class="scroll-view_y" :scroll-into-view="scrollTopId" scroll-y="true" @scroll="scrollY($event)">
			<view id="description_box" style="margin-top: 16rpx;">
				<view class="id_title">
					<text>商品描述</text>
				</view> 
				<view class="ul">
					<view class="line_img">
						<view class="line_name">
							<view class="left">
								<text>商品图片</text><text class="sub">（可拖动调整顺序）</text>
							</view>
							<text class="right">{{picList.length}}/9 张</text>
						</view>
						<view class="img_ul">
							<image-drag :list="picList" @updateList="updateList" v-if="dragShow"></image-drag>
							<view class="drag" v-if="!dragShow">
								<view class="drag_mask" @tap.stop.prevent></view>
								<image-drag></image-drag>
							</view>
						</view>
					</view>
					<view id="goodsBrand" class="line_picker">
						<view class="line_name">
							<text>品牌</text><text class="star">*</text>
						</view>
						<view class="right" style="width: 75%;" @tap.stop="$toPath('./brandChoice/brandChoice')">
							<view class="picker">
								<text class="noSet" v-if="!goodsBrandId">请选择</text>
								<text v-else>{{goodsBrandName}}</text>
								<image src="../../../static/addGoods/go.png" ></image>
							</view>
						</view>
					</view>
					<view class="line_picker" id="goodsType">
						<view class="line_name">
							<text>分类</text><text class="star">*</text>
						</view>
						<view class="right">
							<picker :value="goodsTypeIndex" :range="goodsTypePickerArr" @change="pickerChang($event,'goodsType')" >
								<view class="picker">
									<text class="noSet" v-if="!goodsTypeId">请选择</text>
									<text v-else>{{goodsTypeName}}</text>
									<image src="../../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker" id="quality">
						<view class="line_name">
							<text>成色</text><text class="star">*</text>
						</view>
						<view class="right">
							<picker :value="qualityIndex" :range="qualityPickerArr" @change="pickerChang($event,'quality')" >
								<view class="picker">
									<text class="noSet" v-if="!quality">请选择</text>
									<text v-else>{{qualityInfo}}</text>
									<image src="../../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker" id="name">
						<view class="line_name">
							<text>名称</text><text class="star">*</text>
						</view>
						<view class="right">
							<input v-model="name" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_textarea">
						<view class="line_name">
							<text>营销文案</text>
						</view>
						<view class="textarea">
							<textarea v-model="marketingDocument" placeholder="请输入" maxlength="200" />
							<text class="count">{{marketingDocument.length}}/200</text>
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>刻印&序列号</text>
						</view>
						<view class="right">
							<input v-model="manufacturerCode" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>尺寸</text>
						</view>
						<view class="right">
							<input v-model="size" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>材质</text>
						</view>
						<view class="right">
							<input v-model="material" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>瑕疵</text>
						</view>
						<view class="right">
							<input v-model="defects" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>配件</text>
						</view>
						<view class="right">
							<input v-model="accessories" type="text" placeholder="请输入" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>自定义标签</text>
						</view>
						<view class="right">
							<input v-model="customLabel" type="text" placeholder="最多五个哟~" />
						</view>
					</view>
				</view>
			</view>
			
			<view id="price_box">
				<view class="id_title">
					<text>价格</text>
				</view>
				<view class="ul">
					<view class="line_input" id='salePrice'>
						<view class="line_name">
							<text>销售价</text><text class="star">*</text>
						</view>
						<view class="right">
							<input v-model="salePrice" type="number" placeholder="请输入销售价" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>专柜价</text>
						</view>
						<view class="right">
							<input v-model="counterPrice" type="number" placeholder="请输入专柜价" />
						</view>
					</view>
					<view class="line_input">
						<view class="line_name">
							<text>同行价</text>
						</view>
						<view class="right">
							<input v-model="peerPrice" type="number" placeholder="请输入同行价" />
						</view>
					</view>
					<view class="line_button">
						<view class="line_name">
							<text>是否开启合作同行共享</text>
							<image class="warn_img" src="../../../static/addGoods/jg.png" @tap.stop="popupPeerSharing()"></image>
						</view>
						<view class="right">
							<view class="unchecked" :class="peerSharing ? 'active':''" @tap.stop="tabPeerSharing(1)"><text >是</text></view>
							<view class="unchecked" :class="!peerSharing ? 'active':''" @tap.stop="tabPeerSharing(0)"><text>否</text></view>
						</view>
					</view>
				</view>
			</view>
			
			<view id="origin_box">
				<view class="id_title">
					<text>来源</text>
				</view>
				<view class="ul">
					<view class="line_source">
						<view class="source_top">
							<view class="line_name">
								<text>商品来源</text>
							</view>
							<view class="right">
								<picker :value="originTypeIndex" :range="originTypePickerArr" @change="pickerChang($event,'originType')" >
									<view class="picker">
										<text class="noSet" v-if="!originType">请选择</text>
										<text v-else>{{originTypeInfo}}</text>
										<image src="../../../static/addGoods/go.png" ></image>
									</view>
								</picker>
							</view>
						</view>
						<view class="agent" v-if="originType=='COOPERATIVE_SALES'">
							<view class="agent_title">
								<text>同行合作</text>
							</view>
							<view class="agent_content">
								<view class="total_cost">
									<view class="left">
										<text>总成本</text>
									</view>
									<view class="right">
										<input v-model="costPrice" type="number" placeholder="请输入" :focus="costPriceFocus" />
									</view>
								</view>
								<view class="total_cost" v-for="(item,index) in cooperateSettings" :key="index">
									<view class="left_box">
										<view class="img" @tap.stop="delAgent(index)">
											<image src="../../../static/addGoods/sc.png"></image>
										</view>
										<view class="text">
											<view class="top">
												<text>{{item.cooperateShopName}}</text>
											</view>
											<view class="bot">
												<text style="margin-right: 30rpx;">出资{{item.contributionAmount}}元</text>
												<text>分润比例{{item.profitPercentage}}%</text>
											</view>
										</view>
									</view>
									<view class="right" @tap.stop="showAgent(1,index)">
										<image src="../../../static/addGoods/go.png"></image>
									</view>
								</view>
								<view class="add_agent" v-if="agentBtnShow" @tap.stop="showAgent(0)">
									<text>+ 添加合作同行</text>
								</view>
							</view>
						</view>
					</view>
					<view class="line_input" v-if="originType!='COOPERATIVE_SALES'&&originType!='CUSTOMER_CONSIGN'">
						<view class="line_name">
							<text>总成本价</text>
						</view>
						<view class="right">
							<input v-model="costPrice" type="number" placeholder="请输入总成本价" />
						</view>
					</view>
					<!-- <view class="line_input" v-if="originType=='CUSTOMER_CONSIGN'">
						<view class="line_name">
							<text>总销售额</text>
						</view>
						<view class="right">
							<input type="number" placeholder="请输入总销售额" disabled/>
						</view>
					</view> -->
					<view class="line_picker">
						<view class="line_name">
							<text>存放地点</text>
						</view>
						<view class="right">
							<picker :value="storePlaceIndex" :range="storePlacePickerArr" @change="pickerChang($event,'storePlace')" >
								<view class="picker">
									<text class="noSet" v-if="!storePlaceId">请选择</text>
									<text v-else>{{storePlaceName}}</text>
									<image src="../../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>回收人员</text>
						</view>
						<view class="right" @tap.stop="$toPath('../../select/multiStaff/multiStaff')">
							<view class="picker">
								<text class="noSet" v-if="!recycleUserId">请选择</text>
								<text v-else>{{recycleUserName}}</text>
								<image src="../../../static/addGoods/go.png"></image>
							</view>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>鉴定人员</text>
						</view>
						<view class="right" @tap.stop="$toPath('../../select/singleStaff/singleStaff')">
							<view class="picker">
								<text class="noSet" v-if="!checkupUserId">请选择</text>
								<text v-else>{{checkupUserName}}</text>
								<image src="../../../static/addGoods/go.png" ></image>
							</view>
						</view>
					</view>
					<view class="line_date">
						<view class="line_name">
							<text>入库日期</text>
						</view>
						<view class="right">
							<uni-datetime-picker :value="storeTime" @change="datePickerChang($event)">
								<view class="picker">
									<text class="noSet" v-if="!storeTime">请选择</text>
									<text v-else>{{storeTime}}</text>
									<image src="../../../static/addGoods/rq.png"></image>
								</view>
							</uni-datetime-picker>
						</view>
					</view>
				</view>
			</view>
			<view id="other_box">
				<view class="id_title">
					<text>其他</text>
				</view>
				<view class="ul">
					<view class="line_textarea">
						<view class="line_name">
							<text>内部备注</text>
						</view>
						<view class="textarea">
							<textarea v-model="internalRemark" placeholder="请输入" maxlength="200" />
							<text class="count">{{internalRemark.length}}/200</text>
						</view>
					</view>
					<view class="line_button">
						<view class="line_name">
							<text>是否借出</text>
						</view>
						<view class="right">
							<view class="unchecked" :class="hasLent ? 'active':''" @tap.stop="tabHasLent(1)"><text >是</text></view>
							<view class="unchecked" :class="!hasLent ? 'active':''" @tap.stop="tabHasLent(0)"><text>否</text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 添加合作同行 -->
			<view class="agentMask" v-if="agentMaskShow" @touchmove.prevent @tap.stop="hideAgent()">
				<view class="agent-box" @tap.stop>
					<view class="addAgent-title">
						<text>添加合作同行</text>
					</view>
					<view class="agentul">
						<view class="agentli">
							<view class="left">
								<text>名称</text>
							</view>
							<view class="right" @tap.stop="$toPath('../../select/selectPeer/selectPeer')">
								<view class="picker">
									<text class="noSet" v-if="!cooperateShopId">请选择</text>
									<text v-else>{{cooperateShopName}}</text>
									<image src="../../../static/addGoods/go.png" ></image>
								</view>
							</view>
						</view>
						<view class="agentli">
							<view class="left">
								<text>出资金额（元）</text>
							</view>
							<view class="right">
								<input v-model="contributionAmount" type="number" placeholder="请输入" :focus="contributionAmountFocus" />
							</view>
						</view>
						<view class="agentli">
							<view class="left">
								<text>分润比例（%）</text>
							</view>
							<view class="right">
								<input v-model="profitPercentage" type="number" placeholder="请输入" :focus="profitPercentageFocus" />
							</view>
						</view>
					</view>
					<view class="agent_btn">
						<view class="agent_left" @tap.stop="hideAgent()">取消</view>
						<view class="agent_right" @tap.stop="addAgent(0)" v-if="!agentEdit">完成</view>
						<view class="agent_right" @tap.stop="addAgent(1)" v-else>完成</view>
					</view>
					<view class="safety"></view>
				</view>
			</view>
			<view class="publishan_button" @tap.stop="save()">
				<text>发布商品</text>
			</view>
			<view class="safety" style="background-color: #57BFA3;"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode:'edit',//add 增加 edit编辑
				goodsId:'',
				token:uni.getStorageSync('token'),
				// shopUser: uni.getStorageSync("shopUser"),
				
				navIndex: 1,//导航栏index
				scrollTopId:'',//滚动ID
				//滚动Top
				descriptionTop:0,
				priceTop:0,
				originTop:0,
				
				//#1
				dragShow:true,
				picList:[],//商品图片列表
			
				goodsBrand:{},//品牌
				goodsBrandId:'',//品牌 id
				goodsBrandName:'',//品牌名称

				goodsType:{},//类型
				goodsTypeId:'',//类型id
				goodsTypeName:'',//类型名称
				goodsTypeArr:[],//分类数组 传id 获取
				goodsTypePickerArr:[],//分类选择器数组
				goodsTypeIndex:'',//分类选择器index
			
				quality:'',//成色 
				qualityInfo:'',//成色描述
				qualityArr:[],//成色数组 传value 获取
				qualityPickerArr:[],//成色选择器数组
				qualityIndex:'',
		
				name:'',//商品名称
		
				marketingDocument:'',//营销描述
				
				manufacturerCode:'',//印刻 序列号
			
				size:'',//尺寸

				material:'',//材质
	
				defects:'',//瑕疵
	
				accessories:'',//商品配件
				
				customLabel:'',//自定义标签
				
				//#2
				salePrice:'',//销售价

				counterPrice :'',//专柜价
		
				peerPrice:'',//同行价
				
			
				peerSharing:true,//是否同行共享
				
				//#3
				originType:'',//商品来源(代码)
				originTypeInfo:'',//商品来源说明
				originTypeArr:[],//来源数组 传value 获取
				originTypePickerArr:[],//来源选择器数组
				originTypeIndex:'',
				
			
				//同行合作
				agentBtnShow:true,
				agentMaskShow:false,//添加合作同行蒙层
				agentEdit:false,//false新增 true编辑
				agentEditIndex:'',//编辑index
				cooperateSettings:[],//同行合作配置列表
				//{
				contributionAmount:'',//出资金额
				contributionAmountFocus:false,
				profitPercentage:'',//分润比例
				profitPercentageFocus:false,
				
				cooperateShop:'',//合作店铺
				cooperateShopId:'',//合作店铺id
				cooperateShopName:'',//合作店铺简称
				
				costPrice:'',//成本价
				costPriceFocus:false,
				
				storeInCurrShop:false,//是否存放本店仓库
				storePlaceId:'',//存放地点id, 若storeInCurrShop为真，则表示商品存在本店的某个仓库中,此处存仓库id,否则存门店id
				storePlaceName:'',//存放地点名称, 若storeInCurrShop为真，则表示商品存在本店的某个仓库中,此处存仓库id,否则存门店id
				storePlaceArr:[],//存放地点 传value 获取
				storePlacePickerArr:[],//存放地点选择器数组
				storePlaceIndex:'',

				recycleUserId:'',//回收员工id
				recycleUserName:'',//回收员工用户名

				checkupUserId:'',//鉴定员工id
				checkupUserName:'',//鉴定员工用户名
				

				storeTime:'',//入库完整时间(日期+时间),格式：yyyy-MM-dd HH:mm:ss

				internalRemark:'',//内部备注
				
				//#4
				hasLent:false,//是否借出
				shopId: uni.getStorageSync("shopUser").shopId, // 所选店铺id,此处为固定值,根据登录用户从本地存储中取
				customLabelList:'',//商品配件
				detailedDescription:'',//商品详细描述
				goodsCode:'',//编号或编码
			};
		},
		onLoad(options) {
			this.storeTime = this.$getNewDate()
			if(options.mode){
				this.mode = options.mode
			}else{
				this.mode = 'edit'
			}
			if(this.mode == 'edit'){
				this.goodsId = options.goodsId
				uni.setNavigationBarTitle({title:'编辑商品'})
				//搜索商品信息的函数（接口）
				this.getDetailArr()
			}else if(this.mode == 'add'){
				uni.setNavigationBarTitle({title:'新增商品'})
			}
			this.getPickerArr('/goodsSku/getGoodsTypes')
			this.getPickerArr('/dictItem/getGoodsQualityItems')
			this.getPickerArr('/dictItem/getOriginTypeItems')
			this.getPickerArr('/shop/getStorePlaces')
		},
		onShow() {
			this.getGoodsBrands()
			this.getCheckupUser()
			this.getRecycleUser()
			this.getCooperateShop()
		},
		onReady() {
			this.getBoxTop()
		},
		watch:{
			costPrice(val){
				let total = 0
				for(let item of this.cooperateSettings){
					total += Number(item.contributionAmount)
				}
				if(val<total){
					uni.showModal({
						title:'注意',
						content:'总成本不能小于'+total,
						showCancel:false,
						success: (res) => {
							this.costPrice = total
							this.costPriceFocus = false
							setTimeout(()=>{
								this.costPriceFocus = true
							},100)
						}
					})
					return
				}
			},
			//添加合作同行按钮是否显示
			cooperateSettings:{
				handler(val){
					let conTotal = 0
					let cooTotal = 0
					for(let item of val){
						conTotal += Number(item.contributionAmount)
						cooTotal += Number(item.profitPercentage)
					}
					if(conTotal>=this.costPrice){
						this.agentBtnShow = false
					}else if(cooTotal>=100){
						this.agentBtnShow = false
					}else{
						this.agentBtnShow = true
					}
				},
				deep:true
			},
			goodsTypeIndex(val){
				this.goodsType = this.goodsTypeArr[val]
				this.goodsTypeId = this.goodsTypeArr[val].id
				this.goodsTypeName = this.goodsTypeArr[val].name
			},
			qualityIndex(val){
				this.quality = this.qualityArr[val].itemValue
				this.qualityInfo = this.qualityArr[val].itemName
			},
			originTypeIndex(val){
				this.originType = this.originTypeArr[val].itemValue
				this.originTypeInfo = this.originTypeArr[val].itemName
			},
			storePlaceIndex(val){
				if(this.storePlaceArr==[]||!this.$isArray(this.storePlaceArr)||this.storePlaceArr==''||this.storePlaceArr==null||this.storePlaceArr==undefined){
					return
				}
				this.storeInCurrShop = this.storePlaceArr[val].storeInCurrShop
				this.storePlaceId = this.storePlaceArr[val].storePlaceId
				this.storePlaceName = this.storePlaceArr[val].storePlaceName
			}
		},
		methods: {
			tabNav(index) {
				if(index == 1){
					this.scrollTopId = 'description_box'
				}else if(index == 2){
					this.scrollTopId = 'price_box'
				}else if(index == 3){
					this.scrollTopId = 'origin_box'
				}
				setTimeout(()=>{
					this.navIndex = index
				},50)
			},
			scrollY(e){
				if(e.target.scrollTop >= this.descriptionTop&&e.target.scrollTop <= this.priceTop){
					this.navIndex = 1
				}else if(e.target.scrollTop >= this.priceTop&&e.target.scrollTop <= this.originTop){
					this.navIndex = 2
				}else if(e.target.scrollTop >= this.originTop){
					this.navIndex = 3
				}
			},
			getBoxTop(){
				uni.createSelectorQuery().select("#description_box").boundingClientRect((data) => {
					this.descriptionTop = data.top-45
				}).exec();
				uni.createSelectorQuery().select("#price_box").boundingClientRect((data) => {
					this.priceTop = data.top-45
				}).exec();
				uni.createSelectorQuery().select("#origin_box").boundingClientRect((data) => {
					this.originTop = data.top-45
				}).exec();
			},
			//普通选择器触发
			pickerChang(e,type){
				if(type == 'goodsType'){
					this.goodsTypeIndex = e.detail.value
				}else if(type == 'quality'){
					this.qualityIndex = e.detail.value
				}else if(type == 'originType'){
					this.originTypeIndex = e.detail.value
				}else if(type == 'storePlace'){
					this.storePlaceIndex = e.detail.value
				}
			},
			//时间选择器触发
			datePickerChang(e){
				this.storeTime = e
			},
			//获取选择器数组
			async getPickerArr(url){
				let res = await this.$get({
					url:url,
				})
				if(url == '/goodsSku/getGoodsTypes'){
					this.goodsTypeArr = res.data.data
					for(let item of res.data.data){
						this.goodsTypePickerArr.push(item.name)
					}
				}else if(url == '/dictItem/getGoodsQualityItems'){
					this.qualityArr = res.data.data
					for(let item of res.data.data){
						this.qualityPickerArr.push(item.itemName)
					}
				}else if(url == '/dictItem/getOriginTypeItems'){
					this.originTypeArr = res.data.data
					for(let item of res.data.data){
						this.originTypePickerArr.push(item.itemName)
					}
				}else if(url == '/shop/getStorePlaces'){
					this.storePlaceArr = res.data.data
					console.log(res.data.data)
					for(let item of res.data.data){
						this.storePlacePickerArr.push(item.storePlaceName)
					}
					if(this.mode == 'add'){
						for(let i=0;i<this.storePlaceArr.length;i++){
							if(this.storePlaceArr[i].storePlaceId==this.shopUser.shopId){
								this.storePlaceIndex = i
								break
							}
						}
					}
				}
			},
			getGoodsBrands(){
				let goodsBrands = uni.getStorageSync('goodsBrands')
				if(this.$isObject(goodsBrands)&&goodsBrands!={}){
					this.goodsBrand = goodsBrands.goodsBrand
					this.goodsBrandId = goodsBrands.goodsBrandId
					this.goodsBrandName = goodsBrands.goodsBrandName
					uni.removeStorageSync('goodsBrands')
				}
			},
			getCooperateShop(){
				let cooperateShop = uni.getStorageSync('cooperateShop')
				if(this.$isObject(cooperateShop)&&cooperateShop!={}){
					this.cooperateShop = cooperateShop.cooperateShop
					this.cooperateShopId = cooperateShop.cooperateShopId
					this.cooperateShopName = cooperateShop.cooperateShopName
					uni.removeStorageSync('cooperateShop')
				}
			},
			getRecycleUser(){
				let recycleUser = uni.getStorageSync('recycleUser')
				if(this.$isObject(recycleUser)&&recycleUser!={}){
					this.recycleUserId = recycleUser.recycleUserId
					this.recycleUserName = recycleUser.recycleUserName
					uni.removeStorageSync('recycleUser')
				}
			},
			getCheckupUser(){
				let checkupUser = uni.getStorageSync('user')
				if(this.$isObject(checkupUser)&&checkupUser!={}){
					this.checkupUserId = checkupUser.userId
					this.checkupUserName = checkupUser.userName
					uni.removeStorageSync('user')
				}
			},
			// 获取商品详情数据
			async getDetailArr(){
				this.dragShow=false
				let res = await this.$get({
					url:'/goodsSku/detail?id='+this.goodsId,
				})
				let goods = res.data.data
				this.picList = goods.picList
				this.dragShow=true
	
				this.goodsBrand = goods.goodsBrand//品牌
				this.goodsBrandId = goods.goodsBrandId//品牌 id
				this.goodsBrandName = goods.goodsBrandName//品牌名称
				
				this.goodsType = goods.goodsType//类型
				this.goodsTypeId = goods.goodsTypeId//类型id
				this.goodsTypeName = goods.goodsTypeName//类型名称
	
				this.quality = goods.quality//成色 
				this.qualityInfo = goods.qualityInfo//成色描述
		
				this.name = goods.name//商品名称
			
				this.marketingDocument = goods.marketingDocument//营销描述
				
				this.manufacturerCode = goods.manufacturerCode//印刻 序列号
				
				this.size = goods.size//尺寸
			
				this.material = goods.material//材质
			
				this.defects = goods.defects//瑕疵
		
				this.customLabelList = goods.customLabelList//商品配件
				
				this.customLabel = goods.customLabel//自定义标签
			
				this.salePrice = goods.salePrice//销售价
	
				this.counterPrice = goods.counterPrice//专柜价
		
				this.peerPrice = goods.peerPrice//同行价
				
				if(goods.cooperateSettings==null){
					this.cooperateSettings = []
				}else{
					this.cooperateSettings = goods.cooperateSettings
				}
				
				
				this.costPrice = goods.costPrice//成本价
		
				this.peerSharing = goods.peerSharing//是否同行共享
				
				this.originType = goods.originType//商品来源(代码)
				this.originTypeInfo = goods.originTypeInfo//商品来源说明
				
				this.storeInCurrShop = goods.storeInCurrShop
				this.storePlaceId = goods.storePlaceId//存放地点id
				this.storePlaceName = goods.storePlaceName//存放地点名称
			
				this.recycleUserId = goods.recycleUserId//回收员工id
				this.recycleUserName = goods.recycleUserName//回收员工用户名
			
				this.checkupUserId = goods.checkupUserId//鉴定员工id
				this.checkupUserName = goods.checkupUserName//鉴定员工用户名
			
				this.storeTime = goods.storeTime//入库完整时间(日期+时间)
		
				this.internalRemark = goods.internalRemark//内部备注
				
				this.hasLent = goods.hasLent//是否借出
				
				this.goodsCode = goods.goodsCode//编号或编码
				
				this.detailedDescription = goods.detailedDescription//商品详细描述
			},
			updateList(list){
				this.picList = list
				console.log(this.picList)
			},
			//是否开启合作同行共享弹窗
			popupPeerSharing() {
				uni.showModal({
					title: '提示',
					content: '开启合作同行共享后,\n合作同行可以通过\n同行大仓查询到本商品,\n仅限于图片、描述资料。',
					showCancel:false,
				});
			},
			tabPeerSharing(type){
				this.peerSharing = type
			},
			//是否借出
			tabHasLent(type){
				this.hasLent = type
			},
			//添加合作同行弹窗
			showAgent(type,index){
				//type:0新增 1编辑
				if(this.costPrice==''||this.costPrice==null){
					uni.showModal({
						title:'注意',
						content:'请填写总成本',
						showCancel:false,
						success: (res) => {
							this.costPriceFocus = false
							setTimeout(()=>{
								this.costPriceFocus = true
							},100)
						}
					})
					return
				}
				if(!type){
					this.agentEdit = false
				}else{
					this.agentEdit = true
					this.agentEditIndex = index
					this.contributionAmount = this.cooperateSettings[index].contributionAmount
					this.profitPercentage = this.cooperateSettings[index].profitPercentage
					this.cooperateShopId = this.cooperateSettings[index].cooperateShopId
					this.cooperateShopName = this.cooperateSettings[index].cooperateShopName
				}
				this.agentMaskShow = true
			},
			hideAgent(){
				this.agentMaskShow = false
				this.contributionAmount = ''
				this.agentEditIndex = ''
				this.profitPercentage = ''
				this.cooperateShopId = ''
				this.cooperateShopName = ''
			},
			addAgent(type){
				//type:0新增 1编辑
				if(this.cooperateShopId==''||this.cooperateShopId==null){
					uni.showModal({
						title:'注意',
						content:'请选择合作店铺',
						showCancel:false,
					})
					return
				}
				if(this.contributionAmount==''||this.contributionAmount==null){
					uni.showModal({
						title:'注意',
						content:'请填写出资金额',
						showCancel:false,
						success: (res) => {
							this.contributionAmountFocus = false
							setTimeout(()=>{
								this.contributionAmountFocus = true
							},100)
						}
					})
					return
				}
				if(this.profitPercentage==''||this.profitPercentage==null){
					uni.showModal({
						title:'注意',
						content:'请填写分润比例',
						showCancel:false,
						success: (res) => {
							this.profitPercentageFocus = false
							setTimeout(()=>{
								this.profitPercentageFocus = true
							},100)
						}
					})
					return
				}
				let conTotal = 0
				let cooTotal = 0
				for(let [i,item] of this.cooperateSettings.entries()){
					if(!type){
						conTotal += Number(item.contributionAmount)
						cooTotal += Number(item.profitPercentage)
					}else{
						if(i!=this.agentEditIndex){
							conTotal += Number(item.contributionAmount)
							cooTotal += Number(item.profitPercentage)
						}
					}
				}
				if((this.costPrice - conTotal - this.contributionAmount) < 0){
					uni.showModal({
						title:'注意',
						content:'金额不能超过'+(this.costPrice - conTotal),
						showCancel:false,
						success: (res) => {
							this.contributionAmount = ''
							this.contributionAmountFocus = false
							setTimeout(()=>{
								this.contributionAmountFocus = true
							},100)
						}
					})
					return
				}
				if((100 - cooTotal - this.profitPercentage) < 0){
					uni.showModal({
						title:'注意',
						content:'比例不能超过'+(100 - cooTotal)+'%',
						showCancel:false,
						success: (res) => {
							this.profitPercentage = ''
							this.profitPercentageFocus = false
							setTimeout(()=>{
								this.profitPercentageFocus = true
							},100)
						}
					})
					return
				}
				if(!type){
					this.cooperateSettings.push({
						contributionAmount:this.contributionAmount,
						cooperateShopId:this.cooperateShopId,
						cooperateShopName:this.cooperateShopName,
						goodsSkuId:this.goodsId,
						launchShopId:this.shopUser.shopId,
						launchShopName:this.shopUser.shopName,
						// profitAmount:this.costPrice * this.profitPercentage / 100
						profitPercentage:this.profitPercentage,
					})
				}else{
					this.cooperateSettings[this.agentEditIndex].contributionAmount = this.contributionAmount
					this.cooperateSettings[this.agentEditIndex].cooperateShopId = this.cooperateShopId
					this.cooperateSettings[this.agentEditIndex].cooperateShopName = this.cooperateShopName
					this.cooperateSettings[this.agentEditIndex].profitPercentage = this.profitPercentage
					
				}
				this.hideAgent()
			},
			delAgent(index){
				this.cooperateSettings.splice(index,1)
			},
			
			async save(){
				uni.showLoading({title:'发布中...'})
				if(this.goodsBrandId==''||this.goodsBrandId==null){
					uni.hideLoading()
					uni.showToast({
						title:'请选择品牌',
						icon:'none'
					})
					this.scrollTopId = ''
					setTimeout(()=>{
						this.scrollTopId = 'goodsBrand'
					},100)
					return
				}else if(this.goodsTypeId==''||this.goodsTypeId==null){
					uni.hideLoading()
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
					this.scrollTopId = ''
					setTimeout(()=>{
						this.scrollTopId = 'goodsType'
					},100)
					return
				}else if(this.quality==''||this.quality==null){
					uni.hideLoading()
					uni.showToast({
						title:'请选择成色',
						icon:'none'
					})
					this.scrollTopId = ''
					setTimeout(()=>{
						this.scrollTopId = 'quality'
					},100)
					return
				}else if(this.name==''||this.name==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入名称',
						icon:'none'
					})
					this.scrollTopId = ''
					setTimeout(()=>{
						this.scrollTopId = 'name'
					},100)
					return
				}else if(this.salePrice==''||this.salePrice==null){
					uni.hideLoading()
					uni.showToast({
						title:'请输入销售价',
						icon:'none'
					})
					this.scrollTopId = ''
					setTimeout(()=>{
						this.scrollTopId = 'salePrice'
					},100)
					return
				}
				for(let i=0;i<this.picList.length;i++){
					this.picList[i].sort = i+1
				}
				console.log(this.picList)
				let res = await this.$post({
					url:'/goodsSku/save',
					data:{
						"accessories": this.accessories,
						"checkupUserId": this.checkupUserId,
						"checkupUserName": this.checkupUserName,
						"customLabelList": this.customLabelList,//自定义商品标签
						"cooperateSettings": this.cooperateSettings,  //同行合作配置列表
						"costPrice": this.costPrice,
						"counterPrice": this.counterPrice,
						"createTime": this.createTime,
						"defects": this.defects,
						"detailedDescription": this.detailedDescription,//商品详细描述
						"goodsBrand": this.goodsBrand,
						"goodsBrandId": this.goodsBrandId,
						"goodsBrandName": this.goodsBrandName,
						"goodsCode": this.goodsCode,//编号或编码
						"goodsType": this.goodsType,
						"goodsTypeId": this.goodsTypeId,
						"goodsTypeName": this.goodsTypeName,
						"hasLent":this.hasLent, 
						"id": this.goodsId,
						"internalRemark": this.internalRemark,
						"manufacturerCode":this.manufacturerCode,
						"marketingDocument": this.marketingDocument,
						"material": this.material,
						"name": this.name,
						"originType":this.originType,
						"originTypeInfo": this.originTypeInfo,
						"peerPrice": this.peerPrice,
						"costPrice": this.costPrice,
						"peerSharing": this.peerSharing,
						"picList": this.picList,
						"quality": this.quality,
						"qualityInfo": this.qualityInfo,
						"recycleUserId": this.recycleUserId,
						"recycleUserName": this.recycleUserName,
						"salePrice": this.salePrice,
						"shopId": this.shopId,
						"size": this.size,
						"storeInCurrShop": this.storeInCurrShop,
						"storePlaceId": this.storePlaceId,
						"storePlaceName": this.storePlaceName,
						"storeTime": this.storeTime,
					},
				})
				uni.hideLoading()
				if(res.data.succeed){
					if(this.mode == 'edit'){
						this.$store.commit('setUpGoodsId',this.goodsId)
					}else if(this.mode == 'add'){
						this.$store.commit('setUpGoodsId','all')
					}
					uni.showToast({title:'发布成功'})
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
		},
	}
</script>

<style lang="scss">
	@import "./addGoods.scss";
	.drag{
		width: 222rpx;
		height: 220rpx;
		position: relative;
		.add-wrap{
			width: 222rpx;
			height: 220rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.drag_mask{
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}
	}
</style>
