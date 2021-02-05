let imgUrl = "https://www.dreamer2020.site/wuerboss/api/goodsSku/image?ftpPath="

function previewImg(index,imgs){
	uni.previewImage({
		current:index,
		urls:imgs
	})
}
export {imgUrl,previewImg}