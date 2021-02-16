import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	strict: true,
	state:{
		upGoodsId:''
	},
	mutations: {
		setUpGoodsId(state,value){
			state.upGoodsId = value
		}
	},
	actions: {
		
	}
})

export default store