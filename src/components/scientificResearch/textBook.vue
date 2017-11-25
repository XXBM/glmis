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
					    	<el-button type="primary" @click="assignment">查询</el-button>
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
		  @size-change="handleSizeChange"
	      @current-change="changeCurrentPage"
	      :current-page.sync="currentPage"
	      :page-size="pageSize"
	      :page-sizes="[5,10,15]"
	      layout="total,sizes, prev, pager, next,jumper"
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
				// 保存获取的表格中的数据
				tableData:[],
				total:0,
				// 当前页的页码
				currentPage:1,
				// 默认显示当前页的页面容量
				pageSize:5,
				// 位次
				seating:'',
				// 出版时间
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
				// 初始时，不显示审核对话框
				showCheckingStatusDialog:false,
				// 换页时判断是在查询条件下还是所有信息的条件下
				inquiry:false,
				// 格式化后的开始时间
				startTime:'',
				// 格式化后的结束时间
				endTime:''
			}
			
		},
		//接收父组件传来的值
		props:['url'],
		// 用于监控
		watch:{
			url:function(){
				this.findProject()
			}
		},
		// 在页面加载时执行
		created(){
			// 创建变量textbookRankUrl，存放获取级别信息的URL
			var textbookRankUrl = this.HOST + "/findAllTextbookRanks"
			// 获取所有的级别信息
			this.$http.get(textbookRankUrl).then(response=>{
				// 将从后台获取的级别信息赋值给前台变量textbookRanks
				this.textbookRanks = response.data
			}).catch(error=>{
				// 若没有获取成功，则提示获取失败
				this.$refs.msgDialog.confirm("获取失败")
			})
			// 创建变量checkingStatuUrl，存放获取审核状态信息的URL
			var checkingStatuUrl = this.HOST +"/findAllScienReasCheckingStatus"
			this.$http.get(checkingStatuUrl).then(response=>{
				// 将从后台获取的审核状态信息赋值给前台变量checkingStatus
				this.checkingStatus = response.data
			}).catch(error=>{
				// 若没有获取成功，则提示获取失败
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
		// 注册组件
		components:{
			msgDialog
		},
		methods:{
		// 当切换页面时执行changeCurrentPage方法，把将要切换到的页面赋值给当前页
			changeCurrentPage(current){
				this.currentPage=current
				// 判断，如果是在查询状态下执行onSubmit
				if(this.inquiry){
					this.onSubmit()
				}else{
					this.findProject()
				}
			},
			// 改变页面的容量时执行的方法
			handleSizeChange(currentSize){
				this.pageSize=currentSize
				if(this.inquiry){
					this.onSubmit()
				}else{
					this.findProject()
				}
			},
			// 获取所有的项目信息
			findProject(){
				// 定义变量存放获取项目信息的url
				var textbookUrl = this.HOST + this.url + "&page="+this.currentPage+"&rows="+this.pageSize
				// 访问后台，获取所有的页面信息
				this.$http.get(textbookUrl).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(error=>{
					// 若没有获取成功，则提示获取失败
					this.$refs.msgDialog.confirm("获取失败")
				})
			},
			// 获取当前行的信息
			getCurrentRow(currentRow){
				this.currentRow = currentRow
				this.checkingStatusId = this.currentRow.checkingStatus.id

			},
			// 点击审核时触发的方法，判断是否可以进行审核
			checking(){
				if(this.currentRow==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else{
					this.showCheckingStatusDialog=true
				}
			},
			// 保存修改的审核信息
			saveCheckStatus(){
				// 将选择的审核状态的id赋值给当前行的审核状态的id
				this.currentRow.checkingStatus.id=this.checkingStatusId
				// 定义变量用来存放修改当前行信息的地址
				var url = this.HOST + "/updateTextbook"
				// 访问后台，并将当前行的所有信息作为对象传给后台
				this.$http.put(url,this.currentRow).then(response=>{
					this.$refs.msgDialog.notify("修改成功")
					this.findProject()
				}).catch(error=>{
					this.$refs.msgDialog.confirm("修改失败")
				})
				this.showCheckingStatusDialog = false
			},
			// 当点击取消时执行本方法，关闭对话框,并给审核框恢复原来的数据
			cancle(){
				this.showCheckingStatusDialog = false
				this.checkingStatusIds = ''
			},
			// 当点击查询时执行本方法，将当前状态切换为查询状态，若选择时间，则对时间进行格式化
			assignment(){
				this.currentPage=1
				this.inquiry=true
				if(this.publicationTime!=''){
					this.startTime = this.moment(this.publicationTime[0]).format('YYYY-MM-DD')
	                this.endTime = this.moment(this.publicationTime[(this.publicationTime.length)-1]).format('YYYY-MM-DD')
                }
                this.onSubmit()
                
			},
			// 查询
			onSubmit(){
				// 定义变量，保存查询信息的url
				var url = this.HOST + '/dispBooksSpecification?seating='+this.seating + "&;publishingStart=" + this.startTime + "&;publishingEnd=" + this.endTime+"&;textbookRankIds="+this.textbookRankId+"&;checkingStatusIds="+this.checkingStatusIds+"&page="+this.currentPage+"&rows="+this.pageSize
				// 访问后台，获取查询的信息
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