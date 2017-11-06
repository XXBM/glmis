<template>
	<div>
		<el-button-group>
		  <el-button type="primary" icon="plus" @click="isAddDialogVisible=true"></el-button>
		  <el-button type="primary" icon="edit" @click="showEditDialog"></el-button>
		  <el-button type="primary" icon="delete" @click="makeSureDel"></el-button>
		</el-button-group>
		<el-table
	      :data="tableData"
	      style="width: 100%"
	      highlight-current-row
	      @row-click="getCurrentRow">
	      <el-table-column
	        prop="title"
	        label="题目"
	        style="width:6%">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="期刊名称"
	        style="width:8%">
	      </el-table-column>
	      <el-table-column
	        prop="journalRank.description"
	        label="期刊级别"
	        style="width:11%">
	      </el-table-column>
	      <el-table-column
	        prop="seating"
	        label="本人位次"
	        style="width:11%">
	      </el-table-column>
	      <el-table-column
	        prop="numOfParticipants"
	        label="参加人数"
	        style="width:11%">
	      </el-table-column>
	      <el-table-column
	        prop="year"
	        label="发表-年"
	        style="width:5%">
	      </el-table-column>
	      <el-table-column
	        prop="issue"
	        label="发表-期"
	        style="width:5%">
	      </el-table-column>
	      <el-table-column
	        prop="volume"
	        label="发表-卷"
	        style="width:5%">
	      </el-table-column>
	      <el-table-column
	        prop="startingPageNo"
	        label="起始页码"
	        style="width:5%">
	      </el-table-column>
	      <el-table-column
	        prop="endingPageNo"
	        label="结束页码"
	        style="width:5%">
	      </el-table-column>
	      <el-table-column
	        prop="citation.description"
	        label="收录情况"
	        style="width:11%">
	      </el-table-column>
	      <el-table-column
	        prop="checkingStatus.state"
	        label="审核状态"
	        style="width:11%">
	      </el-table-column>
	    </el-table>
	    <msg-dialog ref="msgDialog"></msg-dialog>
	    <el-dialog
		  title="添加"
		  :visible.sync="isAddDialogVisible"
		  width="50%">
		  	<el-form :model="addForm" :rules="rules" ref="ruleAdd" label-width="80px">
			  <el-form-item label="题目" prop="title">
			    <el-input v-model="addForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="期刊名称" prop="name">
			    <el-input v-model="addForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="期刊级别" prop="journalRank">
			  	<el-select v-model="addForm.journalRank" placeholder="请选择" prop="journalRankRule">
				    <el-option
				      v-for="item in journalRanks"
				      :key="item.id"
				      :label="item.description"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="本人位次" prop="seating">
			    <el-input v-model="addForm.seating"></el-input>
			  </el-form-item>
			  <el-form-item label="参加人数" prop="numOfParticipants">
			    <el-input v-model="addForm.numOfParticipants"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-年" prop="year">
			    <el-input v-model="addForm.year"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-期" prop="issue">
			    <el-input v-model="addForm.issue"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-卷" prop="volume">
			    <el-input v-model="addForm.volume"></el-input>
			  </el-form-item>
			  <el-form-item label="起始页码" prop="startingPageNo">
			    <el-input v-model="addForm.startingPageNo"></el-input>
			  </el-form-item>
			  <el-form-item label="结束页码" prop="endingPageNo">
			    <el-input v-model="addForm.endingPageNo"></el-input>
			  </el-form-item>
			  <el-form-item label="收录情况" prop="citation">
			  	<el-select v-model="addForm.citation" placeholder="请选择">
				    <el-option
				      v-for="item in citations"
				      :key="item.id"
				      :label="item.description"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancleAdd">取 消</el-button>
		    <el-button type="primary" @click="saveAdd(ruleAdd)">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="修改"
		  :visible.sync="isEditDialogVisible"
		  width="50%">
		  	<el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
			  <el-form-item label="题目" prop="title">
			    <el-input v-model="editForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="期刊名称" prop="name">
			    <el-input v-model="editForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="期刊级别">
			  	<el-select v-model="editForm.journalRank" placeholder="请选择">
				    <el-option
				      v-for="item in journalRanks"
				      :key="item.id"
				      :label="item.description"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="本人位次" prop="seating">
			    <el-input v-model="editForm.seating"></el-input>
			  </el-form-item>
			  <el-form-item label="参加人数" prop="numOfParticipants">
			    <el-input v-model="editForm.numOfParticipants"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-年" prop="year">
			    <el-input v-model="editForm.year"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-期" prop="issue">
			    <el-input v-model="editForm.issue"></el-input>
			  </el-form-item>
			  <el-form-item label="发表-卷" prop="volume">
			    <el-input v-model="editForm.volume"></el-input>
			  </el-form-item>
			  <el-form-item label="起始页码" prop="startingPageNo">
			    <el-input v-model="editForm.startingPageNo"></el-input>
			  </el-form-item>
			  <el-form-item label="结束页码" prop="endingPageNo">
			    <el-input v-model="editForm.endingPageNo"></el-input>
			  </el-form-item>
			  <el-form-item label="收录情况">
			  	<el-select v-model="editForm.citation" placeholder="请选择">
				    <el-option
				      v-for="item in citations"
				      :key="item.id"
				      :label="item.description"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="审核状态">
			  	<el-select v-model="editForm.checkingStatus" placeholder="请选择">
				    <el-option
				      v-for="item in checkingStatus"
				      :key="item.id"
				      :label="item.state"
				      :value="item.id">
				    </el-option>
				</el-select>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancleEdit">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="删除"
		  :visible.sync="isDelDialogVisible"
		  width="50%">
		  	<span>你确定删除{{currentRow.name}}吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isDelDialogVisible=false">取 消</el-button>
		    <el-button type="primary" @click="deleteRow">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>
