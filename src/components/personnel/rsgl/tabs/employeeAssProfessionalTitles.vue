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
				prop="professionalTitle.description"
				label="职称"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="nominatedDate"
				label="评定时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="nominatedNo"
				label="评定文号"
				width="180"
				align="center">
				</el-table-column>
				
				<el-table-column
				prop="appointedDate"
				label="聘任时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="appointedNo"
				label="聘任文号"
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
			:total="total"></el-pagination>
			<msg-dialog ref="msgDialog"></msg-dialog>
			<el-dialog
			title="添加"
			:visible.sync="addDialogVisible"
			width="50%"
			:before-close="addHandleClose">
			<el-form :model="addForm" label-width="80px" :rules="rules" ref="addForm">
				<el-form-item label="职称" prop="professionalTitle">
					<el-select v-model="addForm.professionalTitle">
						<el-option
						 v-for="item in allProfessionalTitles"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="评定时间" prop="nominatedDate">
					<el-date-picker
					v-model="addForm.nominatedDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="评定文号" prop="nominatedNo">
					<el-input-number v-model="addForm.nominatedNo" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="聘任时间" prop="appointedDate">
					<el-date-picker
					v-model="addForm.appointedDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="聘任文号" prop="appointedNo">
					<el-input-number v-model="addForm.appointedNo" controls-position="right" :min="1"></el-input-number>
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
				<el-form-item label="职称" prop="professionalTitle">
					<el-select v-model="editForm.professionalTitle">
						<el-option
						 v-for="item in allProfessionalTitles"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="评定时间" prop="nominatedDate">
					<el-date-picker
					v-model="editForm.nominatedDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="评定文号">
					<el-input-number v-model="editForm.nominatedNo" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="聘任时间" prop="appointedDate">
					<el-date-picker
					v-model="editForm.nominatedDate"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="聘任文号">
					<el-input-number v-model="editForm.appointedNo" controls-position="right" :min="1"></el-input-number>
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
				this.findProfessionTitle()
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
				ProfessionTitle:{
				   professionalTitle:'',
				   nominatedNo:'',
				   nominatedDate:'',
				   appointedNo:'',
				   appointedDate:''
				},
				// 添加表单
				addForm:{
					// 职称
					professionalTitle:'',
					// 评定时间
					nominatedDate:'',
					// 评定文号
					nominatedNo:'',
					// 聘任时间
					appointedDate:'',
					// 聘任文号
					appointedNo:''
				},
				editForm:{
					// 职称
					professionalTitle:'',
					// 评定时间
					nominatedDate:'',
					// 评定文号
					nominatedNo:'',
					// 聘任时间
					appointedDate:'',
					// 聘任文号
					appointedNo:''
				},
				//保存所有的职称信息
				allProfessionalTitles:'',
				rules:{
					professionalTitle:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					nominatedDate:[
					{required:true,type:'date',message:"必填项",trigger:'blur'&'change'}
					],
					nominatedNo:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					appointedDate:[
					{required:true,type:'date',message:"必填项",trigger:'blur'&'change'}
					],
					appointedNo:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					]
				}
			}
        },
        created(){
			//获取表格需要显示的所有内容
			this.findProfessionTitle()
			//获取所有职称可选项
			var professionTitleUrl = this.HOST + "/findAllPostNames"
			this.$http.get(professionTitleUrl).then(response=>{
				this.allProfessionalTitles=response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
        methods:{
            // 获取表格显示需要的所有信息
			findProfessionTitle(){
			    var url=this.HOST + this.url + "&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				})
			},
			// 当换页时触发本方法，将页面切换，并从后台获取数据
			handleCurrentChange(newCurrentPage){
				this.currentPage=newCurrentPage
				this.findProfessionTitle()
			},
			// 当页容量变化时触发本方法，改变页容量，并从后台获取新数据
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findProfessionTitle()
			},
			//当点击某行时，触发本方法，获取当前行的所有信息
			getCurrentRow(currentRow){
				this.currentRow=currentRow
			},
			changeEditForm(){
				this.editForm.professionalTitle=this.currentRow.professionalTitle.id
				this.editForm.nominatedDate=this.currentRow.nominatedDate
				this.editForm.nominatedNo=this.currentRow.nominatedNo
				this.editForm.appointedDate=this.currentRow.appointedDate
				this.editForm.appointedNo=this.currentRow.appointedNo
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
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.addForm.nominatedDate=this.moment(this.addForm.nominatedDate).format("YYYY-MM-DD")
						this.addForm.appointedDate=this.moment(this.addForm.appointedDate).format("YYYY-MM-DD")
						var url = this.HOST + "/addPostName"
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.addForm={}
							this.addDialogVisible=false
							this.findProfessionTitle()
						})
					}
				})
			},
			//修改框点击保存时执行本方法。将确认修改的部分赋值给当前行数据，然后提交当前行
			saveEdit(editForm){
				if((this.editForm.nominatedDate==this.currentRow.nominatedDate) || (this.editForm.appointedDate==this.currentRow.appointedDate) ){
					this.editForm.nominatedDate= new Date(this.editForm.nominatedDate)
					this.editForm.appointedDate= new Date(this.editForm.appointedDate)
				}
				this.currentRow.professionalTitle=this.editForm.professionalTitle
				this.currentRow.nominatedDate=this.editForm.nominatedDate
				this.currentRow.nominatedNo=this.editForm.nominatedNo
				this.currentRow.appointedDate=this.editForm.appointedDate
				this.currentRow.appointedNo=this.editForm.appointedNo
				this.$refs[editForm].validate((valid)=>{
					if(valid){
						this.currentRow.nominatedDate=this.moment(this.currentRow.nominatedDate).format('YYYY-MM-DD')
						this.currentRow.appointedDate=this.moment(this.currentRow.appointedDate).format('YYYY-MM-DD')
						var url= this.HOST + '/updatePostName'
						this.$http.put(url,this.currentRow).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
							this.findProfessionTitle()
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
				var url = this.HOST + "/deletePostName?id="+this.currentRow.id
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findProfessionTitle()
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

