<template>
	<!-- 纵向 -->
	<div>
		<el-row>
			<el-button-group>
				<el-button type="primary" icon="el-icon-share" @click="add">增加</el-button>
			  	<el-button type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
			 	<el-button type="primary" icon="el-icon-delete" @click="remove">删除</el-button>
			</el-button-group>
		</el-row>
		<el-row>
			<el-table
		    :data="tableData"
		    border
		    style="width: 100%"
		    @row-click="handleRowClick"
		    :highlight-current-row='true'>
		    <el-table-column
		      prop="projectFundedByGovernmentRank.description"
		      label="级别"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="no"
		      label="编号">
		    </el-table-column>
		    <el-table-column
		      prop="resource"
		      label="来源">
		    </el-table-column>
		    <el-table-column
		      prop="leader"
		      label="项目负责人">
		    </el-table-column>
		    <el-table-column
		      prop="sponsor"
		      label="批准部门">
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="开始时间">
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="结束时间">
		    </el-table-column>
		    <el-table-column
		      prop="expenditure"
		      label="经费(万)">
		    </el-table-column>
		    <el-table-column
		      prop="seating"
		      label="本人位次">
		    </el-table-column>
		    <el-table-column
		      prop="numOfParticipants"
		      label="参加人数">
		    </el-table-column>
		    <el-table-column
		      prop="checkingStatus.state"
		      label="状态">
		    </el-table-column>
		  </el-table>
		  <el-pagination
		      @current-change="handleCurrentChange"
		      @size-change="handlePageSizeChange"
		      layout="total, prev, pager, next, jumper"
		      :total="tableDataTotal">
		  </el-pagination>
		</el-row>
		<el-dialog title="增加" v-model="showAddDialog">
			<el-form :model="addData" :rules="rules" ref="ruleAdd">
				<el-form-item
			      prop="projectFundedByGovernmentRank"
			      label="级别">
			      	<el-select v-model="addData.projectFundedByGovernmentRank" placeholder="请选择">
					    <el-option
					      v-for="item in this.projectFundedByGovernmentRanks"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
			    </el-form-item>
			    <el-form-item
			      prop="name"
			      label="名称">
			      <el-input v-model="addData.name"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="no"
			      label="编号">
			      <el-input v-model="addData.no"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="resource"
			      label="来源">
			      <el-input v-model="addData.resource"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="leader"
			      label="项目负责人">
			      <el-input v-model="addData.leader"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="sponsor"
			      label="批准部门">
			      <el-input v-model="addData.sponsor"></el-input>
			    </el-form-item>
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
			      prop="expenditure"
			      label="经费(万)">
			      <el-input v-model="addData.expenditure" type='number'></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="seating"
			      label="本人位次">
			      <el-input v-model="addData.seating" type='number'></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="numOfParticipants"
			      label="参加人数">
			      <el-input v-model="addData.numOfParticipants" type='number'></el-input>
			    </el-form-item>
			</el-form>
			<el-button @click="cancelAdd">取消</el-button>
			<el-button @click="saveAdd('ruleAdd')">提交</el-button>
		</el-dialog>
		<el-dialog title="修改" v-model="showEditDialog">
			<el-form :model="editData" :rules="rules" ref="ruleEdit">
				<el-form-item
		     	 prop="projectFundedByGovernmentRank"
		     	 label="级别">
			      	<el-select v-model="editData.projectFundedByGovernmentRank" placeholder="请选择">
					    <el-option
					      v-for="item in this.projectFundedByGovernmentRanks"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
			    </el-form-item>
			    <el-form-item
			      prop="name"
			      label="名称">
			      <el-input v-model="editData.name"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="no"
			      label="编号">
			      <el-input v-model="editData.no"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="resource"
			      label="来源">
			      <el-input v-model="editData.resource"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="leader"
			      label="项目负责人">
			      <el-input v-model="editData.leader"></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="sponsor"
			      label="批准部门">
			      <el-input v-model="editData.sponsor"></el-input>
			    </el-form-item>
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
			      prop="expenditure"
			      label="经费(万)">
			      <el-input v-model="editData.expenditure" type='number'></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="seating"
			      label="本人位次">
			      <el-input v-model="editData.seating" type='number'></el-input>
			    </el-form-item>
			    <el-form-item
			      prop="numOfParticipants"
			      label="参加人数">
			      <el-input v-model="editData.numOfParticipants" type='number'></el-input>
			    </el-form-item>
			</el-form>
			<el-button @click="cancelEdit">取消</el-button>
			<el-button @click="saveEdit('ruleEdit')">提交</el-button>
		</el-dialog>
		<msgDialog ref="msgDialog"></msgDialog>
	</div>	
