<template>
	<div>
		<el-button-group>
			<el-button type="primary" icon="plus"></el-button>
			<el-button type="primary" icon="edit"></el-button>
			<el-button type="primary" icon="delete"></el-button>
		</el-button-group>
		<el-table 
		highlight-current-row
		:data="tableData"
		style="width:100%"
		@row-click="getCurrentRow">
			<el-table-column
				prop=""
				label="级别"
				width="180">
			</el-table-column>
		</el-table>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				tableData:[]
			}
		}
	}
</script>