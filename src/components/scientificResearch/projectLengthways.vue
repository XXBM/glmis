<template>
	<!-- 纵向 -->
	<div>
		<el-row>
			<!-- 下拉面板，用来存放查询的条目 -->
  			<el-collapse>
			  <el-collapse-item title="查询 inquiry" name="1">
			  	<el-form :inline="true" class="demo-form-inline">
				  <el-form-item label="经费:">
				    <el-input v-model="expenditure"></el-input>
				  </el-form-item>
				  <el-form-item label="立项时间">
				    <el-date-picker
				      v-model="objectTime"
				      type="daterange"
				      placeholder="选择日期范围">
				    </el-date-picker>
				  </el-form-item>
				  <el-form-item label="级别:">
				    <el-select v-model="projectRankIds" placeholder="请选择">
					    <el-option
					      v-for="item in projectRanks"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="审核状态:">
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
		    border
		    style="width: 100%"
		    @row-click="getCurrentRow"
		    :highlight-current-row='true'>
		    <el-table-column
		      prop="projectFundedByPrivateSectorRank.description"
		      label="级别"
		      align="center"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="名称"
		      align="center"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="no"
		      label="编号"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="resource"
		      label="来源"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="leader"
		      label="项目负责人"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="sponsor"
		      label="批准部门"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="开始时间"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="结束时间"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="expenditure"
		      label="经费(万)"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="seating"
		      label="本人位次"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="numOfParticipants"
		      label="参加人数"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="checkingStatus.state"
		      label="状态"
		      align="center">
		    </el-table-column>
		  </el-table>
		  <el-pagination
		  	  @size-change="handleSizeChange"
		      @current-change="changeCurrentPage"
		      :current-page="currentPage"
		      :page-size="pageSize"
		      :page-sizes="[5,10,15]"
		      layout="total,sizes, prev, pager, next, jumper"
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
				// 保存需显示的项目信息
				tableData:[],
				// 信息总条数，分页用
				total:0,
				// 当前页页码，分页用
				currentPage:1,
				// 当前页页面容量
				pageSize:5,
				
				//查询用
				// 经费
				expenditure:'',
				// 查询时间
				objectTime:[],
				// 级别的id
				projectRankIds:'',
				// 审核状态的id
				checkingStatusIds:'',
				// 审核状态的id，用于在点击审核时进行绑定
				checkingStatusId:'',
				// 保存所有的等级信息
				projectRanks:[],
				// 用于保存所有的审核状态信息
				checkingStatus:[],
				// 初始时，拒绝审核对话框的显示
				showCheckingStatusDialog:false,
				// 用于保存当前行的信息,和判断是否有选择行
				currentRow:'',
				// 用来在换页时判断是在查询信息的状态下还是所有信息的状态下
				inquiry:false,
				// 用来保存格式化后的开始时间
				startTime:'',
				// 用来保存格式化后的结束时间
				endTime:''



			}
		},
		// 获取父组件传递来的数值，该数值为访问后台的url(带id)
		props:['url'],
		// 用于监控，当。。。变化时，执行。。。
		watch:{
			url:function(){
				this.findProject()
			}
		},
		// 页面加载时执行
		created(){
			// 新建变量，用来存放获取等级信息的url
			var rankUrl = this.HOST + "/findAllProjectFundedByPrivateSectorRanks"
			// 访问后台，获取所有的等级信息
			this.$http.get(rankUrl).then(response=>{
				// 将后台返回的等级信息赋值给前台变量
				this.projectRanks = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
			// 新建变量，用来存放获取审核状态的url
			var checkingStatusUrl = this.HOST + "/findAllScienReasCheckingStatus"
			// 访问后台，获取所有的审核状态信息
			this.$http.get(checkingStatusUrl).then(response=>{
				// 将后台返回的审核状态信息赋值给前台变量
				this.checkingStatus = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
		},
		// 注册组件
		components:{
			msgDialog
		},
		// 定义方法
		methods:{
			// 定义页面切换时触发的方法，当页面切换时触发该方法，先将改变后的页面变为当前页，然后进行判断，若是查询状态下，则先让当前页为1，再进行查询，否则正常查询
			changeCurrentPage(current){
				this.currentPage=current
				if(this.inquiry){
					this.onSubmit()
				}else
					this.findProject()
			},
			// 获取所有的项目信息
			findProject(){
				// 定义url用来存放获取所有项目信息的地址
				var projectUrl = this.HOST + this.url+"&page="+this.currentPage+"&rows="+this.pageSize
				// 访问后台，获取所有的项目信息
				this.$http.get(projectUrl).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败")
				})
			},
			// 保存修改的审核信息
			saveCheckStatus(){
				// 令当前行中的审核状态的id为选择的审核状态的id
				this.currentRow.checkingStatus.id=this.checkingStatusId
				// 定义变量用来存放修改当前行信息的地址
				var url = this.HOST + '/updateProjectFundedByGovernment'
				// 访问后台，并将当前行的所有信息作为对象传给后台
				this.$http.put(url,this.currentRow).then(response=>{
					this.$refs.msgDialog.notify("修改成功")
					this.findProject()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("修改失败")
				})
				this.showCheckingStatusDialog = false

			},
			// 当点击取消时执行本方法，关闭对话框,并给审核框恢复原来的数据
			cancle(){
				this.showCheckingStatusDialog = false
				this.checkingStatusId=this.currentRow.checkingStatus.id
			},
			handleSizeChange(currentSize){
				this.currentPage=1
				this.pageSize=currentSize
				if(this.inquiry){
					this.onSubmit()
				}else{
					this.findProject()
				}

			},
			// 当点击查询时执行本方法，将当前状态切换为查询状态，若选择时间，则对时间进行格式化
			assignment(){
				this.currentPage=1
				this.inquiry=true
				if(this.objectTime!=''){
					this.startTime = this.moment(this.objectTime[0]).format('YYYY-MM-DD')
	                this.endTime = this.moment(this.objectTime[(this.objectTime.length)-1]).format('YYYY-MM-DD')
                }
                var url = this.HOST + '/dispProjectFundedByGovernmentSpecification?expenditure='+this.expenditure+"&;startTime="+this.startTime+"&;endTime="+this.endTime+"&;projectRankIds="+this.projectRankIds+"&;checkingStatusIds="+this.checkingStatusIds+"&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("查询成功")
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
			},
			// 翻页时的查询方法
			onSubmit(){
				var url = this.HOST + '/dispProjectFundedByGovernmentSpecification?expenditure='+this.expenditure+"&;startTime="+this.startTime+"&;endTime="+this.endTime+"&;projectRankIds="+this.projectRankIds+"&;checkingStatusIds="+this.checkingStatusIds+"&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("查询成功")
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
			},
			// 获取当前行
			getCurrentRow(currentRow){
				this.currentRow = currentRow
				this.checkingStatusId=this.currentRow.checkingStatus.id
			},
			// 点击审核触发该方法，进行判断是否可以进行审核
			checking(){
				if(this.currentRow==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else
					this.showCheckingStatusDialog=true
			}
		}
	}
</script>