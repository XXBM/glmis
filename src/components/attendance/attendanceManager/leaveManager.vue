<template>
	<div>
		<el-col :span="8">
			<el-row>
			教研室：
				<el-select v-model="selectedDepartment" placeholder="请选择教研室">
				    <el-option
				      v-for="item in allDepartments"
				      :key="item.id"
				      :label="item.departmentName"
				      :value="item.id">
				    </el-option>
				</el-select>
			</el-row>
			<el-row>
				<el-table
				:data="tableData"
				highlight-current-row
				@row-click="handleRowClickEm">
					<el-table-column
						prop="no"
			      		label="职工号">
			     	</el-table-column>
			      	<el-table-column
						prop="name"
			      		label="姓名">
			      	</el-table-column>
				</el-table>
				<el-pagination
			      @current-change="handleCurrentEmChange"
			      @size-change="handlePageSizeEmChange"
			      :current-page="page"
			      :page-sizes="[5, 10, 15, 20]"
			      :page-size="pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="tableDataTotal">
			  	</el-pagination>
			</el-row>
		</el-col>
		<el-col :span="14">
			<el-button-group>
				<el-button type="primary" icon="el-icon-share" @click="add">增加</el-button>
			  	<el-button type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
			 	<el-button type="primary" icon="el-icon-delete" @click="remove">删除</el-button>
			</el-button-group>
			<el-table
				:data="leaveData"
				highlight-current-row
				@row-click="handleRowClick">
					<el-table-column
						prop="startTime"
			      		label="计划开始时间">
			     	</el-table-column>
			      	<el-table-column
						prop="endTime"
			      		label="计划结束时间">
			      	</el-table-column>
			      	<el-table-column
						prop="realTime"
			      		label="实际销假时间">
			      	</el-table-column>
			      	<el-table-column
						prop="reason"
			      		label="请假原因">
			      	</el-table-column>
			</el-table>
			<el-pagination
		      @current-change="handleCurrentChange"
		      @size-change="handlePageSizeChange"
		      :current-page="page"
		      :page-sizes="[5, 10, 15, 20]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="leaveDataTotal">
		  	</el-pagination>
			<el-dialog title="增加" v-model="showAddDialog">
				<el-form :model="addData" :rules="rules" ref="ruleAdd">
			     	<el-form-item
						prop="startTime"
			      		label="计划开始时间">
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
			      		label="计划结束时间">
			      		<el-date-picker
					      v-model="addData.endTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
			      	</el-form-item>
			      	<el-form-item
						prop="realTime"
			      		label="实际销假时间">
			      		<el-date-picker
					      v-model="addData.realTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
			      	</el-form-item>
			      	<el-form-item
						prop="reason"
			      		label="请假理由">
			      		<el-input v-model="addData.reason"></el-input>
			     	</el-form-item>
				</el-form>
				<el-button @click="cancelAdd">取消</el-button>
				<el-button @click="saveAdd('ruleAdd')">提交</el-button>
			</el-dialog>
			<el-dialog title="修改" v-model="showEditDialog">
				<el-form :model="editData" :rules="rules" ref="ruleEdit">
			     	<el-form-item
						prop="startTime"
			      		label="计划开始时间">
			      		<el-date-picker
					      v-model="editData.endTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
			      	</el-form-item>
			      	<el-form-item
						prop="endTime"
			      		label="计划结束时间">
			      		<el-date-picker
					      v-model="editData.endTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
			      	</el-form-item>
			      	<el-form-item
						prop="realTime"
			      		label="实际销假时间">
			      		<el-date-picker
					      v-model="editData.realTime"
					      align="right"
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions1">
					    </el-date-picker>
			      	</el-form-item>
			      	<el-form-item
						prop="reason"
			      		label="请假理由">
			      		<el-input v-model="editData.reason"></el-input>
			     	</el-form-item>
				</el-form>
				<el-button @click="cancelEdit">取消</el-button>
				<el-button @click="saveEdit('ruleEdit')">提交</el-button>
			</el-dialog>	 	  	
		</el-col>
		<msgDialog ref="msgDialog"></msgDialog>
	</div>
