<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			let token = uni.getStorageSync('token')
			if(token!=''&&token!=null&&token!=undefined){
				uni.request({
				    url: this.$url+'/shopUser/detail?id=1', 
					header: {
						"access-token":token,
					},
					method:"GET",
				    success: (res) => {
						if(res.data.failed&&res.data.message=="用户未登录，请重新登录"){
							uni.removeStorageSync('token');
							uni.redirectTo({
								"url":"pages/my/login/login"
							})
							return false
						}
				    },
					fail: () => {
						uni.redirectTo({
							"url":"pages/my/login/login"
						})
						return false
					}
				});
			}else{
				uni.redirectTo({
					"url":"pages/my/login/login"
				})
				return false
			}
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
