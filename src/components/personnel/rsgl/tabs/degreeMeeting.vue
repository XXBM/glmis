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
			    prop="name"
			    label="会议名称"
			    ></el-table-column>
			    <el-table-column
			    prop="host.description"
			    label="主办机构"
			    ></el-table-column>
			    <el-table-column
			    prop="reportTime"
			    label="汇报时间"
			    ></el-table-column>
			    <el-table-column
			    prop="reviewResult.description"
			    label="审核结果"
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
				      :picker-options="pickerOptions1">
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
				      :picker-options="pickerOptions1">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
					prop="name"
					label="会议名称">
					<el-input v-model="addData.name"></el-input>
				</el-form-item>
				<el-form-item
					prop="host"
					label="主办机构">
					<el-select v-model="addData.host" placeholder="请选择">
					    <el-option
					      v-for="item in this.allHostOrganization"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					prop="reportTime"
					label="汇报时间">
					<el-date-picker
				      v-model="addData.reportTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
					prop="reviewResult"
					label="审核结果">
					<el-select v-model="addData.reviewResult" placeholder="请选择">
					    <el-option
					      v-for="item in this.allCheck"
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
			<el-form :model="editData"  :rules="rules" ref="ruleEdit">
				<el-form-item
					prop="startTime"
				    label="开始时间">
			      	<el-date-picker
				      v-model="editData.startTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
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
				      :picker-options="pickerOptions1">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
					prop="name"
					label="会议名称">
					<el-input v-model="editData.name"></el-input>
				</el-form-item>
				<el-form-item
					prop="host"
					label="主办机构">
					<el-select v-model="editData.host" placeholder="请选择">
					    <el-option
					      v-for="item in this.allHostOrganization"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					prop="reportTime"
					label="汇报时间">
					<el-date-picker
				      v-model="editData.reportTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				  	</el-date-picker>
				</el-form-item>
				<el-form-item
					prop="reviewResult"
					label="审核结果">
					<el-select v-model="editData.reviewResult" placeholder="请选择">
					    <el-option
					      v-for="item in this.allCheck"
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
			page:1,
			pageSize:10,
			allHostOrganization:'',
			allCheck:'',
			showAddDialog:false,
			showEditDialog:false,
			addData:{
				startTime:'',
				endTime:'',
				name:'',
				host:'',
				reportTime:'',
				reviewResult:''
			},
			editData:{
				id:'',
				startTime:'',
				endTime:'',
				name:'',
				host:'',
				reportTime:'',
				reviewResult:''
			},
			rules: {
	          	name: [{ required: true, message: '必填项', trigger: 'blur'&'change'  }],
	          	host: [{ required: true,type:'number', message: '必填项', trigger: 'blur'&'change'  }],
	          	reviewResult:[{ required: true,type:'number', message: '必填项', trigger: 'blur'&'change'}]
		    }
		}
	},
	props:{
		degreeMeetingUrl:{
			type:String,
			required:true
		}
	},
	methods:{
		getAllTableData:function(){
			var url=this.degreeMeetingUrl+"&page="+this.page+"&rows="+this.pageSize
			this.$http.get(url).then(response=>{
				this.tableDataTotal=response.data.total
				this.tableData=response.data.rows
			}).catch(response=>{
				this.$refs.msgDialog.confirm("获得学术会议获取数据失败！")
			})
		},
		handleRowClick:function(val){
			this.currentRow=val
		},
		getAllHostOrganization:function(){	
			var url =this.HOST+'/findAllHostOrganization'
			this.$http.get(url).then(response=>{
				this.allHostOrganization=response.data
			}).catch(response=>{
				this.$refs.msgDialog.confirm("获得所有的主办机构失败！")
			})
		},
		getAllCheck:function(){
			var url=this.HOST+'/findAllCheck'
			this.$http.get(url).then(response=>{
				this.allCheck=response.data
			}).catch(response=>{
				this.$refs.msgDialog.confirm("获取所有审核结果失败！")
			})
		},
		add:function(){
			this.showAddDialog=true
			this.getAllHostOrganization()
			this.getAllCheck()
		},
		saveAdd:function(ruleForm){
			this.$refs[ruleForm].validate((valid)=>{
				if (valid) {
					var startTime_add=moment(this.addData.startTime).format("YYYY-MM-DD")
					var endTime_add=moment(this.addData.endTime).format("YYYY-MM-DD")
					var reportTime_add=moment(this.addData.reportTime).format("YYYY-MM-DD")
					this.addData.startTime=startTime_add
					this.addData.endTime=endTime_add
					this.addData.reportTime=reportTime_add
					var url= this.HOST+'/addAcademicConference'
					this.$http.post(url,this.addData).then(response=>{
						this.showAddDialog=false
						this.addData={
							startTime:'',
							endTime:'',
							name:'',
							host:'',
							reportTime:'',
							reviewResult:''
						}
						this.getAllTableData()
						this.$refs.msgDialog.notify("成功增加一条数据！")
					}).catch(response=>{
						this.$refs.msgDialog.confirm("数据添加失败！")
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
				name:'',
				host:'',
				reportTime:'',
				reviewResult:''
			}
			this.showAddDialog=false
			this.$refs.msgDialog.notify("已取消增加！")
		},
		edit:function(){
			if (this.currentRow) {
				this.editData.id=this.currentRow.id
				this.editData.startTime=this.currentRow.startTime
				this.editData.endTime=this.currentRow.endTime
				this.editData.name=this.currentRow.name
				this.editData.reportTime=this.currentRow.reportTime
				this.editData.host=this.currentRow.host.id
				this.editData.reviewResult=this.currentRow.reviewResult.id
				this.showEditDialog=true
				this.getAllCheck()
				this.getAllHostOrganization()
			}else{
				this.$refs.msgDialog.confirm("请选择要修改的行！")
			}
			
		},
		saveEdit:function(ruleForm){
			this.$refs[ruleForm].validate((valid)=>{
				if (valid) {
					var startTime_edit=moment(this.editData.startTime).format("YYYY-MM-DD")
					var endTime_edit=moment(this.editData.endTime).format("YYYY-MM-DD")
					var reportTime_edit=moment(this.editData.reportTime).format("YYYY-MM-DD")
					this.currentRow.startTime=startTime_edit
					this.currentRow.endTime=endTime_edit
					this.currentRow.reportTime=reportTime_edit
					this.currentRow.name=this.editData.name
					this.currentRow.host=this.editData.host
					this.currentRow.reviewResult=this.editData.reviewResult
					var url= this.HOST+'/updateAcademicConference'
					console.log(JSON.stringify(this.currentRow))
					this.$http.put(url,this.currentRow).then(response=>{
						this.showEditDialog=false
						this.getAllTableData()
						this.$refs.msgDialog.notify("成功修改数据！")
					}).catch(response=>{
						this.$refs.msgDialog.confirm("数据修改失败！")
					})
				}else{
					this.$refs.msgDialog.confirm("请检查填写的信息！")
				}
			})
			
		},
		cancelEdit:function(){
			this.showEditDialog=false
			this.$refs.msgDialog.notify("已取消修改！")
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
			          var url =this.HOST+'/deleteAcademicConference?id='+this.currentRowId
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
		degreeMeetingUrl:function(){
			this.getAllTableData()
		}
	},
	components:{
		msgDialog,
	}
}
</script>