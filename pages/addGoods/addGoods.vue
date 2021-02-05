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
							<image-drag :picList="picList"></image-drag>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>品牌</text><text class="star">*</text>
						</view>
						<view class="right" style="width: 75%;" @tap.stop="$toPath('./brandChoice/brandChoice')">
							<view class="picker">
								<text class="noSet" v-if="!goodsBrandId">请选择</text>
								<text v-else>{{goodsBrandName}}</text>
								<image src="../../static/addGoods/go.png" ></image>
							</view>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>分类</text><text class="star">*</text>
						</view>
						<view class="right">
							<picker :value="goodsTypeIndex" :range="goodsTypePickerArr" @change="pickerChang($event,'goodsType')" >
								<view class="picker">
									<text class="noSet" v-if="!goodsTypeId">请选择</text>
									<text v-else>{{goodsTypeName}}</text>
									<image src="../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>成色</text><text class="star">*</text>
						</view>
						<view class="right">
							<picker :value="qualityIndex" :range="qualityPickerArr" @change="pickerChang($event,'quality')" >
								<view class="picker">
									<text class="noSet" v-if="!quality">请选择</text>
									<text v-else>{{qualityInfo}}</text>
									<image src="../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker">
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
				</view>
			</view>
			
			<view id="price_box">
				<view class="id_title">
					<text>价格</text>
				</view>
				<view class="ul">
					<view class="line_input">
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
					<view class="line_input">
						<view class="line_name">
							<text>成本价</text>
						</view>
						<view class="right">
							<input v-model="costPrice" type="number" placeholder="请输入成本价" />
						</view>
					</view>
					<view class="line_button">
						<view class="line_name">
							<text>是否开启合作同行共享</text>
							<image class="warn_img" src="../../static/addGoods/jg.png" @tap.stop="popupPeerSharing()"></image>
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
										<image src="../../static/addGoods/go.png" ></image>
									</view>
								</picker>
							</view>
						</view>
						<view class="agent">
							<view class="agent_title">
								<text>同行合作</text>
							</view>
							<view class="agent_content">
								<view class="total_cost">
									<view class="left">
										<text>总成本</text>
									</view>
									<view class="right">
										<input v-model="counterPrice" type="number" placeholder="请输入" />
									</view>
								</view>
								<view class="total_cost">
									<view class="left_box">
										<view class="img">
											<image src="../../static/addGoods/sc.png" @tap.stop="deleteRow()"></image>
										</view>
										<view class="text">
											<view class="top">
												<text>本店</text>
											</view>
											<view class="bot">
												<text style="margin-right: 30rpx;">出资10000元</text>
												<text>分润比例50%</text>
											</view>
										</view>
									</view>
									<view class="right" @tap.stop="showAddAagent()">
										<image src="../../static/addGoods/go.png"></image>
									</view>
								</view>
								<view class="add_agent"  @tap.stop="showAddAagent()">
									<text>+ 添加合作同行</text>
								</view>
							</view>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>存放地点</text>
						</view>
						<view class="right">
							<picker :value="storePlaceIndex" :range="storePlacePickerArr" @change="pickerChang($event,'storePlace')" >
								<view class="picker">
									<text class="noSet" v-if="!storePlaceId">请选择</text>
									<text v-else>{{storePlaceName}}</text>
									<image src="../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>回收人员</text>
						</view>
						<view class="right">
							<picker :value="recycleUserIndex" :range="shopUserPickerArr" @change="pickerChang($event,'recycleUser')" >
								<view class="picker">
									<text class="noSet" v-if="!recycleUserId">请选择</text>
									<text v-else>{{recycleUserName}}</text>
									<image src="../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_picker">
						<view class="line_name">
							<text>鉴定人员</text>
						</view>
						<view class="right">
							<picker :value="checkupUserIndex" :range="shopUserPickerArr" @change="pickerChang($event,'checkupUser')" >
								<view class="picker">
									<text class="noSet" v-if="!checkupUserId">请选择</text>
									<text v-else>{{checkupUserName}}</text>
									<image src="../../static/addGoods/go.png" ></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="line_date">
						<view class="line_name">
							<text>入库日期</text>
						</view>
						<view class="right">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="datePickerChang">
								<view class="picker">
									<text class="noSet" v-if="!storeTime">请选择</text>
									<text v-else>{{storeTime}}</text>
									<image src="../../static/addGoods/rq.png"></image>
								</view>
							</picker>
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
			<view class="agentMask" v-if="addAagentShow" @touchmove.prevent @tap.stop="hideAgentMask()">
				<view class="agent-box">
					<view class="addAgent-title">
						<text>添加合作同行</text>
					</view>
					<view class="agentul">
						<view class="agentli">
							<view class="left">
								<text>名称</text>
							</view>
							<view class="right"  style="padding-right: 20rpx;color: #8F8F8F;">
								<text>本店</text>
							</view>
						</view>
						<view class="agentli">
							<view class="left">
								<text>出资金额（元）</text>
							</view>
							<view class="right">
								<input v-model="name" type="number" placeholder="请输入" />
							</view>
						</view>
						<view class="agentli">
							<view class="left">
								<text>分润比例（%）</text>
							</view>
							<view class="right">
								<input v-model="name" type="number" placeholder="请输入" />
							</view>
						</view>
					</view>
					<view class="agent_btn">
						<view class="agent_left">取消</view>
						<view class="agent_right">完成</view>
					</view>
				</view>
			</view>
			<view class="publishan_button" @tap.stop="save()">
				<text>发布商品</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			let currentDate = this.getDate({
				format: true
			})
			return {
				mode:'edit',//add 增加 edit编辑
				goodsId:'',
				token:uni.getStorageSync('token'),
				
				navIndex: 1,//导航栏index
				scrollTopId:'',//滚动ID
				//滚动Top
				descriptionTop:0,
				priceTop:0,
				originTop:0,
				
				date: currentDate,
				
				//#1
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
				
				//#2
				salePrice:'',//销售价

				counterPrice :'',//专柜价
		
				peerPrice:'',//同行价
				
				costPrice:'',//成本价
			
				peerSharing:true,//是否同行共享
				
				//#3
				originType:'',//商品来源(代码)
				originTypeInfo:'',//商品来源说明
				originTypeArr:[],//来源数组 传value 获取
				originTypePickerArr:[],//来源选择器数组
				originTypeIndex:'',
				
			
				//同行合作
				addAagentShow:false,//添加合作同行
				cooperatePercentage:'',//合作店铺分成比例
				cooperateShopId:'',	//合作店铺id
				goodsSkuId:'',//商品id
				launchShopId:'',//发起店铺id
				
				storeInCurrShop:false,//是否存放本店仓库
				storePlaceId:'',//存放地点id, 若storeInCurrShop为真，则表示商品存在本店的某个仓库中,此处存仓库id,否则存门店id
				storePlaceName:'',//存放地点名称, 若storeInCurrShop为真，则表示商品存在本店的某个仓库中,此处存仓库id,否则存门店id
				storePlaceArr:[],//存放地点 传value 获取
				storePlacePickerArr:[],//存放地点选择器数组
				storePlaceIndex:'',

				recycleUserId:'',//回收员工id
				recycleUserName:'',//回收员工用户名
				shopUserArr:[],//所有员工 传id 获取
				shopUserPickerArr:[],//所有员工选择器数组
				recycleUserIndex:'',

				checkupUserId:'',//鉴定员工id
				checkupUserName:'',//鉴定员工用户名
				checkupUserIndex:'',

				storeTime:'',//入库完整时间(日期+时间),格式：yyyy-MM-dd HH:mm:ss

				internalRemark:'',//内部备注
				
				//#4
				hasLent:false,//是否借出
				shopId: uni.getStorageSync("shopUser").shopId, // 所选店铺id,此处为固定值,根据登录用户从本地存储中取
			};
		},
		onLoad(options) {
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
			this.getGoodsTypeArr()
			this.getQualityArr()
			this.getOriginTypeArr()
			this.getStorePlaceArr()
			this.getShopUserItems()
			
		},
		onShow() {
			let goodsBrands = uni.getStorageSync('goodsBrands')
			// console.log(goodsBrands)
			if(this.$isObject(goodsBrands)&&goodsBrands!={}){
				this.goodsBrand = goodsBrands.goodsBrand
				this.goodsBrandId = goodsBrands.goodsBrandId
				this.goodsBrandName = goodsBrands.goodsBrandName
				uni.removeStorageSync('goodsBrands')
			}
		},
		onReady() {
			this.getBoxTop()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch:{
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
				this.storeInCurrShop = this.storePlaceArr[val].storeInCurrShop
				this.storePlaceId = this.storePlaceArr[val].storePlaceId
				this.storePlaceName = this.storePlaceArr[val].storePlaceName
			},
			recycleUserIndex(val){
				this.recycleUserId = this.shopUserArr[val].id
				this.recycleUserName = this.shopUserArr[val].username
			},
			checkupUserIndex(val){
				this.checkupUserId = this.shopUserArr[val].id
				this.checkupUserName = this.shopUserArr[val].username
			},
		},
		methods: {
			//获取全部分类列表
			async getGoodsTypeArr(){
					let res = await this.$get({
						url:'/goodsSku/getGoodsTypes',
					})
					this.goodsTypeArr = res.data.data
					for(let i=0;i<this.goodsTypeArr.length;i++){
						this.goodsTypePickerArr.push(this.goodsTypeArr[i].name)
					}
			},
			//获取成色列表
			async getQualityArr(){
					let res = await this.$get({
						url:'/dictItem/getGoodsQualityItems',
					})
					this.qualityArr = res.data.data
					for(let i=0;i<this.qualityArr.length;i++){
						this.qualityPickerArr.push(this.qualityArr[i].itemName)
					}
			},
			//获取来源列表
			async getOriginTypeArr(){
					let res = await this.$get({
						url:'/dictItem/getOriginTypeItems',
					})
					this.originTypeArr = res.data.data
					for(let i=0;i<this.originTypeArr.length;i++){
						this.originTypePickerArr.push(this.originTypeArr[i].itemName)
					}
			},
			//获取位置列表
			async getStorePlaceArr(){
					let res = await this.$get({
						url:'/shop/getStorePlaces',
					})
					this.storePlaceArr = res.data.data
					for(let i=0;i<this.storePlaceArr.length;i++){
						this.storePlacePickerArr.push(this.storePlaceArr[i].storePlaceName)
					}
			},
			//获取本店所有员工列表
			async getShopUserItems(){
					let res = await this.$get({
						url:'/goodsSku/getShopUserItems',
					})
					// console.log(res.data.data)
					this.shopUserArr = res.data.data
					for(let i=0;i<this.shopUserArr.length;i++){
						this.shopUserPickerArr.push(this.shopUserArr[i].username)
					}
			},
			// 获取商品详情数据
			async getDetailArr(){
					let res = await this.$get({
						url:'/goodsSku/detail?id='+this.goodsId,
					})
					console.log(res.data)
					let goods = res.data.data
				
					this.picList = []
					for(let i=0;i<goods.picList.length;i++){
						this.picList.push(this.$imgUrl+goods.picList[i].thumbnail)
						console.log(this.$imgUrl+goods.picList[i].thumbnail)
					}
					console.log(this.picList)
		
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
			
					this.accessories = goods.accessories//商品配件
				
					this.salePrice = goods.salePrice//销售价
		
					this.counterPrice = goods.counterPrice//专柜价
			
					this.peerPrice = goods.peerPrice//同行价
					
					this.costPrice = goods.costPrice//成本价
			
					this.peerSharing = goods.peerSharing//是否同行共享
					
				
					this.originType = goods.originType//商品来源(代码)
					this.originTypeInfo = goods.originTypeInfo//商品来源说明
					
			
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
				}else if(type == 'recycleUser'){
					this.recycleUserIndex = e.detail.value
				}else if(type == 'checkupUser'){
					this.checkupUserIndex = e.detail.value
				}
			},
			selectItem(arr,index){
				arr[index].selected = !arr[index].selected
			},
			//时间选择器触发
			datePickerChang(e){
				this.storeTime = e.detail.value
			},
			getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
			},
			deleteRow(){
				
			},
			//是否开启合作同行共享弹窗
			popupPeerSharing() {
				uni.showModal({
					title: '提示',
					content: '开启合作同行共享后,合作同行可以通过同行大仓查询到本商品,仅限于图片、描述资料。',
					confirmColor: '#57BFA3',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			tabPeerSharing(type){
				this.peerSharing = type
			},
			//添加合作同行弹窗
			showAddAagent(){
				this.addAagentShow = true
			},
			hideAgentMask(){
				this.addAagentShow = false
			},
			//是否借出
			tabHasLent(type){
				this.hasLent = type
			},
			async save(){
				uni.showLoading({title:'发布中...'})
				let res = await this.$post({
					url:'/goodsSku/save',
					data:{
						"accessories": this.accessories,
						"checkupUserId": this.checkupUserId,
						"checkupUserName": this.checkupUserName,
						// "cooperateSettings": this.cooperateSettings,  //同行合作配置列表
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
						// "picList": this.picList,
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
				console.log(res)
				if(res.data.succeed){
					uni.showToast({title:'发布成功'})
					setTimeout(()=>{
						this.$back()
					},500)
				}
			},
		},
	}
</script>

<style lang="scss">
	@import "./addGoods.scss";
</style>
