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
					prop="name"
		      		label="名称">
		     	</el-table-column>
		      	<el-table-column
					prop="editor"
		      		label="负责人">
		      	</el-table-column>
		      	<el-table-column
					prop="press"
		      		label="出版社">
		     	</el-table-column>
		      	<el-table-column
					prop="publicationTime"
		      		label="出版时间">
		      	</el-table-column>
		      	<el-table-column
					prop="words"
		      		label="千字数">
		     	</el-table-column>
		      	<el-table-column
					prop="textbookRank.description"
		      		label="级别">
		      	</el-table-column>
		      	<el-table-column
					prop="isbn"
		      		label="ISBN">
		      	</el-table-column>
		      	<el-table-column
					prop="seating"
		      		label="本人位次">
		      	</el-table-column>
		      	<el-table-column
					prop="numOfParticipants"
		      		label="作者人数">
		      	</el-table-column><el-table-column
					prop="checkingStatus.state"
		      		label="审核状态">
		      	</el-table-column>
			</el-table>
			<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :page-sizes="[10, 15, 20, 25]"
			      :page-size="rows"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="tableDataTotal">
			</el-pagination>
		</el-row>
		<el-dialog title="增加" v-model="showAddDialog">
			<el-form :model="addData" :rules="rules" ref="ruleAdd">
				<el-form-item
					prop="name"
		      		label="名称">
		      		<el-input v-model="addData.name"></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="editor"
		      		label="负责人">
		      		<el-input v-model="addData.editor"></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="press"
		      		label="出版社">
		      		<el-input v-model="addData.press"></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="publicationTime"
		      		label="出版时间">
		      		<el-date-picker
				      v-model="addData.publicationTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
		      	</el-form-item>
		      	<el-form-item
					prop="words"
		      		label="千字数">
		      		<el-input v-model="addData.words" type='number'></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="textbookRank"
		      		label="级别">
		      		<el-select v-model="addData.textbookRank" placeholder="请选择">
					    <el-option
					      v-for="item in textbookRanks"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
		      	</el-form-item>
		      	<el-form-item
					prop="isbn"
		      		label="ISBN">
		      		<el-input v-model="addData.isbn"></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="seating"
		      		label="本人位次">
		      		<el-input v-model="addData.seating" type='number'></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="numOfParticipants"
		      		label="作者人数">
		      		<el-input v-model="addData.numOfParticipants"type='number'></el-input>
		      	</el-form-item>
			</el-form>
			<el-button @click="cancelAdd">取消</el-button>
			<el-button @click="saveAdd('ruleAdd')">提交</el-button>
		</el-dialog>
		<el-dialog title="修改" v-model="showEditDialog">
			<el-form :model="editData" :rules="rules" ref="ruleEdit">
				<el-form-item
					prop="name"
		      		label="名称">
		      		<el-input v-model="editData.name"></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="editor"
		      		label="负责人">
		      		<el-input v-model="editData.editor"></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="press"
		      		label="出版社">
		      		<el-input v-model="editData.press"></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="publicationTime"
		      		label="出版时间">
		      		<el-date-picker
				      v-model="editData.publicationTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
		      	</el-form-item>
		      	<el-form-item
					prop="words"
		      		label="千字数">
		      		<el-input v-model="editData.words" type='number'></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="textbookRank"
		      		label="级别">
		      		<el-select v-model="editData.textbookRank" placeholder="请选择">
					    <el-option
					      v-for="item in textbookRanks"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
		      	</el-form-item>
		      	<el-form-item
					prop="isbn"
		      		label="ISBN">
		      		<el-input v-model="editData.isbn"></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="seating"
		      		label="本人位次">
		      		<el-input v-model="editData.seating" type='number'></el-input>
		      	</el-form-item>
		      	<el-form-item
					prop="numOfParticipants"
		      		label="作者人数">
		      		<el-input v-model="editData.numOfParticipants"type='number'></el-input>
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
import msgDialog from '../../../components/common/msgDialog.vue'
	export default{
		data(){
			return{
				tableData:'',
				textbookRanks:'',
				currentPage:1,
				rows:10,
				tableDataTotal:'',
				showAddDialog:false,
				showEditDialog:false,
				currentRow:'',
				currentRowId:'',
				addData:{
					name:'',		     	
					editor:'',
					press:'',
					publicationTime:'',
					words:'',
					textbookRank:'',
					isbn:'',	      	
					seating:'',
					numOfParticipants:''
				},
				editData:{
					id:'',
					name:'',		     	
					editor:'',
					press:'',
					publicationTime:'',
					words:'',
					textbookRank:'',
					isbn:'',	      	
					seating:'',
					numOfParticipants:''
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
		          name: [{ required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          editor: [{ required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          press:[{ required: true, message: '必填项', trigger: 'blur'&'change'}],
		          textbookRank:[{required: true, type:'number',message: '必填项', trigger: 'blur'&'change'}],
		          words:[{required: true, message: '必填项', trigger: 'blur'&'change'  }],
		          isbn:[{required: true, message: '必填项', trigger: 'blur'&'change' }],
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
				var url=this.HOST+'/displayTextbook?page='+this.currentPage+'&rows='+this.rows
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.tableDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有教材信息失败!")
				})
			},
			getAlltextbookRank:function(){
				var url=this.HOST+'/findAllTextbookRanks'
				this.$http.get(url).then(response=>{
					this.textbookRanks=response.data
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有教材级别失败！")
				})
			},
			handleRowClick:function(value){
				this.currentRow=value
				this.currentRowId=value.id
			},
			handleSizeChange:function(val){
				this.rows=val
				this.getAllTableData()
			},
			handleCurrentChange:function(val){
				this.currentPage=val
				this.getAllTableData()
			},
			add:function(){
				this.showAddDialog=true
				this.getAlltextbookRank()
			},
			saveAdd:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/addTextbook'
						var time =this.addData.publicationTime
						this.addData.publicationTime=moment(time).format("YYYY-MM-DD")
						this.$http.post(url,this.addData).then(response=>{
							this.getAllTableData()
							this.showAddDialog=false
							this.$refs.msgDialog.notify("成功添加教科书！")
						}).catch(response=>{
							this.refs.msgDialog.confirm("添加教科书失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查填写的信息！")
					}
				})
				
			},
			cancelAdd:function(){
				this.addData={}
				this.showAddDialog=false
			},
			edit:function(){
				if (this.currentRowId=='') {
					this.$refs.msgDialog.confirm("请选择要修改的行！")
				}else{
					this.showEditDialog=true
					this.getAlltextbookRank()
					this.editData.id=this.currentRow.id
					this.editData.name=this.currentRow.name			     	
					this.editData.editor=this.currentRow.editor,
					this.editData.press=this.currentRow.press,
					this.editData.publicationTime=this.currentRow.publicationTime
					this.editData.words=this.currentRow.words
					this.editData.textbookRank=this.currentRow.textbookRank
					this.editData.isbn=this.currentRow.isbn
					this.editData.seating=this.currentRow.seating
					this.editData.numOfParticipants=this.currentRow.numOfParticipants
				}
			},
			saveEdit:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url=this.HOST+'/updateTextbook'
						var time =this.editData.publicationTime

						this.editData.publicationTime=moment(time).format("YYYY-MM-DD")
						this.currentRow.id=this.editData.id
						this.currentRow.name=this.editData.name		     	
						this.currentRow.editor=this.editData.editor
						this.currentRow.press=this.editData.press
						this.currentRow.publicationTime=this.editData.publicationTime
						this.currentRow.words=this.editData.words
						this.currentRow.textbookRank=this.editData.textbookRank
						this.currentRow.isbn=this.editData.isbn
						this.currentRow.seating=this.editData.seating
						this.currentRow.numOfParticipants=this.editData.numOfParticipants
						this.$http.put(url,this.currentRow).then(response=>{
							this.getAllTableData()
							this.$refs.msgDialog.notify("修改教材信息成功！")
							this.showEditDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.confirm("修改教材信息失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查填写的信息！")
					}
				})
				
			},
			cancelEdit:function(){
				this.editData={}
				this.showEditDialog=false
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
				          var url =this.HOST+'/deleteTextbook?ids='+this.currentRowId
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