// 正式接口
let url = "https://www.dreamer2020.site/wuerboss/api"

async function get(obj){
	let [error, res] = await uni.request({
	    url: url+obj.url,
		header: {
			"access-token":uni.getStorageSync('token'),
		},
		method:'GET',
	});
	if(error){
		uni.showToast({
			title:'请求超时',
			icon:'none'
		})
		return error
	}
	return res
}
async function post(obj){
	let [error, res] = await uni.request({
	    url: url+obj.url,
		header: {
			"access-token":uni.getStorageSync('token'),
		},
		method:'POST',
		data:obj.data,
	});
	if(error){
		uni.showToast({
			title:'请求超时',
			icon:'none'
		})
		return error
	}
	return res
}
export {get,post}