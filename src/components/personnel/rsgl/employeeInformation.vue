<template>
	<el-row>
		<el-col span="7">
			<el-form>
				<el-form-item label="请选择部门">
					<el-select v-model="departmentId">
						<el-option
						v-for="item in departments"
						:key="item.id"
						:label="item.departmentName"
						:value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-table
			:data="tableData"
			style="width:100%"
			@row-click="currentRow">
				<el-table-column
				prop="no"
				label="职工号"
				width="151">
				</el-table-column>
				<el-table-column
				prop="name"
				label="姓名"
				width="155">
				</el-table-column>
			</el-table>
			<el-pagination
			layout="prev,pager,next"
			@current-change="handleCurrentChange"
			:page-size="pageSize"
			:total="total"
			:current-page="currentPage"></el-pagination>
		</el-col>
		<el-col span="17">
			<el-tabs type="card" @tab-click="handleClick">
				<el-tab-pane label="个人信息" name="personneInformation">
					个人信息
				</el-tab-pane>
				<el-tab-pane label="学位" name="degree">
					学位
				</el-tab-pane>
				<el-tab-pane label="职称记录" name="employeeAssProfessionalTitles">
					职称记录
				</el-tab-pane>
				<el-tab-pane label="学历" name="educationalBackground">
					学历
				</el-tab-pane>
				<el-tab-pane label="执业资格" name="practicingRequirements ">
					执业资格
				</el-tab-pane>
				<el-tab-pane label="奖励记录" name="reward">
					奖励记录
				</el-tab-pane>
				<el-tab-pane label="校内工作经历" name="experienceInCampus">
					校内工作经历
				</el-tab-pane>
				<el-tab-pane label="职位变更" name="jobChange">
					职位变更
				</el-tab-pane>
				<el-tab-pane label="学术会议" name="degreeMeeting">
					学术会议
				</el-tab-pane>
				<el-tab-pane label="国内外访学记录" name="visitingAcademics">
					<visiting-academic :url="visitingAcademicsUrl"></visiting-academic>
				</el-tab-pane>
				<el-tab-pane label="来校前工作经历" name="previousWorkExperiences">
					来校前工作经历
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>
<script type="text/javascript">
import visitingAcademic from './tabs/visitingAcademic'
	export default{
		data(){
			return{
				//所有部门
				departments:[],
				// 当前页
				currentPage:1,
				// 每页的容量
				pageSize:9,
				// 总数
				total:"",
				//职工信息
				tableData:[],
				departmentId:"",
				// url
				// 个人信息
				personneInformationUrl:'',
				// 学位
				degreeUrl:'',
				// 职称记录
				employeeAssProfessionalTitlesUrl:'',
				// 学历
				educationalBackgroundUrl:'',
				// 执业资格
				practicingRequirementsUrl:'',
				// 奖励记录
				rewardUrl:'',
				// 校内工作经历
				experienceInCampusUrl:'',
				// 职位变更
				jobChangeUrl:'',
				// 学术会议
				degreeMeetingUrl:'',
				// 国内外访学记录
				visitingAcademicsUrl:'',
				// 来校前工作经历
				previousWorkExperiencesUrl:''








			}
		},
		created(){
			var url = this.HOST + "/findAllDepartment"
			this.$http.get(url).then(response=>{
				this.departments=response.data
			})
			this.findAllEmployees()
		},
		methods:{
			findAllEmployees(){
				var url = this.HOST + "/displayAllEmployeeName?page="+this.currentPage+"&rows=9"
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				})
			},
			handleCurrentChange(currentPage){
				this.currentPage=currentPage
				this.findAllEmployees()
			},
			currentRow(currentRow){
				this.personneInformationUrl=""
				this.degreeUrl=""
				this.employeeAssProfessionalTitlesUrl=""
				this.educationalBackgroundUrl=""
				this.practicingRequirementsUrl=""
				this.rewardUrl=""
				this.experienceInCampusUrl=""
				this.jobChangeUrl=""
				this.degreeMeetingUrl=""
				this.visitingAcademicsUrl="/displayStuByEmp?id="+currentRow.id
				this.previousWorkExperiencesUrl=""
			}
		},
		watch:{
			departmentId:function(departmentId){
				var url = this.HOST + "/displayEmpByDep?id="+departmentId+"&page="+this.currentPage+"&rows=9"
				this.$http.get(url).then(response=>{
					this.tableData=response.data.rows
					this.total=response.data.total
				})
			},
		},
		components:{
			visitingAcademic,
		}
		
	}
</script>