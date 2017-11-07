<template>
  <div>
    <el-row>
      <el-collapse>
        <el-collapse-item title="查询 inquiry" name="1">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="期刊级别:">
              <el-select v-model="journalRankIds" placeholder="请选择">
                <el-option
                  v-for="item in journalRanks"
                  :key="item.id"
                  :label="item.description"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收录情况:">
              <el-select v-model="citationIds" placeholder="请选择">
                <el-option
                  v-for="item in citations"
                  :key="item.id"
                  :label="item.description"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发表-年（开始）:">
              <el-input v-model="beginYear"></el-input>
            </el-form-item>
            <el-form-item label="发表-年（结束）:">
              <el-input v-model="endYear"></el-input>
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
          prop="title"
          label="题目"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="期刊名称"
        >
        </el-table-column>
        <el-table-column
          prop="journalRank.description"
          label="期刊级别"
        >
        </el-table-column>
        <el-table-column
          prop="seating"
          label="本人位次"
        >
        </el-table-column>
        <el-table-column
          prop="numOfParticipants"
          label="参加人数"
        >
        </el-table-column>
        <el-table-column
          prop="year"
          label="发表-年"
        >
        </el-table-column>
        <el-table-column
          prop="issue"
          label="发表-期"
        >
        </el-table-column>
        <el-table-column
          prop="volume"
          label="发表-卷"
        >
        </el-table-column>
        <el-table-column
          prop="startingPageNo"
          label="起始页码"
        >
        </el-table-column>
        <el-table-column
          prop="endingPageNo"
          label="结束页码"
        >
        </el-table-column>
        <el-table-column
          prop="citation.description"
          label="收录情况"
        >
        </el-table-column>
        <el-table-column
          prop="checkingStatus.state"
          label="审核状态">
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
        //查询用
        //期刊级别的id
        journalRankIds:'',
        //收录情况的id
        citationIds:'',
        //发表-年（开始）
        beginYear:'',
        //发表-年（结束）
        endYear:'',


        // 审核状态的id，用于在点击审核时进行绑定
        checkingStatusId:'',

        //保存所有的期刊级别信息
        journalRanks:[],
        //保存所有的收录情况信息
        citations:[],

        // 初始时，拒绝审核对话框的显示
        showCheckingStatusDialog:false,
        // 用于保存当前行的信息
        currentRow:'',
        // 判断是否有选中的行
        thesisId:''



      }
    },
    // 获取父组件传递来的数值
    props:['url'],
    // 用于监控，当。。。变化时，执行。。。
    watch:{
      url:function(){
        this.handleCurrentChange()
      }
    },
    created(){
      var journalRankUrl = this.HOST + "/findAllJournalRanks"
      this.$http.get(journalRankUrl).then(response=>{
        this.journalRanks = response.data
      }).catch(errors=>{
        this.$refs.msgDialog.confirm("获取失败")
      })
      var citationUrl = this.HOST + "/findAllCitation"
      this.$http.get(citationUrl).then(response=>{
        this.citations = response.data
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
        var thesisUrl = this.HOST + this.url+"&page=1&rows=9"
        this.$http.get(thesisUrl).then(response=>{
          this.tableData = response.data.rows
          this.total = response.data.total
        }).catch(errors=>{

        })
      },
      // 保存修改的审核信息
      saveCheckStatus(){
        this.currentRow.checkingStatus.id=this.checkingStatusId
        var url = this.HOST + '/updateThesis'
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
        var url = this.HOST + '/dispThesisQuerry?journalRankIds='+this.journalRankIds+"&;citationIds="+this.citationIds+"&;beginYear="+this.beginYear+"&;endYear="+this.endYear+"&page=1&rows=9"
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
        this.thesisId = this.currentRow.id
      },
      checking(){
        if(this.thesisId==''){
          this.$refs.msgDialog.confirm("请先选择一行")
        }else
          this.showCheckingStatusDialog=true
      }
    }
  }
</script>
