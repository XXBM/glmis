<template>
	<div>
		<el-button-group>
			<el-button icon="plus" type="primary" @click="addDialogVisible=true"></el-button>
			<el-button icon="edit" type="primary" @click="editJudge"></el-button>
			<el-button icon="delete" type="primary" @click="delJudge"></el-button>
		</el-button-group>
		<el-table
		:data="tableData"
		border
		style="width:100%"
		@selection-change="handleSelectionChange">
			<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
			<el-table-column
			prop="employee.name"
			label="姓名"
			align="center"
			></el-table-column>
			<el-table-column
			prop="employee.no"
			label="工号"
			align="center"
			></el-table-column>
			<el-table-column
			prop="businessLeaveDescription.description"
			label="考勤状态"
			align="center"
			></el-table-column>
			<el-table-column
			prop="remarks"
			label="备注"
			align="center"></el-table-column>
		</el-table>
		<el-pagination
		  @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[5, 10, 15]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total"></el-pagination>
	      <!-- 添加 -->
	      <el-dialog
	      title="添加"
	      :visible.sync="addDialogVisible"
	      width="80%"
	      :before-close="handleAddClose">
	      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
	      	<el-form-item label="姓名" prop="employee">
	      		<el-select v-model="addForm.employee">
	      			<el-option
	      			v-for="item in specificEmployees"
	      			:key="item.id"
	      			:label="item.name"
	      			:value="item.id">
	      			</el-option>
	      		</el-select>
	      	</el-form-item>
	      	<el-form-item label="考勤状态" prop="businessLeaveDescription">
	      		<el-select v-model="addForm.businessLeaveDescription">
	      			<el-option
	      			v-for="item in businessLeaveDescriptions"
	      			:key="item.id"
	      			:label="item.description"
	      			:value="item.id"></el-option>
	      		</el-select>
	      	</el-form-item>
	      	<el-form-item label="备注">
	      		<el-input v-model="addForm.remarks"></el-input>
	      	</el-form-item>
	      </el-form>
	      	<span slot="footer">
		 		<el-button @click="cancelAdd">取消</el-button>
		 		<el-button @click="saveAdd('addForm')" type="primary">确认</el-button>
			</span>
	      </el-dialog>
	      <!-- 修改 -->
	      <el-dialog
	      title="修改"
	      :visible.sync="editDialogVisible"
	      width="80%"
	      :before-close="handleEditClose">
	      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
	      	<el-form-item label="姓名" prop="employee">
	      		<el-select v-model="editForm.employee">
	      			<el-option
	      			v-for="item in specificEmployees"
	      			:key="item.id"
	      			:label="item.name"
	      			:value="item.id">
	      			</el-option>
	      		</el-select>
	      	</el-form-item>
	      	<el-form-item label="考勤状态" prop="businessLeaveDescription">
	      		<el-select v-model="editForm.businessLeaveDescription">
	      			<el-option
	      			v-for="item in businessLeaveDescriptions"
	      			:key="item.id"
	      			:label="item.description"
	      			:value="item.id"></el-option>
	      		</el-select>
	      	</el-form-item>
	      	<el-form-item label="备注">
	      		<el-input v-model="editForm.remarks"></el-input>
	      	</el-form-item>
	      </el-form>
	      	<span slot="footer">
		 		<el-button @click="editDialogVisible=false">取消</el-button>
		 		<el-button @click="saveEdit('editForm')" type="primary">确认</el-button>
			</span>
	      </el-dialog>
	      <!-- 删除 -->
	      <el-dialog
	      title="删除"
	      :visible.sync="delDialogVisible"
	      width="80%">
	      <span>您确定删除以下内容吗？</span>
	  	  <el-row><br></el-row>
	      <div v-for="item in currentRows">
	      	<el-row>{{item.employee.name}}</el-row>
	      </div>
	      	<span slot="footer">
		 		<el-button @click="delDialogVisible=false">取消</el-button>
		 		<el-button @click="delBusinessLeave" type="primary">删除</el-button>
			</span>
	      </el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