</template>	
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../../../components/common/msgDialog.vue'
	export default{
		data(){
			return{
				tableData:'',
				projectFundedByGovernmentRanks:'',
				currentPage:1,
				rows:10,
				tableDataTotal:'',
				showAddDialog:false,
				showEditDialog:false,
				currentRow:'',
				currentRowId:'',
				addData:{
					projectFundedByGovernmentRank:'',
		     		name:'',
		     	 	no:'',
		      		resource:'',
					leader:'',
		     		sponsor:'',
		     		startTime:'',
		      		endTime:'',
		      		expenditure:'',
		      		seating:'',
		    		numOfParticipants:'',
		    		// checkingStatus:''
				},
				editData:{
					id:'',
					projectFundedByGovernmentRank:'',
		     		name:'',
		     	 	no:'',
		      		resource:'',
					leader:'',
		     		sponsor:'',
		     		startTime:'',
		      		endTime:'',
		      		expenditure:'',
		      		seating:'',
		    		numOfParticipants:'',
		    		// checkingStatus:''
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
		        rules: {
		          name: [{ required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          no: [{ required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          resource:[{ required: true, message: '必填项', trigger: 'blur'&'change'}],
		          leader:[{required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          sponsor:[{required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          expenditure:[{required: true, message: '必填项', trigger: 'blur'&'change' }],
		          seating:[{required: true, message: '必填项', trigger: 'blur'&'change' }],
		          numOfParticipants:[{required: true, message: '必填项', trigger: 'blur'&'change'  }],
		        }
			}
		},
		created:function(){
			this.getAllTableData()
		},
		methods:{
			getAllTableData:function(){
				var url=this.HOST+'/displayOwnProjectFundedByGovernment?page='+this.currentPage+'&rows='+this.rows
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.tableDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有横向项目失败!")
				})
			},
			getAllProjectFundedByGovernmentRanks:function(){
				var url=this.HOST+'/findAllProjectFundedByGovernmentRanks'
				this.$http.get(url).then(response=>{
					this.projectFundedByGovernmentRanks=response.data
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有横向项目级别失败！")
				})
			},
			handleRowClick:function(value){
				this.currentRow=value
				this.currentRowId=value.id
			},
			add:function(){
				this.showAddDialog=true
				this.getAllProjectFundedByGovernmentRanks()
			},
			saveAdd:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/addProjectFundedByGovernment'
						var startTime_add =this.addData.startTime
						var endTime_add = this.addData.endTime
						this.addData.startTime=moment(startTime_add).format("YYYY-MM-DD")
						this.addData.endTime=moment(endTime_add).format("YYYY-MM-DD")
						this.$http.post(url,this.addData).then(response=>{
							this.getAllTableData()
							this.showAddDialog=false
							this.$refs.msgDialog.notify("成功添加横向项目！")
						}).catch(response=>{
							this.refs.msgDialog.confirm("添加横向项目失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查填写的信息！")
					}
				})
			},
			cancelAdd:function(){
				this.addData.projectFundedByGovernmentRank='',
				this.addData.name='',
				this.addData.no='',
	     		this.addData.resource='',
	     		this.addData.leader='',
	     		this.addData.sponsor='',
	      		this.addData.startTime='',
	      		this.addData.endTime='',
	      		this.addData.expenditure='',
	      		this.addData.seating='',
	     		this.addData.numOfParticipants=''
	     		this.showAddDialog=false
	     		this.$refs.msgDialog.notify("已取消增加！")
			},
			edit:function(){
				if (this.currentRowId=='') {
					this.$refs.msgDialog.confirm("请选择要修改的行！")
				}else{
					this.showEditDialog=true
					this.getAllProjectFundedByGovernmentRanks()
					this.editData.id=this.currentRow.id
					this.editData.projectFundedByGovernmentRank=this.currentRow.projectFundedByGovernmentRank			     	
					this.editData.name=this.currentRow.name,
					this.editData.no=this.currentRow.no,
					this.editData.resource=this.currentRow.resource
					this.editData.leader=this.currentRow.leader
					this.editData.sponsor=this.currentRow.sponsor
					this.editData.startTime=this.currentRow.startTime
					this.editData.endTime=this.currentRow.endTime
					this.editData.expenditure=this.currentRow.expenditure
					this.editData.seating=this.currentRow.seating
					this.editData.numOfParticipants=this.currentRow.numOfParticipants
				}
			},
			saveEdit:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url=this.HOST+'/updateProjectFundedByGovernment'
						var startTime_edit =this.editData.startTime
						var endTime_edit =this.editData.endTime
						this.editData.startTime=moment(startTime_edit).format("YYYY-MM-DD")
						this.editData.endTime=moment(endTime_edit).format("YYYY-MM-DD")
						this.currentRow.id=this.editData.id
						this.currentRow.projectFundedByGovernmentRank=this.editData.projectFundedByGovernmentRank			     	
						this.currentRow.name=this.editData.name,
						this.currentRow.no=this.editData.no,
						this.currentRow.resource=this.editData.resource
						this.currentRow.leader=this.editData.leader
						this.currentRow.sponsor=this.editData.sponsor
						this.currentRow.startTime=this.editData.startTime
						this.currentRow.endTime=this.editData.endTime
						this.currentRow.expenditure=this.editData.expenditure
						this.currentRow.seating=this.editData.seating
						this.currentRow.numOfParticipants=this.editData.numOfParticipants
						this.$http.put(url,this.currentRow).then(response=>{
							this.getAllTableData()
							this.$refs.msgDialog.notify("修改横向项目信息成功！")
							this.showEditDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.confirm("修改横向项目信息失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查填写的信息！")
					}
				})

			},
			cancelEdit:function(){
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
				          var url =this.HOST+'/deleteProjectFundedByGovernment?ids='+this.currentRowId
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
		},
		components:{
			msgDialog
		}
	}
</script>

		