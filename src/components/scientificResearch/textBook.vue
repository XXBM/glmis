<template>
	<div>
		<el-row>
			<el-collapse>
				<el-collapse-item title="查询 inquiry" name="1">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="位次">
							<el-input v-model="seating"></el-input>
						</el-form-item>
						<el-form-item label="出版时间">
							<el-date-picker 
							v-model="publicationTime"
                            type="daterange"
                            placeholder="选择日期">
    						</el-date-picker>

						</el-form-item>
						<el-form-item label="级别">
							<el-select v-model="textbookRankId" placeholder="请选择">
					    	<el-option
					      	v-for="item in textbookRanks"
					      	:key="item.id"
					      	:label="item.description"
					      	:value="item.id">
					    	</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="审核状态">
							<el-select v-model="checkingStatusIds" placeholder="请选择">
						    <el-option
						      v-for="item in checkingStatus"
						      :key="item.id"
						      :label="item.state"
						      :value="item.id">
						    </el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
					    	<el-button type="primary" @click="onSubmit">查询</el-button>
					  	</el-form-item>
					</el-form>
				</el-collapse-item>
				
			</el-collapse>
		</el-row>
		<el-row>
			<el-col :span="3">
				  <el-button type="primary" icon="edit" @click="checking">审核</el-button>
			</el-col>
		</el-row>
		<el-row>
			<!-- 英文符号 -->
			<el-table
			:data="tableData"
			stripe
			style="width: 100%"
			@row-click="getCurrentRow"
		    :highlight-current-row='true'>
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
				label="IBSN">		
			</el-table-column>
			<el-table-column
				prop="seating"
				label="本人位次">		
			</el-table-column>
			<el-table-column
				prop="numOfParticipants"
				label="作者人数">		
			</el-table-column>
			<el-table-column
				prop="checkingStatus.state"
				label="审核状态">

			</el-table-column>
		</el-table>
		<el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="9"
	      layout="total, prev, pager, next,jumper"
	      :total="total">
    	</el-pagination>

	 </el-row>
	 <el-row>
			<el-dialog
			  title="提示"
			  :visible.sync="showCheckingStatusDialog"
			  size="tiny">
			  	<el-form :inline="true" class="demo-form-inline">
				   	<el-select v-model="checkingStatusId" placeholder="请选择">
					    <el-option
					      v-for="item in checkingStatus"
					      :key="item.id"
					      :label="item.state"
					      :value="item.id">
					    </el-option>
				  	</el-select>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="cancle">取 消</el-button>
			    <el-button type="primary" @click="saveCheckStatus">确 定</el-button>
			  </span>
			</el-dialog>
		</el-row>
		<msg-dialog ref='msgDialog'></msg-dialog>
	</div>
</template>
<script>
	import msgDialog from '../common/msgDialog'
	export default{
		data(){
			return{
				tableData:[],
				total:0,
				currentPage:1,
				seating:'',
				publicationTime:[],
				// 所有的级别
				textbookRanks:[],
				// 级别的id
				textbookRankId:'',
				// 所有的审核状态
				checkingStatus:[],
				// 审核状态的id
				checkingStatusIds:'',
				// 在点击审核的审核状态的id
				checkingStatusId:'',
				// 当前行的信息
				currentRow:'',
				textBookId:'',
				showCheckingStatusDialog:false,
				objectTime:[]
			}
			
		},
		//接收父组件传来的值
		props:['url'],
		watch:{
			url:function(){
				this.handleCurrentChange()
			}
		},
		created(){
			var textbookRankUrl = this.HOST + "/findAllTextbookRanks"
			this.$http.get(textbookRankUrl).then(response=>{
				this.textbookRanks = response.data
			}).catch(error=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
			var checkingStatuUrl = this.HOST +"/findAllScienReasCheckingStatus"
			this.$http.get(checkingStatuUrl).then(response=>{
				this.checkingStatus = response.data
			}).catch(error=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
		components:{
			msgDialog
		},
		methods:{
			inquiry(){
				var url = this.HOST + ""
			},
			handleCurrentChange(){
				var textbookUrl = this.HOST + this.url + "&page=1&rows=9"
				this.$http.get(textbookUrl).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(error=>{

				})
			},
			getCurrentRow(currentRow){
				this.currentRow = currentRow
				this.checkingStatusId = this.currentRow.checkingStatus.id
				this.textBookId = this.currentRow.id

			},
			checking(){
				if(this.textBookId==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else{
					this.showCheckingStatusDialog=true
				}
			},
			saveCheckStatus(){
				this.currentRow.checkingStatus.id=this.checkingStatusId
				var url = this.HOST + "/updateTextbook"
				this.$http.put(url,this.currentRow).then(response=>{
					this.$refs.msgDialog.notify("修改成功")
					this.handleCurrentChange()
				}).catch(error=>{
					this.$refs.msgDialog.confirm("修改失败")
				})
				this.showCheckingStatusDialog = false
			},
			cancle(){
				this.showCheckingStatusDialog = false
				this.checkingStatusIds = ''
			},
			
			onSubmit(){
				var startTime = this.moment(this.objectTime[0]).format('YYYY-MM-DD')
				var endTime = this.moment(this.objectTime[(this.objectTime.length)-1]).format('YYYY-MM-DD')
				var url = this.HOST + '/dispBooksSpecification?seating='+this.seating + "&;publishingStart=" + startTime + "&;publishingEnd=" + endTime+"&;textbookRankIds="+this.textbookRankId+"&;checkingStatusIds="+this.checkingStatusIds+"&page=1&rows=9"
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("查询成功")
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(error=>{
					this.$refs.msgDialog.notify("查询失败")
				})
			}
		}
	}
</script>