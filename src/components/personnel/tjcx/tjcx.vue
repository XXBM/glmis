<template>
	<div>
        <el-row>
  			<el-collapse>
			  <el-collapse-item title="查询条件" name="1">
			  	<el-form :inline="true" class="demo-form-inline" v-model="conditionForm">
			  	  <el-form-item>
				    <label>出生年月：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-date-picker
				      v-model="bornDate"
				      type="daterange"
				      placeholder="选择日期范围">
				    </el-date-picker>
				  </el-form-item>
				  <el-form-item>
				    <label>性别：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.sex" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in sexes"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>民族：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.nation" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in nations"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>部门：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.department" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in departments"
					      :key="item.id"
					      :label="item.departmentName"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>是否华侨：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.overseasChineseOrNot" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in overseasChineseOrNots"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>政治面貌：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.politicalParty" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in politicalParties"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>学位：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.academicDegree" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in academicDegrees"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>职称：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.professionalTitle" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in professionalTitles"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>执业资格：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.practisingCertification" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in practisingCertifications "
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>是否国内访学：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.domesticOrNot" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in domesticOrNots"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>学术会议：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.academicConference" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in academicConferences"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				    <label>访问学者资助：</label>
				  </el-form-item>
				  <el-form-item>
				    <el-select v-model="conditionForm.sponsor" placeholder="请选择" multiple>
					    <el-option
					      v-for="item in sponsors"
					      :key="item.id"
					      :label="item.description"
					      :value="item.id">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
				  	<el-date-picker
			            v-model="conditionForm.endDate"
			            align="right"
			      		type="date"
			      		format="yyyy-MM-dd"
			      		placeholder="选择日期">
		          	</el-date-picker>
				  </el-form-item>
				  
				  <el-form-item>
				    <el-button type="primary" @click="query">查询</el-button>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="exportFile">导出</el-button>
				  </el-form-item>
				</el-form>
			  </el-collapse-item>
			</el-collapse>
		</el-row>
		<el-row>
			<el-table
		    :data="tableData"
		    border
		    style="width: 100%"
		    highlight-current-row>
		    <el-table-column
		      prop="no"
		      label="职工号"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      >
		    </el-table-column>
		  </el-table>
		  <el-pagination
	          @size-change="handleSizeChange"
	          @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-sizes="[5, 10, 15, 20]"
	          :page-size="pageSize"
	          layout="total, sizes, prev, pager, next, jumper"
	          :total="totalNum">
          </el-pagination>
		</el-row>
		<msg-dialog ref='msgDialog'></msg-dialog>
	</div>
</template>
<script>
import msgDialog from '../../common/msgDialog'
	export default{
		data(){
			return{
				// 保存需显示的项目信息
				tableData:[],

				//分页
				totalNum:0,
				currentPage:1,
				pageSize:5,

				bornDate:'',
				
				//查询条件
				conditionForm:{
					startBirth:'',
					endBirth:'',
					sexe:'',
					nation:'',
					department:'',
					sponsor:'',
					academicConference:'',
					politicalPartie:'',
					academicDegree:'',
					professionalTitle:'',
					practisingCertification:'',
					domesticOrNot:'',
					overseasChineseOrNot:'',
					endDate:''
				},
				sexes:[],
				nations:[],
				departments:[],
				sponsors:[],
				academicConferences:[{
			          id: 1,
			          description: '已汇报'
			          }, {
			          id: 2,
			          description: '未汇报'
			    }],
				politicalParties:[],
				academicDegrees:[],
				professionalTitles:[],
				practisingCertifications:[],
				domesticOrNots:[],
				overseasChineseOrNots:[],


			}
		},
		// 用于监控，当。。。变化时，执行。。。
		watch:{
			
		},
		created(){
			this.getSex()
			this.getNation()
			this.getDepartment()
			this.getSponsor()
			this.getPoliticalParty()
			this.getAcademicDegree()
			this.getProfessionalTitle()
			this.getPractisingCertification()
			this.getDomesticOrNot()
			this.getOverseasChineseOrNot()
		},
		components:{
			msgDialog
		},
		methods:{
			exportFile(){
				window.location.href = this.HOST+'/exportExcel';
			},
			query(){
				this.startBirth = this.moment(this.bornDate[0]).format('YYYY-MM-DD')
                this.endBirth = this.moment(this.bornDate[(this.bornDate.length)-1]).format('YYYY-MM-DD')

                console.log(JSON.stringify(this.conditionForm))
                this.$http.post(this.HOST + "/searchEmployeeBySpecification?page=1&rows=9",this.conditionForm).then(response=>{
                	this.totalNum = response.data.total
		        	this.tableData = response.data.rows
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
			},
			//分页
			handleSizeChange(newPageSize){
		        this.pageSize=newPageSize;
		        this.query();
		    },
		    handleCurrentChange(newPage){
		        this.currentPage = newPage;
		        this.query();
		    },
			//下拉框初始化
			getSex(){
		        this.$http.get(this.HOST + "/findAllSex").then(response=>{
		        	this.sexes = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		    },
		    getNation(){
		      	this.$http.get(this.HOST + "/findAllNation").then(response=>{
		        	this.nations = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		    },
		    getDepartment(){
		    	this.$http.get(this.HOST + "/findAllDepartment").then(response=>{
		        	this.departments = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getOverseasChineseOrNot(){
		    	this.$http.get(this.HOST + "/findAllYesOrNo").then(response=>{
		        	this.overseasChineseOrNots = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getPoliticalParty(){
		    	this.$http.get(this.HOST + "/findAllPoliticalParties").then(response=>{
		        	this.politicalParties = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getAcademicDegree(){
		    	this.$http.get(this.HOST + "/findAllAcademicDegrees").then(response=>{
		        	this.academicDegrees = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getProfessionalTitle(){
		    	this.$http.get(this.HOST + "/findAllPostNames").then(response=>{
		        	this.professionalTitles = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getPractisingCertification(){
		    	this.$http.get(this.HOST + "/findAllQualificationName").then(response=>{
		        	this.practisingCertifications = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getDomesticOrNot(){
		    	this.$http.get(this.HOST + "/findAllYesOrNo").then(response=>{
		        	this.domesticOrNots = response.data
		        }).catch(errors=>{
		        	this.$refs.msgDialog.confirm("获取失败")
		        })   
		        
		    },
		    getSponsor(){
		    	this.$http.get(this.HOST + "/findAllFundOrganization").then(response=>{
		        	this.sponsors = response.data
			    }).catch(errors=>{
			        this.$refs.msgDialog.confirm("获取失败")
			    })   
		        
		    }
			
			
		}
	}
</script>