<script type="text/javascript">
import msgDialog from '../../common/msgDialog'
	export default{
		data(){
			return{
				tableData:[],
				//控制添加对话框的显示
				isAddDialogVisible:false,
				isEditDialogVisible:false,
				isDelDialogVisible:false,
				//用于提交需要添加的内容
				addForm:{title:'',name:'',journalRank:'',seating:'',numOfParticipants:'',year:'',issue:'',volume:'',startingPageNo:'',endingPageNo:'',citation:''},
				// 用于保存修改的内容
				editForm:{title:'',name:'',journalRank:'',seating:'',numOfParticipants:'',year:'',issue:'',volume:'',startingPageNo:'',endingPageNo:'',citation:'',checkingStatus:''},
				// 期刊级别
				journalRanks:'',
				journalRankId:'',
				// 收录情况
				citations:'',
				citationId:'',
				// 审核状态
				checkingStatus:'',
				checkingStatusId:'',
				// 保存当前行的所有信息
				currentRow:'',
				rules:{
					title:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					name:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					journalRank:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					seating:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					numOfParticipants:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					year:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					issue:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					volume:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					startingPageNo:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					endingPageNo:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					citation:[
					{required:true,trigger:'blur'&'change',message:"必填项"}
					],
					journalRank:[
					{type:'number',required:true,trigger:'blur'&'change',message:"必填项"}
					],
					citation:[
					{type:'number',required:true,trigger:'blur'&'change',message:"必填项"}
					],
				}
			}
		},
		methods:{
			findThesis(){
				var url=this.HOST + "/displayOwnThesis?page=1&rows=9"
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
			},
			saveAdd(ruleAdd){
				this.$refs.ruleAdd.validate((valid)=>{
					if(valid){
						var url = this.HOST + "/addThesis"
						this.$http.post(url,this.addForm).then(response=>{
						this.$refs.msgDialog.notify("添加成功")
						this.findThesis()
					}).catch(errors=>{
						this.$refs.msgDialog.confirm("添加失败")
					})
					this.addForm={}
					this.isAddDialogVisible=false
					}
				})
				
			},
			cancleAdd(){
				this.addForm={}
				this.journalRankId=''
				this.citationId=''
				this.isAddDialogVisible=false
			},
			getCurrentRow(row){
				this.currentRow=row
				this.currentRowId=row.id
			},
			showEditDialog(){
				if(!this.currentRow){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else{
					this.editForm.title=this.currentRow.title
					this.editForm.name=this.currentRow.name
					this.editForm.journalRank=this.currentRow.journalRank.id
					this.editForm.seating=this.currentRow.seating
					this.editForm.numOfParticipants=this.currentRow.numOfParticipants
					this.editForm.year=this.currentRow.year
					this.editForm.issue=this.currentRow.issue
					this.editForm.volume=this.currentRow.volume
					this.editForm.startingPageNo=this.currentRow.startingPageNo
					this.editForm.endingPageNo=this.currentRow.endingPageNo
					this.editForm.citation=this.currentRow.citation
					this.editForm.checkingStatus=this.currentRow.checkingStatus.id
					this.isEditDialogVisible = true
				}
			},
			cancleEdit(){
				this.isEditDialogVisible=false
			},
			saveEdit(){
					this.currentRow.title=this.editForm.title
					this.currentRow.name=this.editForm.name
					this.currentRow.journalRank.id=this.editForm.journalRank
					this.currentRow.seating=this.editForm.seating
					this.currentRow.numOfParticipants=this.editForm.numOfParticipants
					this.currentRow.year=this.editForm.year
					this.currentRow.issue=this.editForm.issue
					this.currentRow.volume=this.editForm.volume
					this.currentRow.startingPageNo=this.editForm.startingPageNo
					this.currentRow.endingPageNo=this.editForm.endingPageNo
					this.currentRow.citation=this.editForm.citation
					this.currentRow.checkingStatus=this.editForm.checkingStatus

					var url = this.HOST + '/updateThesis'
					this.$http.put(url,this.currentRow).then(response=>{
						this.$refs.msgDialog.notify("修改成功")
					}).catch(errors=>{
						this.$refs.msgDialog.confirm("修改失败")
					})
					this.isEditDialogVisible=false
			},
			deleteRow(){
				var url=this.HOST + '/deleteThesis?ids='+this.currentRowId
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findThesis()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("删除失败")
				})
				this.isDelDialogVisible=false
			},
			makeSureDel(){
				if(this.currentRow==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else
					this.isDelDialogVisible=true
			},
		},
		
		created(){
			this.findThesis()
			var rankUrl = this.HOST + '/findAllJournalRanks'
			this.$http.get(rankUrl).then(response=>{
				this.journalRanks = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})

			var citationUrl = this.HOST + '/findAllCitation'
			this.$http.get(citationUrl).then(response=>{
				this.citations = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})

			var checkingStatusUrl = this.HOST + '/findAllScienReasCheckingStatus'
			this.$http.get(checkingStatusUrl).then(response=>{
				this.checkingStatus = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
		components:{
			msgDialog
		}
	}
</script>