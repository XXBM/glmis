<template>
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
			highlight-current-row
			@row-click="handleRowClick">
				<el-table-column
					prop="post.description"
		      		label="职位名称">
		     	</el-table-column>
		      	<el-table-column
					prop="appointedDate"
		      		label="任命时间">
		      	</el-table-column>
		      	<el-table-column
					prop="commissionNo"
		      		label="红头文号">
		     	</el-table-column>
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
					prop="post"
		      		label="职位名称">
		      		<el-select v-model="addData.post" placeholder="请选择">
					    <el-option
					      v-for="item in allPost"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
		      	</el-form-item>
		      	<el-form-item
					prop="appointedDate"
		      		label="任命时间">
		      		<el-date-picker
				      v-model="addData.appointedDate"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
		      	</el-form-item>
		      	<el-form-item
					prop="commissionNo"
		      		label="红头文号">
		      		<el-input v-model="addData.commissionNo"></el-input>
		     	</el-form-item>
			</el-form>
			<el-button @click="cancelAdd">取消</el-button>
			<el-button @click="saveAdd('ruleAdd')">提交</el-button>
		</el-dialog>
		<el-dialog title="修改" v-model="showEditDialog">
			<el-form :model="editData" :rules="rules" ref="ruleEdit">
				<el-form-item
					prop="post"
		      		label="职位名称">
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
					prop="appointedDate"
		      		label="任命时间">
		      		<el-date-picker
				      v-model="editData.appointedDate"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
		      	</el-form-item>
		      	<el-form-item
					prop="commissionNo"
		      		label="红头文号">
		      		<el-input v-model="editData.commissionNo"></el-input>
		     	</el-form-item>
			</el-form>
			<el-button @click="cancelEdit">取消</el-button>
			<el-button @click="saveEdit('ruleEdit')">提交</el-button>
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
import moment from 'moment'
import msgDialog from '../../../../components/common/msgDialog'
	export default{
		data(){
			return{
				tableData:'',
				allPost:'',
				page:1,
				pageSize:10,
				tableDataTotal:'',
				showAddDialog:false,
				showEditDialog:false,
				currentRow:'',
				currentRowId:'',
				addData:{
					post:'',		     	
					commissionNo:'',
					appointedDate:'',
				},
				editData:{
					post:'',		     	
					commissionNo:'',
					appointedDate:'',
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
		        rules:{
		          post: [{ required: true, type:'number',message: '必填项', trigger: 'change'  }],
		          commissionNo: [{ required: true, message: '必填项', trigger: 'change'  }],
		        }
			}
		},
		props:['jobChangeUrl'],
		methods:{
			getAllTableData:function(){
				var url=this.jobChangeUrl+"&page="+this.page+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.tableDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取职位变更信息失败!")
				})
			},
			getAllPost:function(){
				var url=this.HOST+'/findAllPost'
				this.$http.get(url).then(response=>{
					this.allPost=response.data
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有职务获取数据失败!")
				})
			},
			handleRowClick:function(value){
				this.currentRow=value
				this.currentRowId=value.id
			},
			add:function(){
				this.showAddDialog=true
				this.getAllPost()
			},
			saveAdd:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var time= moment(this.addData.appointedDate).format("YYYY-MM-DD")
						this.addData.appointedDate=time
						var url=this.HOST+"/addEmploymentPost"
						this.$http.post(url,this.addData).then(response=>{
							this.addData={
								post:'',		     	
								commissionNo:'',
								appointedDate:'',
							}
							this.getAllTableData()
							this.showAddDialog=false
							this.$refs.msgDialog.notify("成功添加数据！")
						}).catch(response=>{
							this.$refs.msgDialog.confirm("增加数据失败！")
						})

					}else{
						this.$refs.msgDialog.confirm("增加失败，检查红色信息输入！")
					}
				})
				
			},
			cancelAdd:function(){
				this.addData={
					post:'',		     	
					commissionNo:'',
					appointedDate:'',
				}
				this.showAddDialog=false
				this.$refs.msgDialog.notify("已取消增加！")
			},
			edit:function(){
				if (this.currentRow=="") {
					this.$refs.msgDialog.confirm("请选择要修改的行！")
				}else{
					this.editData.id=this.currentRow.id
					this.editData.appointedDate=this.currentRow.appointedDate
					this.editData.post=this.currentRow.post.id
					this.editData.commissionNo=this.currentRow.commissionNo
					this.showEditDialog=true
					this.getAllPost()
				}
			},
			saveEdit:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						this.currentRow.id=this.editData.id
						this.currentRow.post=this.editData.post
						this.currentRow.commissionNo=this.editData.commissionNo
						this.currentRow.appointedDate=moment(this.editData.appointedDate).format("YYYY-MM-DD") 
						var url = this.HOST+"/updateEmploymentPost"
						this.$http.put(url,this.editData).then(response=>{
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
				          var url =this.HOST+'/deleteEmploymentPost?id='+this.currentRowId
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
			},
		},
		components:{
			msgDialog,
		},
		watch:{
			jobChangeUrl:function(){
				this.getAllTableData()
		}
	}
		
	}
</script>