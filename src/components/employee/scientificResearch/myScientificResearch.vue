<template>
	<div>
		<el-tabs type="card" @tab-click="handleClick">
		    <el-tab-pane label="论文" name="thesis">
		    	<thesis></thesis>
		    </el-tab-pane>
		    <el-tab-pane label="获奖" name="award">
		    	<award></award>
		    </el-tab-pane>
		    <el-tab-pane label="专著" name="monograph">
		    	<monograph></monograph>
		    </el-tab-pane>
		    <el-tab-pane label="教材" name="teachingMaterial">
		    	<teaching-material></teaching-material>
		    </el-tab-pane>
		    <el-tab-pane label="横向的项目" name="infeedProject">
		    	<infeed-project></infeed-project>
		    </el-tab-pane>
		    <el-tab-pane label="纵向的项目" name="lengwaysProject">
		    	<lengways-project></lengways-project>
		    </el-tab-pane>
	    </el-tabs>
	</div>
</template>
<script type="text/javascript">
import teachingMaterial from './teachingMaterial.vue'
import infeedProject from './infeedProject.vue'
import lengwaysProject from './lengwaysProject.vue'
import thesis from './thesis'
import monograph from './monograph'
import award from './award'
	export default{
		data(){
			return{
				thesisUrl:'',
				awardUrl:'',
				monographUrl:'',
			}
		},
		methods:{
			handleClick(tab){
				if(tab.name==thesis){
					this.thesisUrl="/displayOwnThesis"
				}else if(tab.name==award){
					this.awardUrl="/"
				}else if(tab.name==monograph){
					this.monographUrl="/"
				}else if(tab.name==teachingMaterial){

				}else if(tab.name==infeedProject){

				}else{

				}
			}
		},
		components:{
			teachingMaterial,
			infeedProject,
			lengwaysProject,
			thesis,
			monograph,
			award
		}
	}

</script>