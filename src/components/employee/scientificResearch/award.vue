<template>
	<div>
		<el-button-group>
			<el-button type="primary" icon="plus" @click="addDialogVisible = true"></el-button>
			<el-button type="primary" icon="edit" @click="editJudge"></el-button>
			<el-button type="primary" icon="delete" @click="delJudge"></el-button>
		</el-button-group>
		<el-table 
		highlight-current-row
		:data="tableData"
		style="width:100%"
		@row-click="getCurrentRow">
			<el-table-column
				prop="awardsRank.description"
				label="级别"
				style="width:6%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="title"
				label="成果名称"
				style="width:6%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="author"
				label="代表作者"
				width="120"
				align="center">
			</el-table-column>
			<el-table-column
				prop="name"
				label="奖项名称"
				style="width:7%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="awardLevel.description"
				label="等级"
				style="width:7%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="sponsor"
				label="批准部门"
				style="width:7%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="dateOfAward"
				label="获奖时间"
				width="120"
				align="center">
			</el-table-column>
			<el-table-column
				prop="seating"
				label="本人位次"
				style="width:8%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="numOfParticipants"
				label="参加人数"
				style="width:8%"
				align="center">
			</el-table-column>
			<el-table-column
				prop="checkingStatus.state"
				label="状态"
				width="120"
				align="center">
			</el-table-column>
		</el-table>
		<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPage"
		:page-sizes="[5,10,15]"
		:page-size="pageSize"
		layout="total,sizes,prev,pager,next,jumper"
		:total="total"></el-pagination>
		<msg-dialog ref="msgDialog"></msg-dialog>
		<el-dialog 
		title="添加"
		:visible.sync="addDialogVisible"
		width="80%"
		:before-close="addHandleClose"> 
			<el-form :model="addForm" label-width="80px" :rules="rules" ref="addForm">
				<el-form-item label="级别" prop="awardsRank">
					<el-select v-model="addForm.awardsRank">
						<el-option
						 v-for="item in allAwardRanks"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="成果名称" prop="title">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
				<el-form-item label="代表作者" prop="author">
					<el-input v-model="addForm.author"></el-input>
				</el-form-item>
				<el-form-item label="奖项名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="等级" prop="awardLevel">
					<el-select v-model="addForm.awardLevel">
						<el-option
						v-for="item in allAwardLevels"
						:key="item.id"
						:label="item.description"
						:value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="批准部门" prop="sponsor">
					<el-input v-model="addForm.sponsor"></el-input>
				</el-form-item>
				<el-form-item label="获奖时间" prop="dateOfAward">
					<el-date-picker
					v-model="addForm.dateOfAward"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="本人位次">
					<el-input-number v-model="addForm.seating" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="参加人数">
					<el-input-number v-model="addForm.numOfParticipants" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="状态">
					<el-input value="未审核" disabled></el-input>
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
				<el-form-item label="级别" prop="awardsRank">
					<el-select v-model="editForm.awardsRank">
						<el-option
						 v-for="item in allAwardRanks"
						 :key="item.id"
						 :label="item.description"
						 :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="成果名称" prop="title">
					<el-input v-model="editForm.title"></el-input>
				</el-form-item>
				<el-form-item label="代表作者" prop="author">
					<el-input v-model="editForm.author"></el-input>
				</el-form-item>
				<el-form-item label="奖项名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="等级" prop="awardLevel">
					<el-select v-model="editForm.awardLevel">
						<el-option
						v-for="item in allAwardLevels"
						:key="item.id"
						:label="item.description"
						:value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="批准部门" prop="sponsor">
					<el-input v-model="editForm.sponsor"></el-input>
				</el-form-item>
				<el-form-item label="获奖时间" prop="dateOfAward">
					<el-date-picker
					v-model="editForm.dateOfAward"
					type="date"
					placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="本人位次">
					<el-input-number v-model="editForm.seating" controls-position="right" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="参加人数">
					<el-input-number v-model="editForm.numOfParticipants" controls-position="right" :min="1"></el-input-number>
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
import msgDialog from '../../common/msgDialog'
	export default{
		data(){
			return{
				// 获取表格中显示的内容
				tableData:[],
				// 总共的信息条数，分页用
				total:0,
				// 当前页页码
				currentPage:1,
				// 每页的大小
				pageSize:5,
				// 当前行所有信息
				currentRow:'',
				// 添加对话框的显示控制
				addDialogVisible:false,
				//修改对话框的显示控制
				editDialogVisible:false,
				// 删除对话框的显示控制
				delDialogVisible:false,
				// 添加表单
				addForm:{
					// 级别
					awardsRank:'',
					// 成果名称
					title:'',
					// 代表作者
					author:'',
					// 奖项名称
					name:'',
					// 等级
					awardLevel:'',
					// 批准部门
					sponsor:'',
					// 获奖时间
					dateOfAward:'',
					// 本人位次
					seating:'',
					// 参加人数
					numOfParticipants:'',
					// 状态
					checkingStatus:1
				},
				editForm:{
					// 级别
					awardsRank:'',
					// 成果名称
					title:'',
					// 代表作者
					author:'',
					// 奖项名称
					name:'',
					// 等级
					awardLevel:'',
					// 批准部门
					sponsor:'',
					// 获奖时间
					dateOfAward:'',
					// 本人位次
					seating:'',
					// 参加人数
					numOfParticipants:'',
					// 状态
					checkingStatus:''
				},
				//保存所有的级别信息
				allAwardRanks:'',
				allAwardLevels:"",
				rules:{
					awardsRank:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					title:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],
					author:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],
					name:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],
					awardLevel:[
					{required:true,type:'number',message:"必填项",trigger:'blur'&'change'}
					],
					sponsor:[
					{required:true,message:"必填项",trigger:'blur'&'change'}
					],
					dateOfAward:[
					{required:true,type:'date',message:"必填项",trigger:'blur'&'change'}
					]
				}

			}
		},
		created(){
			//获取表格需要显示的所有内容
			this.findAward()
			//获取所有级别可选项
			var rankUrl = this.HOST + "/findAllAwardsRanks"
			this.$http.get(rankUrl).then(response=>{
				this.allAwardRanks=response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
			//获取所有的等级可选项
			var levelUrl = this.HOST + "/findAllAwardLevel"
			this.$http.get(levelUrl).then(response=>{
				this.allAwardLevels=response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})

		},
		methods:{
			//获取表格要显示的所有数据
			findAward(){
				var url=this.HOST + "/displayOwnAwards?page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查找失败")
				})
			},
			//当当前页改变时触发本方法
			handleCurrentChange(newCurrentPage){
				this.currentPage=newCurrentPage
				this.findAward()
			},
			//当页面容量大小改变时触发本方法
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findAward()
			},
			//当点击某行时，触发本方法，获取当前行的所有信息
			getCurrentRow(currentRow){
				this.currentRow=currentRow
			},
			changeEditForm(){
				this.editForm.awardsRank=this.currentRow.awardsRank.id
				this.editForm.title=this.currentRow.title
				this.editForm.author=this.currentRow.author
				this.editForm.name=this.currentRow.name
				this.editForm.awardLevel=this.currentRow.awardLevel.id
				this.editForm.sponsor=this.currentRow.sponsor
				this.editForm.dateOfAward=this.currentRow.dateOfAward
				this.editForm.seating=this.currentRow.seating
				this.editForm.numOfParticipants=this.currentRow.numOfParticipants
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
						this.addForm.dateOfAward=this.moment(this.addForm.dateOfAward).format("YYYY-MM-DD")
						var url = this.HOST + "/addAwards"
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.addForm={}
							this.addDialogVisible=false
							this.findAward()
						})
					}
				})
			},
			//修改框点击保存时执行本方法。将确认修改的部分赋值给当前行数据，然后提交当前行
			saveEdit(editForm){
				if(this.editForm.dateOfAward==this.currentRow.dateOfAward){
					this.editForm.dateOfAward= new Date(this.editForm.dateOfAward)
				}
				this.currentRow.awardsRank.id=this.editForm.awardsRank
				this.currentRow.title=this.editForm.title
				this.currentRow.author=this.editForm.author
				this.currentRow.name=this.editForm.name
				this.currentRow.awardLevel.id=this.editForm.awardLevel
				this.currentRow.sponsor=this.editForm.sponsor
				this.currentRow.dateOfAward=this.editForm.dateOfAward
				this.currentRow.seating=this.editForm.seating
				this.currentRow.numOfParticipants=this.editForm.numOfParticipants
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						
						this.currentRow.dateOfAward=this.moment(this.currentRow.dateOfAward).format('YYYY-MM-DD')

						var url= this.HOST + '/updateAwards'
						this.$http.put(url,this.currentRow).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
							this.findAward()
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
				var url = this.HOST + "/deleteAwards?ids="+this.currentRow.id
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findAward()
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