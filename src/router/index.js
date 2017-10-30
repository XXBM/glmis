import Vue from 'vue'
import Router from 'vue-router'

//For router-use
import homePage from '../components/homePage.vue'
import scientificInfo from '../components/scientificResearch/scientificInformation'
import attendanceManager from '../components/attendance/attendanceManager/attendanceManager'
import myScientificResearch from '../components/employee/scientificResearch/myScientificResearch'
Vue.use(Router)

export default new Router({
    routes: [
    	{
        path: '/personnel',
        name: '人事信息',
        component: homePage
    	},
    	{
        path: '/tjcx',
        name: '统计查询',
        component: homePage
    	},
    	{
        path: '/attendanceManager',
        name: '考勤管理',
        component: attendanceManager
    	},
    	{
        path: '/attendanceQuery',
        name: '考勤统计',
        component: homePage
    	},
    	{
        path: '/attendanceExportExcel',
        name: '生成人事处报表',
        component: homePage
    	},
    	{
        path: '/scientificResearch',
        name: '科研管理',
        component: scientificInfo
    	},
    	{
        path: '/myScientificResearch',
        name: '我的科研',
        component: myScientificResearch
    	},
        {
        path: '/academicDegree',
        name: '学位维护',
        component: homePage
        },
        {
        path: '/educationQualification',
        name: '学历维护',
        component: homePage
        },
        {
        path: '/post',
        name: '职务维护',
        component: homePage
        },
        {
        path: '/professionalTitle',
        name: '职称维护',
        component: homePage
        },
        {
        path: '/practisingCertification',
        name: '证书维护',
        component: homePage
        },
        {
        path: '/organization',
        name: '机构维护',
        component: homePage
        },
        {
        path: '/leaveManager',
        name: '请假管理',
        component: homePage
        }
    ]
})