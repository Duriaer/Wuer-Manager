<template>
	<view class="addRole">
			<view class="ul">
				<view class="line_input" style="margin-top: 16rpx;">
					<view class="line_name">
						<text>角色名称</text><text class="star">*</text>
					</view>
					<view class="right">
						<input type="text" placeholder="请输入" />
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
