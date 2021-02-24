<template>
	<view class="home-page">
		<view class="top">
			<!-- 头部安全区 -->
			<view class="status"></view>
			<view class="search">
				<view class="left">
					<image src="../../../static/index/ss.png"></image>
				</view>
				<view class="right" @tap.stop="scanCode()">
					<image src="../../../static/index/sm.png" ></image>
				</view>
			</view>
			<view class="sale">
				<swiper class="swiper" indicator-dots="ture">
					<swiper-item>
						<view class="swiper-item">
							<view class="title">
								<text>今日销售</text>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>销售数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>销售金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>退货数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>退货金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="title">
								<text>今日销售</text>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>销售数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>销售金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>退货数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>退货金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="title">
								<text>今日销售</text>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>销售数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>销售金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>退货数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>退货金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="title">
								<text>今日销售</text>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>销售数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>销售金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
							<view class="ul">
								<view class="li">
									<view class="head">
										<text>退货数量</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">80</text>
								</view>
								<view class="li">
									<view class="head">
										<text>退货金额</text>
										<image src="../../../static/index/go.png"></image>
									</view>
									<text class="figure">888888.00</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="button">
				<view class="li">
					<image src="../../../static/index/drk.png"></image>
					<text>待入库</text>
				</view>
				<view class="li">
					<image src="../../../static/index/djc.png"></image>
					<text>待借出</text>
				</view>
				<view class="li">
					<image src="../../../static/index/ycq.png"></image>
					<text>已超期</text>
				</view>
				<view class="li">
					<image src="../../../static/index/tjys.png"></image>
					<text>添加友商</text>
				</view>
			</view>
		</view>
		<view class="bot">
			<view class="title">
				<text>常用应用</text>
			</view>
			<view class="ul">
				<!-- <view class="li">
					<image src="../../../static/index/ysgl.png"></image>
					<text>友商管理</text>
				</view>
				<view class="li">
					<image src="../../../static/index/ystj.png"></image>
					<text>添加友商</text>
				</view> -->
				<view class="li" @tap.stop="$guestAdminister()">
					<image src="../../../static/index/kh.png"></image>
					<text>客户管理</text>
				</view>
				<view class="li" @tap.stop="$addGuest()">
					<image src="../../../static/index/xzkh.png"></image>
					<text>新增客户</text>
				</view>
				<view class="li" @tap.stop="$goTabbar('/pages/tabBar/goods/goods')">
					<image src="../../../static/index/spgl.png"></image>
					<text>商品管理</text>
				</view>
				<view class="li" @tap.stop="$addGoods()">
					<image src="../../../static/index/xzsp.png"></image>
					<text>新增商品</text>
				</view>
				<view class="li" @tap.stop="$goTabbar('/pages/tabBar/order/order')">
					<image src="../../../static/index/ddgl.png"></image>
					<text>订单管理</text>
				</view>
				<view class="li">
					<image src="../../../static/index/xzdd.png"></image>
					<text>新增订单</text>
				</view>
				<view class="li" @tap.stop="$staffAdminister()">
					<image src="../../../static/index/yggl.png"></image>
					<text>员工管理</text>
				</view>
				<view class="li" @tap.stop="$addStaff()">
					<image src="../../../static/index/xzyg.png"></image>
					<text>新增员工</text>
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
		},
		onLoad() {
			
		},
		methods:{
			scanCode(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "./index.scss";
</style>


