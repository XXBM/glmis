<template>
	<div>
		<!-- 按钮组 -->
		<el-button-group>
			<el-button type="primary" icon="plus" @click="addDialogVisible=true"></el-button>
			<el-button type="primary" icon="edit" @click="editJudge"></el-button>
			<el-button type="primary" icon="delete" @click="delJudge"></el-button>
		</el-button-group>
		<!-- 表格显示 -->
		<el-table 
		:data="tableData"
		style="width:100%"
		@selection-change="getCurrentRow">
		<el-table-column
		type="selection"
		width="40"
		align="center"></el-table-column>
		<el-table-column
		prop="name"
		label="名称"
		style="width:7%"
		align="center"></el-table-column>
		<el-table-column
		prop="author"
		label="负责人"
		style="width:7%"
		align="center"></el-table-column>
		<el-table-column
		prop="press"
		label="出版社"
		style="width:9%"
		align="center"></el-table-column>
		<el-table-column
		prop="publicationTime"
		label="出版时间"
		style="width:13%"
		align="center"></el-table-column>
		<el-table-column
		prop="words"
		label="千字数"
		style="width:6%"
		align="center"></el-table-column>
		<el-table-column
		prop="monographRank.description"
		label="级别"
		style="width:7%"
		align="center"></el-table-column>
		<el-table-column
		prop="isbn"
		label="ISBN"
		style="width:8%"
		align="center"></el-table-column>
		<el-table-column
		prop="seating"
		label="本人位次"
		style="width:8%"
		align="center"></el-table-column>
		<el-table-column
		prop="numOfParticipants"
		label="作者人数"
		style="width:8%"
		align="center"></el-table-column>
		<el-table-column
		prop="checkingStatus.state"
		label="审核状态"
		style="width:8%"
		align="center"></el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination 
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPage"
		:page-size="pageSize"
		:page-sizes="[5,10,15]"
		layout="total,sizes,prev,pager,next,jumper"
		:total="total"
		></el-pagination>
		<!-- 提示信息框的调用 -->
		<msg-dialog ref="msgDialog"></msg-dialog>
		<!-- 添加对话框 -->
		<el-dialog
		title="添加"
		:visible.sync="addDialogVisible"
		width="80%"
		:before-close="addHandleClose">
		<el-form :model="addForm" :rules="rules" label-width="80px" ref='addForm'>
			<el-form-item label="名称" prop="name">
				<el-input v-model="addForm.name"></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="author">
				<el-input v-model="addForm.author"></el-input>
			</el-form-item>
			<el-form-item label="出版社" prop="press">
				<el-input v-model="addForm.press"></el-input>
			</el-form-item>
			<el-form-item label="出版时间" prop="publicationTime">
				<el-date-picker
				v-model="addForm.publicationTime"
				type="date"
				placeholder="请选择日期"></el-date-picker>
			</el-form-item>
			<el-form-item label="千字数" prop="words">
				<el-input-number v-model="addForm.words" controls-position="right" :min="0.001"></el-input-number>
			</el-form-item>
			<el-form-item label="级别" prop="monographRank">
				<el-select v-model="addForm.monographRank">
					<el-option
					v-for="item in monographRanks"
					:key="item.id"
					:label="item.description"
					:value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="ISBN" prop="isbn">
				<el-input v-model="addForm.isbn"></el-input>
			</el-form-item>
			<el-form-item label="本人位次" prop="seating">
				<el-input-number v-model="addForm.seating" controls-position="right" :min="1"></el-input-number>
			</el-form-item>
			<el-form-item label="作者人数" prop="numOfParticipants">
				<el-input-number v-model="addForm.numOfParticipants" controls-position="right" :min="1"></el-input-number>
			</el-form-item>
			<el-form-item label="审核状态">
				<el-input value="未审核" disabled></el-input>
			</el-form-item>
		</el-form>
			<span slot="footer">
				<el-button @click="cancelAdd">取消</el-button>
				<el-button @click="saveAdd('addForm')">保存</el-button>
			</span>
		</el-dialog>
		<!-- 修改对话框 -->
		<el-dialog
		title="修改"
		:visible.sync="editDialogVisible"
		width="80%"
		:before-close="editHandleClose">
		<el-form :model="editForm" :rules="rules" label-width="80px" ref='editForm'>
			<el-form-item label="名称" prop="name">
				<el-input v-model="editForm.name"></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="author">
				<el-input v-model="editForm.author"></el-input>
			</el-form-item>
			<el-form-item label="出版社" prop="press">
				<el-input v-model="editForm.press"></el-input>
			</el-form-item>
			<el-form-item label="出版时间" prop="publicationTime">
				<el-date-picker
				v-model="editForm.publicationTime"
				type="date"
				placeholder="请选择日期"></el-date-picker>
			</el-form-item>
			<el-form-item label="千字数" prop="words">
				<el-input-number v-model="editForm.words" controls-position="right" :min="0.001"></el-input-number>
			</el-form-item>
			<el-form-item label="级别" prop="monographRank">
				<el-select v-model="editForm.monographRank">
					<el-option
					v-for="item in monographRanks"
					:key="item.id"
					:label="item.description"
					:value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="ISBN" prop="isbn">
				<el-input v-model="editForm.isbn"></el-input>
			</el-form-item>
			<el-form-item label="本人位次" prop="seating">
				<el-input-number v-model="editForm.seating" controls-position="right" :min="1"></el-input-number>
			</el-form-item>
			<el-form-item label="作者人数" prop="numOfParticipants">
				<el-input-number v-model="editForm.numOfParticipants" controls-position="right" :min="1"></el-input-number>
			</el-form-item>
		</el-form>
			<span slot="footer">
				<el-button @click="editDialogVisible=false">取消</el-button>
				<el-button @click="saveEdit('editForm')">保存</el-button>
			</span>
		</el-dialog>
		<!-- 删除窗口 -->
		<el-dialog 
		title="删除"
		:visible.sync="delDialogVisible"
		width="80%">
			<span>您确定删除以下信息吗？</span>
			<el-row><br/></el-row>
			<div v-for="item in currentRow">
				<el-row>
				{{item.name}}
				</el-row>
			</div>
			<span slot="footer">
				<el-button @click="delDialogVisible=false">取消</el-button>
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
				//用来保存被选中的选项的id
				ids:[],
				//用于保存表格中需要显示的所有数据
				tableData:[],
				//用于控制和显示当前页在第几页,初始值是1
				currentPage:1,
				//用于控制每页的容量大小
				pageSize:5,
				//用于保存总共的信息条数
				total:0,
				//用于保存所有可供选择的级别信息
				monographRanks:[],
				//用于控制添加窗口的显示,默认false
				addDialogVisible:false,
				//用于控制修改窗口的显示,默认false
				editDialogVisible:false,
				//用于控制删除窗口的显示,默认false
				delDialogVisible:false,
				//用于临时保存添加框中输入的信息
				addForm:{
					name:'',
					author:'',
					press:'',
					publicationTime:'',
					words:'',
					monographRank:'',
					isbn:'',
					seating:'',
					numOfParticipants:'',
					checkingStatus:1
				},
				//用于临时保存修改框中的信息
				editForm:{
					name:'',
					author:'',
					press:'',
					publicationTime:'',
					words:'',
					monographRank:'',
					isbn:'',
					seating:'',
					numOfParticipants:'',
				},
				//用于保存当前行信息
				currentRow:[],
				//规则定义
				rules:{
					name:[
					{required:true,message:'必填项',trigger:'blur'&'change'}
					],
					author:[
					{required:true,message:'必填项',trigger:'blur'&'change'}
					],
					press:[
					{required:true,message:'必填项',trigger:'blur'&'change'}
					],
					publicationTime:[
					{required:true,message:'必填项',type:'date',trigger:'blur'&'change'}
					],
					words:[
					{required:'true',message:'必填项',type:'number',trigger:'blur'&'change'}
					],
					monographRank:[
					{required:true,type:'number',message:'必填项',trigger:'blur'&'change'}
					],
					isbn:[
					{required:true,message:'必填项',trigger:'blur'&'change'}
					],
					seating:[
					{required:true,message:'必填项',type:'number',trigger:'blur'&'change'}
					],
					numOfParticipants:[
					{required:true,type:'number',message:'必填项',trigger:'blur'&'change'}
					]
				},
				//用来保存所有的审核状态
				checkingStatus:[]

			}
		},
		created(){
			// 调用方法，查询当前表格中所要显示的所有信息
			this.findAllMonograph()
			//获取到所有可供选择的级别信息
			var rankUrl = this.HOST + '/findAllMonographRanks'
			this.$http.get(rankUrl).then(response=>{
				this.monographRanks=response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取级别信息失败")
			})
		},
		methods:{
			//本方法用于查询表格中需要显示的所有信息
			findAllMonograph(){
				var url= this.HOST + "/displayMonograph?page="+this.currentPage+"&rows="+ this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取表格信息失败")
				})
			},
			//本方法用于页面容量改变时重新获取信息
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findAllMonograph()
			},
			//本方法用于当前页改变时重新获取信息
			handleCurrentChange(newPage){
				this.currentPage=newPage
				this.findAllMonograph()
			},
			//在添加窗口中点击取消时触发本方法
			cancelAdd(){
				this.addDialogVisible=false
				this.addForm={}
			},
			//使用除点击取消和保存外的其他关闭添加窗口的方法时，触发本方法
			addHandleClose(){
				this.$confirm('确认关闭？','关闭')
		          .then(_ => {
		            this.addDialogVisible=false
					this.addForm={}
		          })
		          .catch(_ => {});
			},
			//在保存窗口中点击保存时触发本方法
			saveAdd(addForm){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.addForm.publicationTime=this.moment(this.addForm.publicationTime).format('YYYY-MM-DD')
						var url = this.HOST + "/addMonograph"
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.findAllMonograph()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("添加失败")
						})
						this.addDialogVisible=false
						this.addForm={}
					}
				})
			},
			//当选中一行时触发本方法
			getCurrentRow(currentRow){
				this.currentRow=currentRow
			},
			//点击修改按钮时进行判断
			editJudge(){
				if(this.currentRow.length==1){
					this.changeEdit()
					this.editDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("至少且只能选择一行进行修改")
				}
			},
			//修改窗口下点击保存时触发本方法
			saveEdit(editForm){
				if(this.editForm.publicationTime==this.currentRow[0].publicationTime){
					this.editForm.publicationTime = new Date(this.editForm.publicationTime)
				}
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						this.currentRow[0].name=this.editForm.name
						this.currentRow[0].author=this.editForm.author
						this.currentRow[0].press=this.editForm.press
						this.currentRow[0].publicationTime=this.moment(this.editForm.publicationTime).format('YYYY-MM-DD')
						this.currentRow[0].words=this.editForm.words
						this.currentRow[0].monographRank.id=this.editForm.monographRank
						this.currentRow[0].isbn=this.editForm.isbn
						this.currentRow[0].seating=this.editForm.seating
						this.currentRow[0].numOfParticipants=this.editForm.numOfParticipants
						var url = this.HOST + "/updateMonograph"
						this.$http.put(url,this.currentRow[0]).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("修改失败")
						})
						this.editDialogVisible=false
					}
				})
			},
			//为修改窗口赋值
			changeEdit(){
				this.editForm.name=this.currentRow[0].name
				this.editForm.author=this.currentRow[0].author
				this.editForm.press=this.currentRow[0].press
				this.editForm.publicationTime=this.currentRow[0].publicationTime
				this.editForm.words=this.currentRow[0].words
				this.editForm.monographRank=this.currentRow[0].monographRank.id
				this.editForm.isbn=this.currentRow[0].isbn
				this.editForm.seating=this.currentRow[0].seating
				this.editForm.numOfParticipants=this.currentRow[0].numOfParticipants
			},
			//使用除点击取消和保存外的其他关闭修改窗口的方法时，触发本方法
			editHandleClose(){
				this.$confirm('确认关闭？','关闭')
		          .then(_ => {
		            this.editDialogVisible=false
		          })
		          .catch(_ => {});
			},
			//点击删除时触发本方法
			delJudge(){
				if(this.currentRow.length!=0){
					this.delDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("至少选择一行进行删除")
				}
			},
			//删除信息
			delMsg(){
				var i = 0
				this.currentRow.forEach(item=>{
					this.ids[i]=item.id;
					i++;
				})
				var url = this.HOST + '/deleteMonograph?ids='+this.ids
				this.$http.delete(url).then(response=>{
					this.delDialogVisible=false
					this.$refs.msgDialog.notify("删除成功")
					this.findAllMonograph()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("删除失败")
				})
			}
		},
		components:{
			msgDialog
		}
	}
</script>