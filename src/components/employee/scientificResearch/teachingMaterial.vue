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
		</el-row>
		<el-dialog title="增加" v-model="showAddDialog">
			<el-form v-model="addData">
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
		      		<el-input v-model="addData.press" type='number'></el-input>
		     	</el-form-item>
		      	<el-form-item
					prop="textbookRank.description"
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
			<el-button @click="saveAdd">提交</el-button>
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
import msgDialog from '../../../components/common/msgDialog.vue'
	export default{
		data(){
			return{
				tableData:'',
				textbookRanks:'',
				currentPage:1,
				total:10,
				showAddDialog:false,
				showEditDialog:false,
				addData:'',
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
			}
		},
		created:function(){
			this.getAllTableData()
		},
		methods:{
			getAllTableData:function(){
				var url=this.HOST+'/displayTextbook?page='+this.currentPage+'&rows='+this.total
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
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
			handleRowClick:function(){

			},
			add:function(){
				this.showAddDialog=true
				this.getAlltextbookRank()
			},
			edit:function(){

			},
			remove:function(){

			},
		},
		components:{
			msgDialog
		}
	}
</script>