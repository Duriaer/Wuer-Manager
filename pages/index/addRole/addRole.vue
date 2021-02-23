<template>
	<view class="addRole">
		<view class="message">
			<view class="ul">
				<view class="line_input">
					<view class="line_name">
						<text>角色名称</text><text class="star">*</text>
					</view>
					<view class="right">
						<input v-model="roleName" type="text" placeholder="请输入" />
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
				<view class="line_switch">
					<view class="line_name">
						<text>状态</text>
					</view>
					<view class="right">
						<switch checked color="#57BFA3" style="transform:scale(0.6)"/>
						<text>启用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="authority-title">
			<text>权限列表</text>
		</view>
		<view class="authority">
			<view class="title">
				<text>基础</text>
				<image src="../../../static/addrole/xl.png"></image>
				<!-- <image src="../../../static/addrole/sq.png"></image> -->
			</view>
			<view class="ul">
				<checkbox-group @change="checkboxChange">
					<label class="option" v-for="item in items" :key="item.value">
						<view>
							<checkbox style="transform:scale(0.7)" color="#57BFA3" :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>商品</text>
				<image src="../../../static/addrole/xl.png"></image>
			</view>
			<view class="ul">
				<checkbox-group @change="checkboxChange">
					<label class="option" v-for="item in items" :key="item.value">
						<view>
							<checkbox style="transform:scale(0.7)" color="#57BFA3" :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>销售</text>
				<image src="../../../static/addrole/xl.png"></image>
			</view>
			<view class="ul">
				<checkbox-group @change="checkboxChange">
					<label class="option" v-for="item in items" :key="item.value">
						<view>
							<checkbox style="transform:scale(0.7)" color="#57BFA3" :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>客户</text>
				<image src="../../../static/addrole/xl.png"></image>
			</view>
			<view class="ul">
				<checkbox-group @change="checkboxChange">
					<label class="option" v-for="item in items" :key="item.value">
						<view>
							<checkbox style="transform:scale(0.7)" color="#57BFA3" :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="safety"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			roleName:'',

			items: [{
					value: 'USA',
					name: '美国'
				},
				{
					value: 'CHN',
					name: '中国',
					checked: 'true'
				},
				{
					value: 'BRA',
					name: '巴西'
				},
				{
					value: 'JPN',
					name: '日本'
				},
				{
					value: 'ENG',
					name: '英国'
				},
				{
					value: 'FRA',
					name: '法国'
				}
			]
		};
	},
	onLoad() {
		this.getRoleArr()
	},
	methods: {
		checkboxChange: function (e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				if(values.includes(item.value)){
					this.$set(item,'checked',true)
				}else{
					this.$set(item,'checked',false)
				}
			}
		},
		// 获取角色详情数据
		async getRoleArr(){
			let res = await this.$get({
				// url:'/shopRole/detail?id='+this.id,
				url:'/shopRole/detail?id=1',
			})
			console.log(res.data.data)
			let role = res.data.data		
		},
		// 保存角色信息
		async roleSave(){
			let params = {
				keyText: '', 
			};
			let res = await this.$post({
				url:'/shopRole/save',
				data:params,
			})
			// console.log(res.data.data)
		},
	}
}
</script>

<style lang="scss">
	@import "./addRole.scss";
</style>
