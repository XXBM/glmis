<template>
	<div>
		<el-row>
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
		    style="width: 100%"
		    @row-click="getCurrentRow"
		    :highlight-current-row='true'>
		    <el-table-column
		      prop="projectFundedByGovernmentRank.description"
		      label="级别"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="no"
		      label="编号">
		    </el-table-column>
		    <el-table-column
		      prop="resource"
		      label="来源">
		    </el-table-column>
		    <el-table-column
		      prop="leader"
		      label="项目负责人">
		    </el-table-column>
		    <el-table-column
		      prop="sponsor"
		      label="批准部门">
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="开始时间">
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="结束时间">
		    </el-table-column>
		    <el-table-column
		      prop="expenditure"
		      label="经费(万)">
		    </el-table-column>
		    <el-table-column
		      prop="seating"
		      label="本人位次">
		    </el-table-column>
		    <el-table-column
		      prop="numOfParticipants"
		      label="参加人数">
		    </el-table-column>
		    <el-table-column
		      prop="checkingStatus.state"
		      label="状态">
		    </el-table-column>
		  </el-table>
		  <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="9"
		      layout="total, prev, pager, next, jumper"
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
				// 用于保存当前行的信息
				currentRow:''



			}
		},
		// 获取父组件传递来的数值
		props:['url','workerId'],
		// 用于监控，当。。。变化时，执行。。。
		watch:{
			url:function(){
				this.handleCurrentChange()
			}
		},
		created(){
			var rankUrl = this.HOST + "/findAllRank"
			this.$http.get(rankUrl).then(response=>{
				this.projectRanks = response.data
			}).catch(errors=>{
				this.$refs.msgDialog.confirm("获取失败")
			})
			var checkingStatusUrl = this.HOST + "/findAllScienReasCheckingStatus"
			this.$http.get(checkingStatusUrl).then(response=>{
				this.checkingStatus = response.data
			}).catch(errors=>{
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
				var projectUrl = this.HOST + this.url+"&page=1&rows=9"
				this.$http.get(projectUrl).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					
				})
			},
			// 保存修改的审核信息
			saveCheckStatus(){
				this.currentRow.checkingStatus.id=this.checkingStatusId
				var url = this.HOST + '/updateProjectFundedByGovernment'
				this.$http.put(url,this.currentRow).then(response=>{
					this.$refs.msgDialog.notify("修改成功")
					this.handleCurrentChange()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("修改失败")
				})
				this.showCheckingStatusDialog = false

			},
			cancle(){
				this.showCheckingStatusDialog = false
				this.checkingStatusIds = ''
			},
			// 查询方法
			onSubmit(){
				var startTime = this.moment(this.objectTime[0]).format('YYYY-MM-DD')
                var endTime = this.moment(this.objectTime[(this.objectTime.length)-1]).format('YYYY-MM-DD')
				var url = this.HOST + '/dispProjectFundedByGovernmentSpecification?expenditure='+this.expenditure+"&;startTime="+startTime+"&;endTime="+endTime+"&;projectRankIds="+this.projectRankIds+"&;checkingStatusIds="+this.checkingStatusIds+"&page=1&rows=9"
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("查询成功")
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("查询失败")
				})
			},
			getCurrentRow(currentRow){
				this.currentRow = currentRow
				this.checkingStatusId=this.currentRow.checkingStatus.id
			},
			checking(){
				if(this.workerId==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else
					this.showCheckingStatusDialog=true
			}
		}
	}
</script>