function toPath(path){
	uni.navigateTo({
		url:path
	})
}

function goPath(path){
	uni.redirectTo({
		url:path
	})
}

function back(path){
	uni.navigateBack()
}

function toHome(){
	uni.switchTab({
		url:"/pages/tabBar/home/home"
	})
}

function toGoods(id){
	uni.navigateTo({
		url:"/pages/goodsDetails/goodsDetails?goodsId="+id,
	})
}
function addGoods(){
	uni.navigateTo({
		url:"/pages/addGoods/addGoods?mode=add",
	})
}
function editGoods(id){
	uni.navigateTo({
		url:"/pages/addGoods/addGoods?goodsId="+id,
	})
}

function toLogin(){
	uni.navigateTo({
		url:"/pages/my/login/login"
	})
}

function to401(){ 
	uni.showToast({
	    icon: 'none',
	    position: 'bottom',
	    title: '请登录'
	});
	setTimeout(()=>{
		uni.navigateTo({
			url:"/pages/my/login/login"
		})
	},1000)
}

export {toPath,goPath,back,toHome,toGoods,addGoods,editGoods,toLogin,to401}