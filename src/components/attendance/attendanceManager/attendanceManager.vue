<template>
	<div>
	<el-row>
		<el-col :span="7">
			<el-collapse>
				<el-collapse-item title="查询 inquiry">
					
				</el-collapse-item>
			</el-collapse>
			<el-button-group>
				<el-button icon="plus" type="primary" @click="addDialogVisible=true"></el-button>
				<el-button icon="edit" type="primary" @click="editJudge"></el-button>
				<el-button icon="delete" type="primary" @click="delJudge"></el-button>
			</el-button-group>
			<el-table 
			 :data="tableData"
			 border
			 style="width:100%"
			 highlight-current-row
			 @row-click="getCurrentRow">
			 	<el-table-column 
			 	 prop="attendanceName"
			 	 label="考勤名称"
			 	 align="center"
			 	></el-table-column>
			 	<el-table-column 
			 	 prop="attendanceManager.name"
			 	 label="考勤人"
			 	 align="center">
			 	</el-table-column>
			 </el-table>
			 <el-pagination
			 @current-change="handleCurrentChange"
			 :current-page="currentPage"
			 :page-size="pageSize"
			 layout="prev,pager,next"
			 :total="total"></el-pagination>
			 <el-dialog 
			 title="添加"
			 :visible.sync="addDialogVisible"
			 width="60%">
			 	<el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
			 		<el-form-item label="考勤时间" prop="attendanceTime">
			 			<el-date-picker
					      v-model="addForm.attendanceTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
			 		</el-form-item>
			 		<el-form-item label="考勤名称" prop="attendanceName">
			 			<el-input v-model="addForm.attendanceName"></el-input>
			 		</el-form-item>
			 	</el-form>
			 	<span slot="footer">
			 		<el-button @click="cancelAdd">取消</el-button>
			 		<el-button @click="saveAdd('addForm')" type="primary">确认</el-button>
			 	</span>
			 </el-dialog>
			 <el-dialog 
			 title="修改"
			 :visible.sync="editDialogVisible"
			 width="60%">
			 	<el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
			 		<el-form-item label="考勤时间" prop="attendanceTime">
			 			<el-date-picker
					      v-model="editForm.attendanceTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
			 		</el-form-item>
			 		<el-form-item label="考勤名称" prop="attendanceName">
			 			<el-input v-model="editForm.attendanceName"></el-input>
			 		</el-form-item>
			 	</el-form>
			 	<span slot="footer">
			 		<el-button @click="cancelEdit">取消</el-button>
			 		<el-button @click="saveEdit('editForm')" type="primary">确认</el-button>
			 	</span>
			 </el-dialog>
			 <el-dialog 
			 title="删除"
			 :visible.sync="delDialogVisible"
			 width="40%">
			 <span>您确定要删除{{currentRow.attendanceName}}吗？</span>
			 	<span slot="footer">
			 		<el-button @click="delDialogVisible=false">取消</el-button>
			 		<el-button @click="delThis" type="primary">删除</el-button>
			 	</span>
			 </el-dialog>
		</el-col>
		<el-col :span="15">
			<el-tabs type="card">
				<el-tab-pane label="候选人">
					<candidate :candidateUrl="candidateUrl" :summaryId="currentRow.id"></candidate>
				</el-tab-pane>
				<el-tab-pane label="出勤" name="presence">
					<presence :presenceUrl="presenceUrl" :id="currentRow.id"></presence>
				</el-tab-pane>
				<el-tab-pane label="公假" name="businessLeave">
					<business-leave :businessLeaveUrl="businessLeaveUrl" :id="currentRow.id"></business-leave>
				</el-tab-pane>
				<el-tab-pane label="旷工" name="neglectWork">
					<neglect-work :neglectWorkUrl="neglectWorkUrl" :id="currentRow.id"></neglect-work>
				</el-tab-pane>
				<el-tab-pane label="事假" name="privateLeave">
					<private-leave :privateLeaveUrl="privateLeaveUrl" :id="currentRow.id"></private-leave>
				</el-tab-pane>
				<el-tab-pane label="学校缺勤" name="universityAbsence">
					<university-absence :universityAbsenceUrl="universityAbsenceUrl" :id="currentRow.id"></university-absence>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
	<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
