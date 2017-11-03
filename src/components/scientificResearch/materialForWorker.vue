<template>
	<el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="项目(横向)" name="project">
    	<project-lengthways :url="projectUrl" :workerId="workerId"></project-lengthways>
    </el-tab-pane>
    <el-tab-pane label="项目(纵向)" name="lengthways">
    	<project :url="lengthwaysUrl" :workerId="workerId"></project>
    </el-tab-pane>
    <el-tab-pane label="论文" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="获奖" name="dd">定时任务补偿</el-tab-pane>
    <el-tab-pane label="教材" name="textBook">
    	<text-book :url="textBookUrl" :workerId="workerId"></text-book>
    </el-tab-pane>
    <el-tab-pane label="专著" name="monograph">
    	<monograph :url="monographUrl" :workerId="workerId"></monograph>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import project from './project'
import projectLengthways from './projectLengthways'
import textBook from './textBook'
import monograph from './monograph'
import award from './award'
import thesis from './thesis'
	export default{
		data(){
			return{
				projectUrl:'',
				lengthwaysUrl:'',
				textBookUrl:'',
				monographUrl:'',
				workerId:''

			}
		},
		props:['materialForWorker'],
		watch:{
			materialForWorker:function(){
				this.workerId = this.materialForWorker
			}
		},
		methods:{
			handleClick(tab){
				if(tab.name=="project"){
					this.projectUrl="/displayProjectFundedByPrivateSectorByEmp?id="+this.materialForWorker
				}else if(tab.name=="lengthways"){
					this.lengthwaysUrl="/displayProjectFundedByGovernmentByEmp?id="+this.materialForWorker
				}else if(tab.name=="论文"){

				}else if(tab.name=="获奖"){

				}else if(tab.name=="textBook"){
					this.textBookUrl="/displayTextbookByEmp?id="+this.materialForWorker
				}else{
					this.monographUrl="/displayMonographByEmp?id="+this.materialForWorker
				}
			}
		},
		components:{
			project,
			projectLengthways,
			textBook,
			monograph,
			award,
			thesis
		}
	}
</script>