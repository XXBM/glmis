<template>
    <div id="navBar">
      <el-menu unique-opened router v-show="!collapsed">
            <!--动态路由到子组件 将不可见的路径隐藏-->
          <template v-for="(item,index) in menuData">
    
            <el-submenu :index="index+''">
              <!--用el ui 的title进行solt分发菜单-->
              <template slot="title"><i :class="item.icon"></i>{{item.text}}</template>
                <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->
                    <el-submenu v-for="child in item.children" :key="child.url" :index="child.id">
                      <!--用el ui 的title进行solt分发菜单-->
                      <template slot="title"><i :class="child.icon"></i>{{child.text}}</template>
                        <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->

                        <el-menu-item v-for="yes in child.children" :index="yes.url" :key="yes.url"><i :class="yes.icon"></i>{{yes.text}}</el-menu-item>
                    </el-submenu>
            </el-submenu>
          </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    created(){
        var url = this.HOST + "/menu"
        this.$http.get(url).then(response=>{
            this.menuData = response.data
        }).catch(error=>{
            alert("failed")
        })
    },
    methods: {
        //Default methods for the navBar
        //TODO remove them and add $http function to require the menu from server
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    //TODO include a update property here for update the menu when the data was updated
    data: function() {
        return {
            //menu data for showing in the nav bar
            //TODO should be linked to the navBar content after the update methods was built
            naiveMenu: '',
            menuData:[],
            secondClassMenu: [],
            thirdClassMenu:[],

            //determine the menu type
            menuController: false
        }
    },
}
</script>
<style>
    
</style>