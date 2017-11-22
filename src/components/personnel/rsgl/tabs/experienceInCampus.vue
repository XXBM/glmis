<template>
	<div>
		<el-button-group>
				<el-button type="primary" icon="el-icon-share" @click="add">增加</el-button>
			  	<el-button type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
			 	<el-button type="primary" icon="el-icon-delete" @click="remove">删除</el-button>
		</el-button-group>
		<el-row>
			<el-table
			border
		    style="width: 100%"
		    :data="tableData"
		    @row-click="handleRowClick"
		    :highlight-current-row='true'>
		    <el-table-column
		    prop="startTime"
		    label="开始时间"
		    ></el-table-column>
		    <el-table-column
		    prop="endTime"
		    label="结束时间"
		    ></el-table-column>
		    <el-table-column
		    prop="school.schoolName"
		    label="学院"
		    ></el-table-column>
		    <el-table-column
		    prop="post.description"
		    label="担任职务"
		    ></el-table-column>
		    <el-table-column
		    prop="positionRank.description"
		    label="级别"
		    ></el-table-column>
		    </el-table>
		    <el-pagination
		      @current-change="handleCurrentChange"
		      @size-change="handlePageSizeChange"
		      :current-page="page"
		      :page-sizes="[5, 10, 15, 20]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="tableDataTotal">
		  	</el-pagination>
		</el-row>
		<el-dialog title="增加" v-model="showAddDialog">
			<el-form :model="addData" :rules="rules" ref="ruleAdd">
				<el-form-item
				 prop="startTime"
			     label="开始时间">
			      	<el-date-picker
				      v-model="addData.startTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
				 prop="endTime"
			     label="结束时间">
			      	<el-date-picker
				      v-model="addData.endTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
				prop="school"
				label="学院">
					<el-select v-model="addData.school" placeholder="请选择">
					    <el-option
					      v-for="item in this.allSchool"
					      :key="item.id"
					      :label="item.schoolName"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
				prop="post"
				label="担任职务">
					<el-select v-model="addData.post" placeholder="请选择">
					    <el-option
					      v-for="item in this.allPost"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
				prop="positionRank"
				label="级别">
					<el-select v-model="addData.positionRank" placeholder="请选择">
					    <el-option
					      v-for="item in allPositionRank"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button @click="saveAdd('ruleAdd')">提交</el-button>
			<el-button @click="cancelAdd">取消</el-button>
		</el-dialog>
		<el-dialog title="修改" v-model="showEditDialog">
			<el-form :model="editData" :rules="rules" ref="ruleEdit">
				<el-form-item
				 prop="startTime"
			     label="开始时间">
			      	<el-date-picker
				      v-model="editData.startTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
				 prop="endTime"
			     label="结束时间">
			      	<el-date-picker
				      v-model="editData.endTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
				prop="school"
				label="学院">
					<el-select v-model="editData.school" placeholder="请选择">
					    <el-option
					      v-for="item in allSchool"
					      :key="item.id"
					      :label="item.schoolName"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
				prop="post"
				label="担任职务">
					<el-select v-model="editData.post" placeholder="请选择">
					    <el-option
					      v-for="item in allPost"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
				prop="positionRank"
				label="级别">
					<el-select v-model="editData.positionRank" placeholder="请选择">
					    <el-option
					      v-for="item in allPositionRank"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button @click="saveEdit('ruleEdit')">提交</el-button>
			<el-button @click="cancelEdit">取消</el-button>
		</el-dialog>
		<msgDialog ref="msgDialog"></msgDialog>
	</div>
