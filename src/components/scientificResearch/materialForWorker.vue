<template>
	<el-tabs type="card">
    <el-tab-pane label="项目(横向)" name="project">
    	<project-lengthways :url="projectUrl"></project-lengthways>
    </el-tab-pane>
    <el-tab-pane label="项目(纵向)" name="lengthways">
    	<project :url="lengthwaysUrl"></project>
    </el-tab-pane>
    <el-tab-pane label="论文" name="thesis">
      <thesis :url="thesisUrl" :workerId="workerId"></thesis>
    </el-tab-pane>
    <el-tab-pane label="获奖" name="award">
    	<award :url="awardUrl"></award>
    </el-tab-pane>
    <el-tab-pane label="教材" name="textBook">
    	<text-book :url="textBookUrl"></text-book>
    </el-tab-pane>
    <el-tab-pane label="专著" name="monograph">
    	<monograph :url="monographUrl"></monograph>
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
				awardUrl:'',
        		thesisUrl:'',
				workerId:''

			}
		},
		props:['materialForWorker'],
		watch:{
			materialForWorker:function(){
				this.workerId = this.materialForWorker
				this.projectUrl="/displayProjectFundedByPrivateSectorByEmp?id="+this.materialForWorker
				this.lengthwaysUrl="/displayProjectFundedByGovernmentByEmp?id="+this.materialForWorker
				this.thesisUrl="/displayScienThesisByEmp?id="+this.materialForWorker
				this.awardUrl="/displayScienAwardsByEmp?id="+this.materialForWorker
				this.textBookUrl="/displayTextbookByEmp?id="+this.materialForWorker
				this.monographUrl="/displayMonographByEmp?id="+this.materialForWorker
			}
		},
		methods:{
			
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
