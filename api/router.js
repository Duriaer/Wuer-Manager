// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
function toPath(path){
	uni.navigateTo({
		url:path
	})
}

// 关闭当前页面，跳转到应用内的某个页面
function goPath(path){
	uni.redirectTo({
		url:path
	})
}

function goTabbar(path){
	uni.switchTab({
		url:path
	})
}

//关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
function back(path){
	uni.navigateBack()
}

//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
function toHome(){
	uni.switchTab({
		url:"/pages/tabBar/home/home"
	})
}

function staffAdminister(){
	uni.navigateTo({
		url:"/pages/Administer/staffAdminister/staffAdminister",
	})
}
function addStaff(){
	uni.navigateTo({
		url:"/pages/Administer/staffAdminister/addStaff/addStaff",
	})
}
function guestAdminister(){
	uni.navigateTo({
		url:"/pages/Administer/guestAdminister/guestAdminister",
	})
}
function addGuest(){
	uni.navigateTo({
		url:"/pages/Administer/guestAdminister/addGuest/addGuest",
	})
}
function roleAdminister(){
	uni.navigateTo({
		url:"/pages/Administer/roleAdminister/roleAdminister",
	})
}
function addRole(){
	uni.navigateTo({
		url:"/pages/Administer/roleAdminister/addRole/addRole",
	})
}
function peerAdminister(){
	uni.navigateTo({
		url:"/pages/Administer/peerAdminister/peerAdminister",
	})
}
function addPeer(){
	uni.navigateTo({
		url:"/pages/Administer/peerAdminister/addPeer/addPeer",
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

function toPlaceOrder(id,type){
	if(type==1){
		uni.navigateTo({
			url:`/pages/order/placeOrder/placeOrder?id=${id}&mode=sale`,
		})
	}else if(type==2){
		uni.navigateTo({
			url:`/pages/order/placeOrder/placeOrder?id=${id}&mode=reserve`,
		})
	}
}

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

export {toPath,goPath,goTabbar,back,toHome,staffAdminister,addStaff,guestAdminister,addGuest,roleAdminister,addRole,peerAdminister,addPeer,toGoods,addGoods,editGoods,toPlaceOrder,toOrderDetails,toLogin,to401}