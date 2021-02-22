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

function addStaff(){
	uni.navigateTo({
		url:"/pages/index/addStaff/addStaff",
	})
}
function addGuest(){
	uni.navigateTo({
		url:"/pages/index/addGuest/addGuest",
	})
}
function staffAdminister(){
	uni.navigateTo({
		url:"/pages/index/staffAdminister/staffAdminister",
	})
}
function guestAdminister(){
	uni.navigateTo({
		url:"/pages/index/guestAdminister/guestAdminister",
	})
}

function toGoods(id){
	uni.navigateTo({
		url:"/pages/goods/goodsDetails/goodsDetails?goodsId="+id,
	})
}
function addGoods(){
	uni.navigateTo({
		url:"/pages/goods/addGoods/addGoods?mode="+'add',
	})
}
function editGoods(id){
	uni.navigateTo({
		url:"/pages/goods/addGoods/addGoods?goodsId="+id,
	})
}

function toPlaceOrder(id){
	uni.navigateTo({
		url:"/pages/order/placeOrder/placeOrder?id="+id,
	})
}
// function toHoldOrder(id){
// 	uni.navigateTo({
// 		url:"/pages/order/placeOrder/placeOrder?id="+id,
// 	})
// }
function toOrderDetails(id,type){
	if(type==1){
		uni.navigateTo({
			url:`/pages/order/orderDetails/orderDetails?id=${id}&mode=sale`,
		})
	}else if(type==2){
		uni.navigateTo({
			url:`/pages/order/orderDetails/orderDetails?id=${id}&mode=reserve`,
		})
	}
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

export {toPath,goPath,back,toHome,addStaff,addGuest,staffAdminister,guestAdminister,toGoods,addGoods,editGoods,toPlaceOrder,toOrderDetails,toLogin,to401}