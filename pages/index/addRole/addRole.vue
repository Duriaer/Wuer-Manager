<template>
	<view class="addRole">
		<view class="message">
			<view class="ul">
				<view class="line_input">
					<view class="line_name">
						<text>角色名称</text><text class="star">*</text>
					</view>
					<view class="right">
						<input type="text" placeholder="请输入" />
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
		<text class="title">权限列表</text>
		<view class="authority">
			<view class="title">
				<text>基础</text>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>商品</text>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>销售</text>
			</view>
		</view>
		<view class="authority">
			<view class="title">
				<text>客户</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import "./addRole.scss";
</style>
