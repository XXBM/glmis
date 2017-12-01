<template>
	<div>
		<el-row>
			<el-button-group>
				<el-button type="primary" icon="plus" @click="addDialogVisible=true"></el-button>
				<el-button type="primary" icon="edit" @click="editJudge"></el-button>
				<el-button type="primary" icon="delete" @click="delJudge"></el-button>
			</el-button-group>
		</el-row>
			<el-table
			:data="tableData"
			border
			highlight-current-row
			style="width:100%"
			@row-click="getCurrentRow">
				<el-table-column
				type="selection"
				width="50"
				align="center">
				</el-table-column>
				<el-table-column
				prop="educationQualification.description"
				label="学历名称"
				width="180"
				align="center">
				</el-table-column>
			    <el-table-column
				prop="enrollDate"
				label="入学时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="graduateDate"
				label="毕业时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="major"
				label="专业"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="duration"
				label="学制"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="supervisorName"
				label="导师姓名"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="certificateNo"
				label="毕业证编号"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="university"
				label="学校"
				width="180"
				align="center">
				</el-table-column>
			</el-table>
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="pageSize"
			:page-sizes="[5,10,15]"
			layout="total,sizes,prev,pager,next,jumper"
			:total="total">
			</el-pagination>
		    <msg-dialog ref="msgDialog"></msg-dialog>
			<el-dialog
			title="添加"
			:visible.sync="addDialogVisible"
			width="50%"
			:before-close="addHandleClose">
			<el-form :model="addForm" label-width="80px" :rules="rules" ref="addForm">
				<el-form-item 
				label="学历名称" 
				prop="educationQualification">
					<el-select v-model="addForm.educationQualification">
						<el-option
						 v-for="item in allBackgrounds"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入学时间" prop="enrollDate">
					<el-date-picker
					v-model="addForm.enrollDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="毕业时间" prop="graduateDate">
					<el-date-picker
					v-model="addForm.graduateDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="专业" prop="major">
					<el-input v-model="addForm.major"></el-input>
				</el-form-item>
				<el-form-item label="学制" prop="duration">
					<el-input-number v-model="addForm.duration" controls-position="right" :min="1"></el-input-number>
				</el-form-item>	
				<el-form-item label="导师姓名" prop="supervisorName">
					<el-input v-model="addForm.supervisorName"></el-input>
				</el-form-item>
				<el-form-item label="毕业证编号" prop="certificateNo">
					<el-input-number v-model="addForm.certificateNo" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="学校" prop="university">
					<el-input v-model="addForm.university"></el-input>
				</el-form-item>				
			</el-form>
			<span slot="footer">
				<el-button @click="cancelAdd">取消</el-button>
				<el-button type="primary" @click="saveAdd('addForm')">保存</el-button>
			</span>
			</el-dialog>
			<el-dialog 
		title="修改"
		:visible.sync="editDialogVisible"
		width="80%"
		:before-close="editHandleClose">
			<el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
				<el-form-item label="学历名称" prop="educationQualification">
					<el-select v-model="editForm.educationQualification">
						<el-option
						 v-for="item in allBackgrounds"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入学时间" prop="enrollDate">
					<el-date-picker
					v-model="editForm.enrollDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="毕业时间" prop="graduateDate">
					<el-date-picker
					v-model="editForm.graduateDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="专业" prop="major">
					<el-input v-model="editForm.major"></el-input>
				</el-form-item>
				<el-form-item label="学制" prop="duration">
					<el-input-number v-model="editForm.duration" controls-position="right" :min="1"></el-input-number>
				</el-form-item>	
				<el-form-item label="导师姓名" prop="supervisorName">
					<el-input v-model="editForm.supervisorName"></el-input>
				</el-form-item>
				<el-form-item label="毕业证编号" prop="certificateNo">
					<el-input-number v-model="editForm.certificateNo" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="学校" prop="university">
					<el-input v-model="editForm.university"></el-input>
				</el-form-item>				
			</el-form>
			<span slot="footer">
				<el-button @click="cancelEdit">取消</el-button>
				<el-button type="primary" @click="saveEdit('editForm')">保存</el-button>
			</span>
		</el-dialog>
		<el-dialog 
		title="删除"
		:visible.sync="delDialogVisible"
		width="80%">
			<span>您确定删除{{currentRow.name}}吗？</span>
			<span slot="footer">
				<el-button @click="cancelDel">取消</el-button>
				<el-button type="primary" @click="delMsg()">删除</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import msgDialog from '../../../common/msgDialog.vue'
	export default{
		props:['url'],
		watch:{
			url:function(){
				this.findEducationBackground()
			}
		},
		data(){
			return{
				// 用于保存表格中的所有数据
				tableData:[],
				// 当前页页码
				currentPage:1,
				// 每页的页面容量
				pageSize:5,
				// 数据总条数
				total:0,
				// 当前行所有信息
				currentRow:'',
				// 用于控制增加框是否显示
				addDialogVisible:false,
				//修改对话框的显示控制
				editDialogVisible:false,
				// 删除对话框的显示控制
				delDialogVisible:false,
				EducationBackground:{
					educationQualification:'',
					enrollDate:'',
					graduateDate:'',
					major:'',
					duration:'',
					supervisorName:'',
					certificateNo:'',
					university:''
				},
				// 添加表单
				addForm:{
					educationQualification:'',
					enrollDate:'',
					graduateDate:'',
					major:'',
					duration:'',
					supervisorName:'',
					certificateNo:'',
					university:''
				},
				editForm:{
					educationQualification:'',
					enrollDate:'',
					graduateDate:'',
					major:'',
					duration:'',
					supervisorName:'',
					certificateNo:'',
					university:''
				},
				//保存所有的职称信息
				allBackgrounds:'',
				rules:{
					educationQualification:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					enrollDate:[
					{required:true,type:'date',message:"必填项",trigger:'blur'&'change'}
					],
					graduateDate:[
					{required:true,type:'date',message:"必填项",trigger:'blur'&'change'}
					],
					major:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],				
					duration:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					supervisorName:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],
					certificateNo:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					university:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					]			
				}
			}
        },
        created(){
			//获取表格需要显示的所有内容
			this.findEducationBackground()
			//获取所有学历可选项
			var educationBackgroundUrl = this.HOST + "/findAllEducationName"
			this.$http.get(educationBackgroundUrl).then(response=>{
				this.allBackgrounds=response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
        methods:{
            // 获取表格显示需要的所有信息
			findEducationBackground(){
			    var url=this.HOST + this.url + "&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				})
			},
			// 当换页时触发本方法，将页面切换，并从后台获取数据
			handleCurrentChange(newCurrentPage){
				this.currentPage=newCurrentPage
				this.findEducationBackground()
			},
			// 当页容量变化时触发本方法，改变页容量，并从后台获取新数据
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findEducationBackground()
			},
			//当点击某行时，触发本方法，获取当前行的所有信息
			getCurrentRow(currentRow){
				this.currentRow=currentRow
			},
			changeEditForm(){
				this.editForm.educationQualification=this.currentRow.educationQualification.id
				this.editForm.enrollDate=this.currentRow.enrollDate
				this.editForm.graduateDate=this.currentRow.graduateDate
				this.editForm.major=this.currentRow.major
				this.editForm.duration=this.currentRow.duration
				this.editForm.supervisorName=this.currentRow.supervisorName
				this.editForm.certificateNo=this.currentRow.certificateNo
				this.editForm.university=this.currentRow.university
			},
			//增加框点击取消时触发本方法
			cancelAdd(){
				this.addDialogVisible=false
				this.addForm={}
			},
			//修改框点击取消时触发本方法
			cancelEdit(){
				this.editDialogVisible=false

			},
			//增加框点击保存时执行本方法
			saveAdd(addForm){
				this.$refs[addForm].validate((valid)=>{
					if(valid){
						this.addForm.enrollDate=this.moment(this.addForm.enrollDate).format("YYYY-MM-DD")
						this.addForm.graduateDate=this.moment(this.addForm.graduateDate).format("YYYY-MM-DD")
						var url = this.HOST + "/addEducation"
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.addForm={}
							this.addDialogVisible=false
							this.findEducationBackground()
						})
					}
				})
			},
			//修改框点击保存时执行本方法。将确认修改的部分赋值给当前行数据，然后提交当前行
			saveEdit(editForm){
				if((this.editForm.enrollDate==this.currentRow.enrollDate) || (this.editForm.graduateDate==this.currentRow.graduateDate) ){
					this.editForm.enrollDate= new Date(this.editForm.enrollDate)
					this.editForm.graduateDate= new Date(this.editForm.graduateDate)
				}
				this.currentRow.educationQualification=this.editForm.educationQualification
				this.currentRow.enrollDate=this.editForm.enrollDate
				this.currentRow.graduateDate=this.editForm.graduateDate
				this.currentRow.major=this.editForm.major
				this.currentRow.duration=this.editForm.duration
				this.currentRow.supervisorName=this.editForm.supervisorName
				this.currentRow.certificateNo=this.editForm.certificateNo
				this.currentRow.university=this.editForm.university
				this.$refs[editForm].validate((valid)=>{
					if(valid){
						this.currentRow.enrollDate=this.moment(this.currentRow.enrollDate).format('YYYY-MM-DD')
						this.currentRow.graduateDate=this.moment(this.currentRow.graduateDate).format('YYYY-MM-DD')
						var url= this.HOST + '/updateEducation'
						this.$http.put(url,this.currentRow).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
							this.findEducationBackground()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("修改失败")
						})
						this.editDialogVisible=false

					}

				})
			},
			//以除保存取消按钮之外的方式关闭添加窗口时会触发本方法
			addHandleClose(){
				this.$confirm('确认关闭？','关闭')
		          .then(_ => {
					this.addForm={}
		            this.addDialogVisible=false
		          })
		          .catch(_ => {});
			},
			//以除保存取消按钮之外的方式关闭修改窗口时会触发本方法
			editHandleClose(){
				this.$confirm('确认关闭？','关闭')
		          .then(_ => {
		            this.editDialogVisible=false
		            this.changeEditForm()
		          })
		          .catch(_ => {});
			},
			editJudge(){
				if(this.currentRow!=''){
					this.changeEditForm()
					this.editDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("请先选择一行")
				}
			},
			//点击删除时进行判断
			delJudge(){
				if(this.currentRow!=''){
					this.delDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("请先选择一行")
				}
			},
			//取消删除时执行本方法
			cancelDel(){
				this.delDialogVisible=false
			},
			//确认删除时执行本方法
			delMsg(){
				var url = this.HOST + "/deleteEducation?ids="+this.currentRow.id
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findEducationBackground()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("删除失败")
				})
				this.delDialogVisible=false
			}
		},
		components:{
			msgDialog
		}
    }
</script>
