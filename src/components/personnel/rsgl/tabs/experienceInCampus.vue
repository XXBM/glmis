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
					      v-for="item in this.allPositionRank"
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
				label="学院">
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
				label="担任职务">
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
				label="级别">
					<el-select v-model="editData.positionRank" placeholder="请选择">
					    <el-option
					      v-for="item in this.allPositionRank"
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
		}
	},
	props:{
		experienceInCampusUrl:{
			type:String,
			required:true
		}
	},
	created:function(){
		this.getAllTableData()
	},
	methods:{
		getAllTableData:function(){
			// alert(this.experienceInCampusUrl)
			this.$http.get(this.experienceInCampusUrl).then(response=>{
				this.tableDataTotal=response.data.total
				this.tableData=response.data.rows
			}).catch(response=>{
				// alert("在校工作经历获取数据失败！")
			})
		},
		handleRowClick:function(val){
			this.currentRow=val
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
		saveAdd:function(){
			var startTime_add=moment(this.addData.startTime).format("YYYY-MM-DD")
			var endTime_add=moment(this.addData.endTime).format("YYYY-MM-DD")
			this.addData.startTime=startTime_add
			this.addData.endTime=endTime_add
			var url= this.HOST+'/addEmploymentRecord'
			this.$http.post(url,this.addData).then(response=>{
				this.showAddDialog=false
				this.addData.startTime=''
				this.addData.endTime=''
				this.addData.school=''
				this.addData.post=''
				this.addData.positionRank=''
				this.getAllTableData()
				alert("增加成功！")
			}).catch(response=>{
				alert("增加失败！")
			})
		},
		cancelAdd:function(){
			this.addData.startTime=''
			this.addData.endTime=''
			this.addData.school=''
			this.addData.post=''
			this.addData.positionRank=''
			this.showAddDialog=false
		},
		edit:function(){
			if (this.currentRow) {
				// this.editData.id=this.currentRow.id
				this.editData.startTime=this.currentRow.startTime
				this.editData.endTime=this.currentRow.endTime
				this.editData.school=this.currentRow.school
				this.editData.post=this.currentRow.post
				this.editData.positionRank=this.currentRow.positionRank
				this.showEditDialog=true
				this.getAllSchool()
				this.getAllPost()
				this.getAllPositionRank()
			}else{
				alert("请选择要修改的行！")
			}
			
		},
		saveEdit:function(){
			var startTime_edit=moment(this.editData.startTime).format("YYYY-MM-DD")
			var endTime_edit=moment(this.editData.endTime).format("YYYY-MM-DD")
			this.currentRow.startTime=startTime_edit
			this.currentRow.endTime=endTime_edit
			this.currentRow.school=this.editData.school
			this.currentRow.post=this.editData.post
			this.currentRow.positionRank=this.editData.positionRank
			var url= this.HOST+'/updateEmploymentRecord'
			console.log(JSON.stringify(this.currentRow))
			this.$http.put(url,this.currentRow).then(response=>{
				this.showEditDialog=false
				this.editData.id=''
				this.editData.startTime=''
				this.editData.endTime=''
				this.editData.school=''
				this.editData.post=''
				this.editData.positionRank=''
				this.getAllTableData()
				alert("修改成功！")
			}).catch(response=>{
				alert("修改失败！")
			})
		},
		cancelEdit:function(){
			this.editData.startTime=''
			this.editData.endTime=''
			this.editData.school=''
			this.editData.post=''
			this.editData.positionRank=''
			this.showEditDialog=false
		},
		remove:function(){
			if (this.currentRow) {
				var url = this.HOST+'/deleteEmploymentRecord?id='+this.currentRow.id
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
		experienceInCampusUrl:function(){
			this.getAllTableData()
		}
	}
}
</script>