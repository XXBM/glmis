// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import moment from 'moment'



axios.defaults.withCredentials=true
Vue.prototype.moment = moment
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false


Vue.prototype.HOST = '/glmis'

/* eslint-disable no-new */
new Vue({
	//选择挂载目标，将主组件放在id=“app”的html标签中
	el: '#app',
	// 将路由注册到vue实例中
	router,
	//选择要进行加载的vue组件
	template: '<App/>',
	//注册组件
	components: { App }
})
