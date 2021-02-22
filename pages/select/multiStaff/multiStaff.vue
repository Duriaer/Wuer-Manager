<template>
	<view class="multiStaff">
		<view class="total">
			<text>员工总数:999个</text>
		</view>
		<checkbox-group @change="checkboxChange">
			<label class="select">
				<view class="list">
					<view class="checkbox">
						<checkbox style="transform:scale(0.7)" color="#57BFA3"/>
					</view>
					<view class="left">
						<text class="title">大美丽</text>
						<text>登录账号:</text>
						<text>手机号码:</text>
						<text>创建时间:</text>
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
			</label>
			<label class="select">
				<view class="list">
					<view class="checkbox">
						<checkbox style="transform:scale(0.7)" color="#57BFA3"/>
					</view>
					<view class="left">
						<text class="title">大美丽</text>
						<text>登录账号:</text>
						<text>手机号码:</text>
						<text>创建时间:</text>
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
			</label>
		</checkbox-group>
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
	@import "./multiStaff.scss";
</style>
