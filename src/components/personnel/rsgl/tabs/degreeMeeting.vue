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
		    label="会议名称"
		    ></el-table-column>
		    <el-table-column
		    prop="post.description"
		    label="主办机构"
		    ></el-table-column>
		    <el-table-column
		    prop="positionRank.description"
		    label="汇报时间"
		    ></el-table-column>
		    <el-table-column
		    prop="positionRank.description"
		    label="审核结果"
		    ></el-table-column>
		    </el-table>
		    <el-pagination
		      @current-change="handleCurrentChange"
		      @size-change="handlePageSizeChange"
		      layout="total, prev, pager, next, jumper"
		      :total="tableDataTotal">
		  	</el-pagination>
		</el-row>
		<el-dialog title="增加" v-model="this.showAddDialog">
			<el-form :model="addData">
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
				prop="school"
				label="会议名称">
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
				label="主办机构">
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
				label="汇报时间">
					<el-date-picker
				      v-model="addData.endTime"
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
			<el-button @click="saveAdd">提交</el-button>
			<el-button @click="cancelAdd">取消</el-button>
		</el-dialog>
		<el-dialog title="修改" v-model="this.showEditDialog">
			<el-form :model="editData">
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
				prop="school"
				label="会议名称">
					<el-select v-model="editData.school" placeholder="请选择">
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
				label="主办机构">
					<el-select v-model="editData.post" placeholder="请选择">
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
				label="汇报时间">
					<el-date-picker
				      v-model="editData.endTime"
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
			<el-button @click="saveEdit">提交</el-button>
			<el-button @click="cancelEdit">取消</el-button>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import moment from 'moment'
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
		}
	},
	props:{
		degreeMeetingUrl:{
			type:String,
			required:true
		}
	},
	created:function(){
		this.getAllTableData()
	},
	methods:{
		getAllTableData:function(){
			alert(this.degreeMeetingUrl)
			this.$http.get(this.experienceInCampusUrl).then(response=>{
				this.tableDataTotal=response.data.total
				this.tableData=response.data.rows
			}).catch(response=>{
				alert("学术会议获取数据失败！")
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
				alert("获得所有的主办机构失败！")
			})
		},
		getAllCheck:function(){
			var url=this.HOST+'/findAllCheck'
			this.$http.get(url).then(response=>{
				this.allCheck=response.data
			}).catch(response=>{
				alert("获得所有的审核结果失败！")
			})
		},
		add:function(){
			this.showAddDialog=true
			this.getAllHostOrganization()
			this.getAllCheck()
		},
		saveAdd:function(){
			var startTime_add=moment(this.addData.startTime).format("YYYY-MM-DD")
			var endTime_add=moment(this.addData.endTime).format("YYYY-MM-DD")
			var reportTime_add=moment(this.addData.reportTime).format("YYYY-MM-DD")
			this.addData.startTime=startTime_add
			this.addData.endTime=endTime_add
			this.addData.reportTime=reportTime_add
			var url= this.HOST+'/addAcademicConference'
			this.$http.post(url,this.addData).then(response=>{
				this.showAddDialog=false
				this.addData.startTime=''
				this.addData.endTime=''
				this.addData.name=''
				this.addData.reportTime=''
				this.addData.host=''
				this.addData.reviewResult=''
				this.getAllTableData()
				alert("增加成功！")
			}).catch(response=>{
				alert("增加失败！")
			})
		},
		cancelAdd:function(){
			this.addData.startTime=''
			this.addData.endTime=''
			this.addData.name=''
			this.addData.reportTime=''
			this.addData.host=''
			this.addData.reviewResult=''
			this.showAddDialog=false
		},
		edit:function(){
			if (this.currentRow) {
				this.editData.id=this.currentRow.id
				this.editData.startTime=this.currentRow.startTime
				this.editData.endTime=this.currentRow.endTime
				this.editData.name=this.currentRow.name
				this.editData.reportTime=this.currentRow.reportTime
				this.editData.host=this.currentRow.host
				this.editData.reviewResult=this.currentRow.reviewResult
				this.showEditDialog=true
				this.getAllCheck()
				this.getAllHostOrganization()
			}else{
				alert("请选择要修改的行！")
			}
			
		},
		saveEdit:function(){
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
				this.editData.id=''
				this.editData.startTime=''
				this.editData.endTime=''
				this.editData.reportTime=''
				this.editData.name=''
				this.editData.host=''
				this.editData.reviewResult=''
				this.getAllTableData()
				alert("修改成功！")
			}).catch(response=>{
				alert("修改失败！")
			})
		},
		cancelEdit:function(){
			this.editData.id=''
			this.editData.startTime=''
			this.editData.endTime=''
			this.editData.reportTime=''
			this.editData.name=''
			this.editData.host=''
			this.editData.reviewResult=''
			this.showEditDialog=false
		},
		remove:function(){
			if (this.currentRow) {
				var url = this.HOST+'/deleteAcademicConference?id='+this.currentRow.id
				this.$http.delete(url).then(response=>{
					alert("删除成功！")
					this.getAllTableData()
				}).catch(response=>{
					alert("删除失败！")
				})
			}
		}

	},
	watch:{
		degreeMeetingUrl:function(){
			this.getAllTableData()
		}
	}
}
</script>