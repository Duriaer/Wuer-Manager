<template>
	<view class="guestAdminister">
		<view class="total">
			<text>员工总数:999个</text>
		</view>
		<view class="list">
			<view class="left">
				<view class="title">
					<text>大美丽</text>
					<image src="../../../static/administer/man.png"></image>
				</view>
				<text>手机号码:</text>
				<text>创建时间:</text>
				<text>最后交易:</text>
			</view>
			<view class="right">
				<view class="state">
					<text>启用</text>
				</view>
				<view class="role">
					<text>销售</text>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="left">
				<view class="title">
					<text>大美丽</text>
					<image src="../../../static/administer/women.png"></image>
				</view>
				<text>手机号码:</text>
				<text>创建时间:</text>
				<text>最后交易:</text>
			</view>
			<view class="right">
				<view class="state">
					<text>启用</text>
				</view>
				<view class="role">
					<text>销售</text>
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
    @import "./guestAdminister.scss";
</style>