import msgDialog from "../../common/msgDialog"
	export default{
		data(){
			return{
				tableData:[],
				currentPage:1,
				pageSize:10,
				total:0,
				specificEmployees:'',
				addDialogVisible:false,
				editDialogVisible:false,
				delDialogVisible:false,
				currentRows:[],
				ids:[],
				addForm:{
					employee:'',
					businessLeaveDescription:'',
					remarks:''
				},
				editForm:{
					employee:'',
					businessLeaveDescription:'',
					remarks:''
				},
				rules:{
					employee:[
					{required:true,message:'必填项',type:'number',trigger:'blur'&'change'}
					],
					businessLeaveDescription:[
					{required:true,message:'必填项',type:'number',trigger:'blur'&'change'}
					]
				}
			}
		},
		props:['businessLeaveUrl','id'],
		watch:{
			businessLeaveUrl:function(){
				this.findBusinessLeave()
				this.getSelections()
			}
		},
		methods:{
			findBusinessLeave(){
				var url = this.businessLeaveUrl+"&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
			},
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findBusinessLeave()
			},
			handleCurrentChange(newPage){
				this.currentPage=newPage
				this.findBusinessLeave()
			},
			getSelections(){
				var specificEmployeeUrl = this.HOST + "/displaySpecificEmployee?id="+this.id
				this.$http.get(specificEmployeeUrl).then(response=>{
					this.specificEmployees=response.data
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
				var businessLeaveDescriptionUrl = this.HOST + "/findAllBusinessLeaveDescriptions"
				this.$http.get(businessLeaveDescriptionUrl).then(response=>{
					this.businessLeaveDescriptions=response.data
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败")
				})
			},
			cancelAdd(){
				this.addDialogVisible=false
				this.addForm={}
			},
			saveAdd(addForm){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						var url = this.HOST + "/addBusinessLeave"
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.findBusinessLeave()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("添加失败")
						})
						this.addDialogVisible=false
						this.addForm={}
					}
				})
			},
			handleAddClose(){
				this.$confirm('确认关闭?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.addDialogVisible=false
		          this.addForm={}
		        })
			},
			handleSelectionChange(currentRows){
				this.currentRows=currentRows
			},
			editJudge(){
				if(this.currentRows.length==1){
					this.editForm.employee=this.currentRows[0].employee.id
					this.editForm.businessLeaveDescription=this.currentRows[0].businessLeaveDescription.id
					this.editForm.remarks=this.currentRows[0].remarks
					this.editDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("至少且只能选择一行进行修改")
				}
			},
			saveEdit(editForm){
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						this.currentRows[0].employee=this.editForm.employee
						this.currentRows[0].businessLeaveDescription=this.editForm.businessLeaveDescription
						this.currentRows[0].remarks=this.editForm.remarks
						var url = this.HOST + "/updateBusinessLeave"
						this.$http.put(url,this.currentRows[0]).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
							this.findBusinessLeave()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("修改失败")
						})
						this.editDialogVisible=false
					}
				})
			},
			handleEditClose(){
				this.$confirm("确定关闭？","提示",{
					confirmButtonText:"确定",
					cancelButtonText:"取消",
					type:'warning'
				}).then(()=>{
					this.editDialogVisible=false
				})
			},
			delJudge(){
				if(this.currentRows.length!=0){
					this.delDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("至少选择一行进行删除")
				}
			},
			delBusinessLeave(){
				var i=0;
				this.currentRows.forEach(item=>{
					this.ids[i]=item.id
					i++
				})
				var url = this.HOST + "/deleteBusinessLeave?ids="+this.ids
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findBusinessLeave()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("删除失败")
				})
				this.delDialogVisible=false
			}
		},
		components:{
			msgDialog
		},
	}
</script>