<template>
  <div id="app">
    <el-container>
      <el-header>家政服务平台</el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
           <el-row class="tac">
            <el-col>
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-submenu index="1">
                    <template slot="title">
                      <div  @click.prevent="current='Customer'">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">顾客管理</span>
                      </div>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1">
                        <div  @click.prevent="current='Address'">
                          <i class="el-icon-location-information"></i>
                          <span slot="title">地址管理</span>
                        </div>
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-menu-item index="2">
                    <div  @click.prevent="current='Product'">
                      <i class="el-icon-menu"></i>
                      <span slot="title">产品管理</span>
                    </div>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <div  @click.prevent="current='Category'">
                      <i class="el-icon-menu"></i>
                      <span slot="title">栏目管理</span>
                    </div>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <div  @click.prevent="current='Waiter'">
                      <i class="el-icon-user"></i>
                      <span slot="title">员工管理</span>
                    </div>
                  </el-menu-item>
                  <el-menu-item index="5">
                    <div  @click.prevent="current='Order'">
                      <i class="el-icon-postcard"></i>
                      <span slot="title">订单管理</span>
                    </div>
                  </el-menu-item>
                  <el-menu-item index="6">
                    <div  @click.prevent="current='Comment'">
                      <i class="el-icon-chat-dot-square"></i>
                      <span slot="title">评论管理</span>
                    </div>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
        </el-aside>
        <el-main>
          <component :is="current">
            alert(1)
          </component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Address from './pages/Address';
import Category from './pages/Category';
import Comment from './pages/Comment';
import Customer from './pages/Customer';
import Product from './pages/Product';
import Order from './pages/Order';
import Waiter from './pages/Waiter';

export default {
  name: 'app',
  data(){
    return{
      current:"Customer"
    }
  },
  components: {
    Customer,
    Product,
    Comment,
    Waiter,
    Category,
    Order,
    Address
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#app {
  
  text-align:left;
  color: #2c3e50;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