</template>
<script type="text/javascript">
	import moment from 'moment'
	import msgDialog from '../../common/msgDialog'
	export default{
		data(){
			return{
				tableData:'',
				page:1,
				pageSize:10,
				tableDataTotal:'',
				leaveData:'',
				leaveDataTotal:'',
				employeeId:'',
				allDepartments:'',
				showAddDialog:false,
				showEditDialog:false,
				selectedDepartment:'',
				currentLeaveRow:'',
				currentLeaveRowId:'',
				addData:{
					startTime:'',
					endTime:'',
					realTime:'',
					reason:''
				},
				editData:{
					startTime:'',
					endTime:'',
					realTime:'',
					reason:''
				},
				pickerOptions1: {
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
		        rules:[{
		        	reason: [{ required: true,message: '必填项', trigger: 'change'  }],
		        }]
			}
		},
		methods:{		
			getAllTableData:function(){
				var url=this.HOST+'/displayAllEmployeeName?page='+this.page+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.tableDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有表格数据失败！")
				})
			},
			getAllTableDataByDepartment:function(){
				var url=this.HOST+'/displayEmpByDep?id='+this.selectedDepartment+'&page='+this.page+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.tableDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有表格数据失败！")
				})
			},
			getAllDepartment:function(){
				var url = this.HOST+'/findAllDepartment'
				this.$http.get(url).then(response=>{
					this.allDepartments=response.data
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有教研室信息失败！")
				})
			},
			getLeaveData:function(){
				var url=this.HOST+'/displayLeaveByEmp?id='+this.employeeId+'&page='+this.page+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.leaveData=response.data.rows
					this.leaveDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog("获取请假信息失败！")
				})
			},
			handleRowClickEm:function(val){
				this.employeeId=val.id
				this.getLeaveData()
			},
			handleRowClick:function(val){
				this.currentLeaveRow=val
				this.currentLeaveRowId=val.id
			},
			add:function(){
				this.showAddDialog=true
			},
			saveAdd:function(ruleForm){
				if (this.addData.startTime==''||this.addData.endTime==''||this.addData.realTime=='') {
					this.$refs.msgDialog.confirm("请将信息填写完整！")
				}else{
					this.$refs[ruleForm].validate((valid)=>{
						if (valid) {
							var url=this.HOST+'/addLeave'
							this.addData.startTime=moment(this.addData.startTime).format("YYYY-MM-DD")	
							this.addData.endTime=moment(this.addData.endTime).format("YYYY-MM-DD")
							this.addData.realTime=moment(this.addData.realTime).format("YYYY-MM-DD")
							this.$http.post(url,this.addData).then(response=>{
								this.showAddDialog=false
								this.getLeaveData()
								this.addData={
									startTime:'',
									endTime:'',
									realTime:'',
									reason:''
								}
								this.$refs.msgDialog.notify("数据添加成功！")
							}).catch(response=>{
								this.showAddDialog=false
								this.$refs.msgDialog.confirm("数据添加失败！")
							})					
						}
					})
				}
			},
			cancelAdd:function(){
				this.showAddDialog=false
				this.addData={
					startTime:'',
					endTime:'',
					realTime:'',
					reason:''
				}
			},
			edit:function(){
				this.showEditDialog=true
				this.editData.startTime=this.currentLeaveRow.startTime
				this.editData.endTime=this.currentLeaveRow.endTime
				this.editData.realTime=this.currentLeaveRow.realTime
				this.editData.reason=this.currentLeaveRow.reason
			},
			saveEdit:function(ruleForm){
				if (this.editData.startTime==''||this.editData.endTime==''||this.editData.realTime=='') {
					this.$refs.msgDialog.confirm("请将信息填写完整！")
				}else{
					this.$refs[ruleForm].validate((valid)=>{
						if (valid) {
							var url=this.HOST+'/updateLeave'
							this.currentLeaveRow.startTime=moment(this.editData.startTime).format("YYYY-MM-DD")	
							this.currentLeaveRow.endTime=moment(this.editData.endTime).format("YYYY-MM-DD")
							this.currentLeaveRow.realTime=moment(this.editData.realTime).format("YYYY-MM-DD")
							this.currentLeaveRow.reason=this.editData.reason
							this.$http.put(url,this.currentLeaveRow).then(response=>{
								this.showEditDialog=false
								this.editData={
									startTime:'',
									endTime:'',
									realTime:'',
									reason:''
								}
								this.getLeaveData()
								this.$refs.msgDialog.notify("数据修改成功！")
							}).catch(response=>{
								this.showEditDialog=false
								this.$refs.msgDialog.confirm("数据修改失败！")
							})					}
					})
				}
			},
			cancelEdit:function(){
				this.showEditDialog=false
				this.editData={
					startTime:'',
					endTime:'',
					realTime:'',
					reason:''
				}
			},
			remove:function(){
				if (this.currentLeaveRowId=='') {
					this.$refs.msgDialog.confirm("请选择要删除的行！")
				}else{
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          var url =this.HOST+'/deleteLeave?id='+this.currentLeaveRowId
				          this.$http.delete(url).then(response=>{
				          	this.getLeaveData()
				          	this.$refs.msgDialog.notify("成功删除一条数据!")
				          }).catch(response=>{
				          	this.$refs.msgDialog.notify("删除失败！")
				          })
				        }).catch(() => {
				          	this.$refs.msgDialog.notify("已取消删除！")       
			    	})
				}		
			},
		},
		watch:{
			selectedDepartment:function(){
				this.getAllTableDataByDepartment()
			}
		},
		created:function(){
			this.getAllDepartment()
			this.getAllTableData()
		},
		components:{
			msgDialog,
		}
	}
</script>