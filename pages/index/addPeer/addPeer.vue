<template>
	<view class="addPeer">
		<view class="message">
			<view class="title">
				<text>基本信息</text>
			</view>
			<view class="ul">
				<view class="line_input">
					<view class="line_name">
						<text>同行简称</text><text class="star">*</text>
					</view>
					<view class="right">
						<input type="text" placeholder="请输入" />
					</view>
				</view>
				<view class="line_input">
					<view class="line_name">
						<text>同行全称</text>
					</view>
					<view class="right">
						<input type="text" placeholder="请输入" />
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
				<view class="line_input">
					<view class="line_name">
						<text>地址</text>
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
    @import "./addPeer.scss";
</style>
