<template>
<div>
    <el-collapse>
        <el-collapse-item title="开工起止时间" name="1">
            <div>
            <el-date-picker
            v-model="queryStartingTime"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>        
          <el-button type="text" :plain="true" @click="findByStartingTime">导出人事处报表</el-button>
          </div>
        </el-collapse-item>
    </el-collapse>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script>
  import moment from 'moment'
  import msgDialog from '../common/msgDialog'
  export default{
  	data(){
      return{
        queryStartingTime:'',
      }
    },
    methods:{
      findByStartingTime(){
      	var url=this.HOST + "/attendanceExportExcel?attendanceStartTime="+this.smallFormat(this.queryStartingTime[0])+"&attendanceEndTime="+this.smallFormat(this.queryStartingTime[1]);
		window.location.href = url;
      },
      smallFormat(data){
            return moment(data).format("YYYY-MM-DD")
      }
    },
    components: {
      msgDialog
    }
  }
</script>