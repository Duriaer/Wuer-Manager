import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store

//请求
import {url,get,post} from '@/api/request.js'
Vue.prototype.$url = url
Vue.prototype.$get = get
Vue.prototype.$post = post


// 路由
import {toPath,goPath,goTabbar,back,toHome,staffAdminister,addStaff,guestAdminister,addGuest,roleAdminister,addRole,peerAdminister,addPeer,toGoods,addGoods,editGoods,toPlaceOrder,toOrderDetails,toSingleStaff,toLogin,to401} from '@/api/router.js'
Vue.prototype.$toPath = toPath
Vue.prototype.$goPath = goPath
Vue.prototype.$goTabbar = goTabbar
Vue.prototype.$back = back
Vue.prototype.$toHome = toHome
Vue.prototype.$staffAdminister = staffAdminister
Vue.prototype.$addStaff = addStaff
Vue.prototype.$guestAdminister = guestAdminister
Vue.prototype.$addGuest = addGuest
Vue.prototype.$roleAdminister = roleAdminister
Vue.prototype.$addRole = addRole
Vue.prototype.$peerAdminister = peerAdminister
Vue.prototype.$addPeer = addPeer
Vue.prototype.$toGoods = toGoods
Vue.prototype.$addGoods = addGoods
Vue.prototype.$editGoods = editGoods
Vue.prototype.$toPlaceOrder = toPlaceOrder
Vue.prototype.$toOrderDetails = toOrderDetails
Vue.prototype.$toSingleStaff = toSingleStaff
Vue.prototype.$toLogin = toLogin
Vue.prototype.$to401 = to401

// 图片
import {imgUrl,previewImg} from '@/api/forImg.js'
Vue.prototype.$imgUrl = imgUrl
Vue.prototype.$previewImg = previewImg

// 对象,数组验证
import {isObject,isArray} from '@/api/isObject.js'
Vue.prototype.$isObject = isObject
Vue.prototype.$isArray = isArray

//时间
import {getNewDate} from '@/api/date.js'
Vue.prototype.$getNewDate = getNewDate

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