//导入信息提示的组件
import msgDialog from '../../common/msgDialog'
//导入候选人的组件
import candidate from './candidate'
//导入出勤的组件
import presence from './presence'
//导入公假组件
import businessLeave from './businessLeave'
//导入旷工组件
import neglectWork from './neglectWork'
//导入事假组件
import privateLeave from './privateLeave'
//导入学校缺勤组件
import universityAbsence from './universityAbsence'
	export default{
		data(){
			return{
				//用来保存表格中需要显示的所有数据
				tableData:[],
				//当前页
				currentPage:1,
				//每页的容量
				pageSize:8,
				//数据总数
				total:0,
				//用来控制添加对话框的显示
				addDialogVisible:false,
				//用来控制修改对话框的显示
				editDialogVisible:false,
				//用来控制删除对话框的显示
				delDialogVisible:false,
				//暂存添加的表单
				addForm:{
					//考勤时间
					attendanceTime:'',
					//考勤名称
					attendanceName:''
				},
				//暂存修改的表单
				editForm:{
					//考勤时间
					attendanceTime:'',
					//考勤名称
					attendanceName:''
				},
				//暂存当前行信息
				currentRow:'',
				//定义规则
				rules:{
					attendanceTime:[
					{required:true,type:'date',message:'必填项',trigger:'blur'&'change'}
					],
					attendanceName:[
					{required:true,message:'必填项',trigger:'blur'&'change'}
					]
				},
				//暂存候选人地址
				candidateUrl:'',
				//暂存出勤的访问地址
				presenceUrl:'',
				//暂存公假地址
				businessLeaveUrl:'',
				//暂存旷工地址
				neglectWorkUrl:'',
				//暂存事假地址
				privateLeaveUrl:'',
				//暂存学校缺勤地址
				universityAbsenceUrl:''

			}
		},
		created(){
			this.findAttendance()
		},
		methods:{
			//查询到所有考勤人的信息
			findAttendance(){
				var url = this.HOST + "/displayAllAttendanceSummary?page="+this.currentPage+"&rows="+this.pageSize
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取所有考勤人信息失败")
				})
			},
			//当前页页码改变时触发本方法
			handleCurrentChange(newPage){
				this.currentPage=newPage
				this.findAttendance()
			},
			//点击某行候选人时，获取当前行的信息
			getCurrentRow(currentRow){
				this.currentRow=currentRow


				this.candidateUrl=this.HOST + "/displayEmpBySum?id="+currentRow.id
				this.presenceUrl=this.HOST + "/displayPresenceBySummary?id="+currentRow.id
				this.businessLeaveUrl=this.HOST + "/displayBusinessLeaveBySummary?id="+currentRow.id
				this.neglectWorkUrl=this.HOST + "/displayNeglectWorkBySummary?id="+this.currentRow.id
				this.privateLeaveUrl=this.HOST + "/displayPrivateLeaveBySummary?id="+currentRow.id
				this.universityAbsenceUrl=this.HOST + "/displayUniversityAbsenceBySummary?id="+currentRow.id
			},
			//在增加框中点取消，触发本方法
			cancelAdd(){
				//关闭增加对话框
				this.addDialogVisible=false
				//将增加表单格式化
				this.addForm={}
			},
			//在增加对话框里点击保存时触发本方法
			saveAdd(addForm){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.addForm.attendanceTime=this.moment(this.addForm.attendanceTime).format('YYYY-MM-DD')
						var url = this.HOST + '/addAttendanceSummary'
						this.$http.post(url,this.addForm).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.findAttendance()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("添加失败")
						})
						this.addDialogVisible=false
						this.addForm={}
					}
				})
			},
			//点击修改时进行判断是否可以进行修改
			editJudge(){
				if(this.currentRow!=''){
					this.editForm.attendanceName=this.currentRow.attendanceName
					this.editForm.attendanceTime=this.currentRow.attendanceTime
					this.editDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm('请先选择一行进行修改')
				}
			},
			//点击修改框中的保存时触发本方法
			saveEdit(editForm){
				//判断用户是否进行了日期的重新选择，若没选，则需要先将日期格式化为date
				if(this.editForm.attendanceTime==this.currentRow.attendanceTime){
					this.editForm.attendanceTime=new Date(this.editForm.attendanceTime)
				}
				this.$refs.editForm.validate((valid)=>{
					if(valid){
						//提交时日期要提交字符串格式，所以验证后要重新进行格式化
						this.currentRow.attendanceTime=this.moment(this.editForm.attendanceTime).format("YYYY-MM-DD")
						this.currentRow.attendanceName=this.editForm.attendanceName
						//定义一个url变量， 用于保存保存修改时需要访问的地址
						var url = this.HOST + "/updateAttendanceSummary"
						this.$http.put(url,this.currentRow).then(response=>{
							//成功后进行消息提示
							this.$refs.msgDialog.notify("修改成功")
						}).catch(errors=>{
							//提示访问失败
							this.$refs.msgDialog.confirm("修改失败")
						})
						this.editDialogVisible=false
					}
				})
			},
			//在修改框中点击取消时触发本方法
			cancelEdit(){
				this.editDialogVisible=false
			},
			//点击删除时进行判断
			delJudge(){
				if(this.currentRow!=''){
					this.delDialogVisible=true
				}else{
					this.$refs.msgDialog.confirm("请选择一行继续删除")
				}
			},
			//确认删除时进行删除
			delThis(){
				var url = this.HOST + "/deleteAttendanceSummary?id="+this.currentRow.id
				this.$http.delete(url).then(response=>{
					this.$refs.msgDialog.notify("删除成功")
					this.findAttendance()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("删除失败")
				})
				this.delDialogVisible=false
			}
		},
		components:{
			//注册信息提示组件
			msgDialog,
			//注册候选人组件
			candidate,
			//注册出勤组件
			presence,
			//注册公假组件
			businessLeave,
			//注册旷工组件
			neglectWork,
			//注册事假组件
			privateLeave,
			//注册学校缺勤组件
			universityAbsence

		}
	}
</script>