</template>
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../../../../components/common/msgDialog'
export default{
	data(){
		return{
			tableData:'',
			tableDataTotal:'',
			currentRow:'',
			currentRowId:'',
			page:1,
			pageSize:10,
			allSchool:'',
			allPost:'',
			allPositionRank:'',
			showAddDialog:false,
			showEditDialog:false,
			addData:{
				startTime:'',
				endTime:'',
				school:'',
				post:'',
				positionRank:'',
			},
			editData:{
				id:'',
				startTime:'',
				endTime:'',
				school:'',
				post:'',
				positionRank:'',
			},
			pickerOptions: {
				// disabledDate(time) {
    //                 return time.getTime() > Date.now();
    //             },
	          	//快捷键
	         	shortcuts: [{
	            	text: '今天',
	            	onClick(picker) {
	             		picker.$emit('pick', new Date());
	            	}
	          	}, {
	            	text: '昨天',
	            	onClick(picker) {
	              		const date = new Date();
	              		date.setTime(date.getTime() - 3600 * 1000 * 24);
	              		picker.$emit('pick', date);
	            	}
	          	}, {
	            	text: '一周前',
	            	onClick(picker) {
	              		const date = new Date();
	              		date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              		picker.$emit('pick', date);
	            	}
	          	}]
		    },
			rules: {
	          	school: [{ required: true, type:'number', message: '必填项', trigger: 'blur'&'change'  }],
	          	post: [{ required: true,type:'number', message: '必填项', trigger: 'blur'&'change'  }],
	          	positionRank:[{ required: true,type:'number', message: '必填项', trigger: 'blur'&'change'}]
		    }
		}
	},
	props:{
		experienceInCampusUrl:{
			type:String,
			required:true
		}
	},
	methods:{
		getAllTableData:function(){
			var url = this.experienceInCampusUrl+"&page="+this.page+"&rows="+this.pageSize
			this.$http.get(url).then(response=>{
				this.tableDataTotal=response.data.total
				this.tableData=response.data.rows
			}).catch(response=>{
				this.$refs.msgDialog.confirm("在校工作经历获取数据失败！")
			})
		},
		handleRowClick:function(val){
			this.currentRow=val
			this.currentRowId=val.id
		},
		getAllSchool:function(){
			var url =this.HOST+'/findAllSchoolName'
			this.$http.get(url).then(response=>{
				this.allSchool=response.data
			})
		},
		getAllPost:function(){
			var url=this.HOST+'/findAllPost'
			this.$http.get(url).then(response=>{
				this.allPost=response.data
			})
		},
		getAllPositionRank:function(){
			var url =this.HOST+'/findAllRank'
			this.$http.get(url).then(response=>{
				this.allPositionRank=response.data
			})
		},
		add:function(){
			this.showAddDialog=true
			this.getAllSchool()
			this.getAllPost()
			this.getAllPositionRank()
		},
		saveAdd:function(ruleForm){
			this.$refs[ruleForm].validate((valid)=>{
				if (valid) {
					var startTime_add=moment(this.addData.startTime).format("YYYY-MM-DD")
					var endTime_add=moment(this.addData.endTime).format("YYYY-MM-DD")
					this.addData.startTime=startTime_add
					this.addData.endTime=endTime_add
					var url= this.HOST+'/addEmploymentRecord'
					this.$http.post(url,this.addData).then(response=>{
						this.getAllTableData()
						this.showAddDialog=false
						this.addData={
							startTime:'',
							endTime:'',
							school:'',
							post:'',
							positionRank:'',
						}	
						this.$refs.msgDialog.confirm("成功增加一条数据！")
					}).catch(response=>{
						this.$refs.msgDialog.notify("增加数据失败！")
					})
				}else{
					this.$refs.msgDialog.confirm("请检查填写的信息！")
				}
			})
			
		},
		cancelAdd:function(){
			this.addData={
				startTime:'',
				endTime:'',
				school:'',
				post:'',
				positionRank:'',
			}	
			this.showAddDialog=false
		},
		edit:function(){
			if (this.currentRow) {
				this.editData.id=this.currentRow.id
				this.editData.startTime=this.currentRow.startTime
				this.editData.endTime=this.currentRow.endTime
				this.editData.school=this.currentRow.school.id
				this.editData.post=this.currentRow.post.id
				this.editData.positionRank=this.currentRow.positionRank.id
				this.showEditDialog=true
				this.getAllSchool()
				this.getAllPost()
				this.getAllPositionRank()
			}else{
				this.$refs.msgDialog.confirm("请选择要修改的行！")
			}
			
		},
		saveEdit:function(ruleForm){
			this.$refs[ruleForm].validate((valid)=>{
				if (valid) {
					var startTime_edit=moment(this.editData.startTime).format("YYYY-MM-DD")
					var endTime_edit=moment(this.editData.endTime).format("YYYY-MM-DD")
					this.currentRow.id=this.editData.id
					this.currentRow.startTime=startTime_edit
					this.currentRow.endTime=endTime_edit
					this.currentRow.school=this.editData.school
					this.currentRow.post=this.editData.post
					this.currentRow.positionRank=this.editData.positionRank
					var url= this.HOST+'/updateEmploymentRecord'
					this.$http.put(url,this.currentRow).then(response=>{
						this.showEditDialog=false
						this.getAllTableData()
						this.$refs.msgDialog.notify("修改数据成功！")
					}).catch(response=>{
						this.$refs.msgDialog.confirm("修改数据失败！")
					})
				}else{
					this.$refs.msgDialog.confirm("请检查填写的信息！")
				}
			})
			
		},
		cancelEdit:function(){
			this.showEditDialog=false
		},
		remove:function(){
			if (this.currentRowId=='') {
				this.$refs.msgDialog.confirm("请选择要删除的行！")
			}else{
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          var url =this.HOST+'/deleteEmploymentRecord?id='+this.currentRowId
			          this.$http.delete(url).then(response=>{
			          	this.getAllTableData()
			          	this.$refs.msgDialog.notify("成功删除一条数据!")
			          }).catch(response=>{
			          	this.$refs.msgDialog.notify("删除失败！")
			          })
			        }).catch(() => {
			          	this.$refs.msgDialog.notify("已取消删除！")       
		    	})
			}		
		},
		handleCurrentChange:function(val){
			this.page=val
			this.getAllTableData()
		},
		handlePageSizeChange:function(val){
			this.pageSize=val
			this.getAllTableData()
		}
	},
	watch:{
		experienceInCampusUrl:function(){
			this.getAllTableData()
		}
	},
	components:{
		msgDialog,
	}
}
</script>