<!-- monograph.vue -->
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
							<el-select v-model="monographRankId" placeholder="请选择">
					    	<el-option
					      	v-for="item in monographRank"
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
			<el-table
			:data="tableData"
			border
			style="width:100%"
			@row-click="getCurrentRow"
			:highlight-current-row='true'>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column prop="author" label="负责人"></el-table-column>
				<el-table-column prop="press" label="出版社"></el-table-column>
				<el-table-column prop="publicationTime" label="出版时间"></el-table-column>
				<el-table-column prop="words" label="千字数"></el-table-column>
				<el-table-column prop="monographRank.description" label="级别"></el-table-column>
				<el-table-column prop="isbn" label="ISBN"></el-table-column>
				<el-table-column prop="seating" label="本人位次"></el-table-column>
				<el-table-column prop="numOfParticipants" label="作者人数"></el-table-column>
				<el-table-column prop="checkingStatus.state" label="审核状态"></el-table-column>
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
				// 保存显示的表格信息
				tableData:[],
				// 信息总条数
				total:0,
				// 当前页的页码
				currentPage:1,
				// 用来保存当前行的信息
				currentRow:'',
				// 查询时所用的
				// 位次
				seating:'',
				// 出版时间
				publicationTime:[],
				// 级别
				monographRankId:'',
				// 保存所有级别信息
				monographRank:[],
				// 保存所有的审核状态
				checkingStatus:[],
				// 审核状态的id
				checkingStatusIds:'',
				// 审核状态的id，用于在点击审核时进行绑定
				checkingStatusId:'',
				// 判断是否有选中的行
				monographId:'',
				// 初始时，拒绝审核对话框的显示
				showCheckingStatusDialog:false,
				objectTime:[]
			}
		},
		props:['url'],
		watch:{
			url:function(){
				this.handleCurrentChange()
			}
		},
		created(){
			var rankUrl = this.HOST + '/findAllMonographRanks'
			this.$http.get(rankUrl).then(response=>{
				this.monographRank = response.data
			}).catch(error=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
			var checkingStatusUrl = this.HOST + '/findAllScienReasCheckingStatus'
			this.$http.get(checkingStatusUrl).then(response=>{
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
				var url = this.HOST + ''
			},
			
			handleCurrentChange(){
				var monographUrl = this.HOST + this.url + "&page=1&rows=9"
				this.$http.get(monographUrl).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(error=>{
					
				})
			},
			getCurrentRow(currentRow){
				this.currentRow = currentRow
				this.checkingStatusId = this.currentRow.checkingStatus.id
				this.monographId = this.currentRow.id

			},
			// 保存修改的审核信息
			saveCheckStatus(){
				this.currentRow.checkingStatus.id = this.checkingStatusId
				var url = this.HOST + '/updateMonograph'
				this.$http.put(url,this.currentRow).then(response=>{
					this.$refs.msgDialog.notify("修改成功")
					this.handleCurrentChange()
				}).catch(error=>{
					this.$refs.msgDialog.confirm("修改失败")		
				})
				this.showCheckingStatusDialog=false
			},
			cancle(){
				this.showCheckingStatusDialog = false
				this.checkingStatusIds = ''
			},
			// 判断是否有选中的行
			checking(){
				if(this.monographId==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else{
					this.showCheckingStatusDialog=true
				}
			},
			// 查询方法
			onSubmit(){
				var startTime = this.moment(this.objectTime[0]).format('YYYY-MM-DD')
                var endTime = this.moment(this.objectTime[(this.objectTime.length)-1]).format('YYYY-MM-DD')
				var url = this.HOST + '/dispMonographSpecification?seating='+this.seating+"&;publishingStart="+startTime+"&;publishingEnd="+endTime+"&;monographRankIds="+this.monographRankId+"&;checkingStatusIds="+this.checkingStatusIds+"&page=1&rows=9"
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("查询成功")
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.notify("查询失败")
				})
			},
		}
	}
</script>