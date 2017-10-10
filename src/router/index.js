import Vue from 'vue'
import Router from 'vue-router'

//For router-use
import homePage from '../components/homePage.vue'

Vue.use(Router)

export default new Router({
    routes: [
    	{
        path: '/personnel',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/tjcx',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/attendanceManager',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/attendanceQuery',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/attendanceExportExcel',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/scientificResearch',
        name: '首页',
        component: homePage
    	},
    	{
        path: '/myScientificResearch',
        name: '首页',
        component: homePage
    	}
    ]
})