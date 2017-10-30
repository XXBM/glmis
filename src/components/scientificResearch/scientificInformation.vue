<template>
	<el-row :gutter="5">
		<el-col :span="7">
			<!-- 职工表格 -->
			<el-row>
				<el-table
				:data="workerData"
				style="width:100%"
				highlight-current-row
				@row-click="findProjectByWorker">
				<el-table-column
					prop="no"
					label="职工号"
					style="width:50%">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名"
					style="width:50%">
				</el-table-column>
				</el-table>
			</el-row>
			<!-- 分页 -->
			<el-row>
				<el-pagination
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage"
			      :page-size="pageSize"
			      layout="prev, pager, next"
			      :total="total">
			    </el-pagination>
			</el-row>
		</el-col>
		<!-- 引入组件，显示组件内容，该组件为右侧选项卡 -->
		<el-col :span="16">
			<material-for-worker
			:materialForWorker="currentRow"
			></material-for-worker>
		</el-col>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</el-row>
</template>
<script>
// 导入组件
import msgDialog from '../common/msgDialog'
import materialForWorker from './materialForWorker'
	export default{
		// 对当前组件用到的全局变量进行定义，初始化
		data(){
			return{
				// 用于保存所有的职工信息，职工表格的显示用
				workerData:[],
				// 当前页页码，分页用
				currentPage:1,
				// 每页显示的条数，分页用
				pageSize:9,
				// 总共的信息条数，分页用
				total:0,
				//用于保存获取的当前行，点击职工时使用
				currentRow:''
			}
		},
		// 本方法为页面加载时运行，不需调用，自动运行
		created(){
			this.handleCurrentChange();
		},
		// methods中定义所有需调用的方法
		methods:{
			// 本方法于页码改变时以及初次查询时使用
			handleCurrentChange(){
				var url = this.HOST + '/displayAllEmployeeName?page='+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.workerData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败")
				})
			},
			// 当点击某位职工时用本方法获取当前行信息的id
			findProjectByWorker(currentRow){
				this.currentRow = currentRow.id
			}
		},
		// 用于注册组件，需要先引入组件，再在这里进行注册
		components:{
			msgDialog,
			materialForWorker
		}
	}
</script>
