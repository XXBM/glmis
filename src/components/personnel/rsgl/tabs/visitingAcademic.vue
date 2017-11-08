<template>
	<div>
		<el-row>
			<el-button-group>
				<el-button type="primary" icon="plus" @click="showAddDialog=true"></el-button>
				<el-button type="primary" icon="edit"></el-button>
				<el-button type="primary" icon="delete"></el-button>
			</el-button-group>
		</el-row>
		<el-row>
			<el-table
			:data="tableData"
			border
			highlight-current-row
			style="width:100%">
				<el-table-column
				type="selection"
				width="50"
				align="center">
				</el-table-column>
				<el-table-column
				prop="domesticOrNot.description"
				label="是否国内访学"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="program"
				label="进修名称"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="startTime"
				label="开始时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="endTime"
				label="结束时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="sponsor.description"
				label="资助机构"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="visitedOrganization"
				label="受访机构"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="supervisorName"
				label="导师姓名"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="reportTime"
				label="汇报时间"
				width="180"
				align="center">
				</el-table-column>
				<el-table-column
				prop="reviewResult.description"
				label="审核结果"
				width="180"
				align="center">
				</el-table-column>
			</el-table>
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="pageSize"
			:page-sizes="[5,10,15]"
			layout="total,sizes,prev,pager,next,jumper"
			:total="total">
			</el-pagination>
		</el-row>
		<el-row>
			<el-dialog
			title="添加"
			:visible.sync="showAddDialog"
			width="50%">
			<el-form></el-form>
			<span slot="footer">
				<el-button @click="showAddDialog=false">取消</el-button>
				<el-button type="primary" @click="showAddDialog=false">确定</el-button>
			</span>
			</el-dialog>
		</el-row>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['url'],
		watch:{
			url:function(){
				this.findVisitingAcademic()
			}
		},
		data(){
			return{
				// 用于保存表格中的所有数据
				tableData:[],
				// 当前页页码
				currentPage:1,
				// 每页的页面容量
				pageSize:5,
				// 数据总条数
				total:0,
				// 用于控制增加框是否显示
				showAddDialog:false,
				visitingAcademic:{
					domesticOrNot:'',
					program:'',
					startTime:'',
					endTime:'',
					sponsor:'',
					visitedOrganization:'',
					supervisorName:'',
					reportTime:'',
					reviewResult:''
				},

			}
		},
		methods:{
			// 获取表格显示需要的所有信息
			findVisitingAcademic(){
				var url=this.HOST + this.url + "&page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				})
			},
			// 当换页时触发本方法，将页面切换，并从后台获取数据
			handleCurrentChange(newCurrentPage){
				this.currentPage=newCurrentPage
				this.findVisitingAcademic()
			},
			// 当页容量变化时触发本方法，改变页容量，并从后台获取新数据
			handleSizeChange(newPageSize){
				this.pageSize=newPageSize
				this.findVisitingAcademic()
			}
		}
	}
</script>