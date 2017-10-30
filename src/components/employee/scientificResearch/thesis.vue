<template>
	<div>
		<el-button-group>
		  <el-button type="primary" icon="el-icon-add"></el-button>
		  <el-button type="primary" icon="el-icon-edit"></el-button>
		  <el-button type="primary" icon="el-icon-delete"></el-button>
		</el-button-group>
		<el-table
	      :data="tableData"
	      style="width: 100%">
	      <el-table-column
	        prop="date"
	        label="日期"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="姓名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="address"
	        label="地址">
	      </el-table-column>
	    </el-table>
	</div>
</template>