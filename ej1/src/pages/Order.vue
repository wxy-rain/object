<template>
    <div id="order">
        <h2>{{name}}</h2>
        <el-button class="batch" type="danger" @click="batchHandler" size="small">批量删除</el-button>
        <form v-on:submit.prevent="submitHandler">
            标题 <input type="text" v-model="order.title" />
            订单 <input type="text" v-model="order.orderTime"/>
            状态 <input type="text" v-model="order.status"/>
            <input type="submit" value="提交">
        </form>
        <el-table :data="list" class="tal">
            <el-table-column prop="id" label="#" @click.prevent="checkHandler">
                <el-checkbox v-model="checked" ></el-checkbox>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="orderTime" label="订单时间"></el-table-column>
            <el-table-column prop="remark" label="标记"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <a href="" @click.prevent="deleteHandler(scope.row.id)">
                        <i class="el-icon-delete btn"></i>
                    </a>   
                    <a href="" @click.prevent="updateHandler(scope.row)">
                        <i class="el-icon-edit upd"></i>
                    </a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
// axios配置
axios.defaults.baseURL = "http://39.105.67.242:6677";
axios.defaults.headers.common["Content-Type","application/x-www-form-urlencoded"];
axios.defaults.transformRequest=[(data)=>{
    return qs.stringify(data,{arrayFormat:'repeat'})
}];
export default {
    data(){
        return{
            name:"订单管理",
            checked: true,
            list:[],
            order:{},
            ids:new Set()
        }
    },
    created(){
        this.reloadData();
    },
    methods:{
        updateHandler(order){
            this.order = order;
        },
        reloadData(){
            axios.get("/order/findAll")
            .then((response)=>{
                this.list = response.data.data;
            })
        },
        async submitHandler(){
            let response = await axios.post("/order/saveOrUpdate",this.order);
            alert(response.data.message);
            this.order = {};
            this.reloadData();
        },
        async deleteHandler(id){
            let response = await axios.get("/order/deleteById",{params:{id}});
            let status = response.data.status;
            let message = response.data.message;
            if(status === 200){
                alert("操作成功："+message);
            } else {
                alert("操作失败："+message);
            }
            this.reloadData();
        },
        batchHandler(){
            let v=this;
            axios({
                url:"/order/batchDelete",
                method:"post",
                data:{ids:Array.from(v.ids)},
            })
            .then((response)=>{
                alert(response.data.message);
                this.reloadData();
            })
        },
        checkHandler(){
            if(this.ids.has(parseInt(event.target.value))){
                this.ids.delete(parseInt(event.target.value))
            }else{
                this.ids.add(parseInt(event.target.value));
                console.log(parseInt(event.target.value));
            }
        }
    }
}
</script>

<style scoped>
    .tal{
        text-align: center;
    }
    .batch{
        margin-bottom: 1rem;
    }
    .btn{
        color:red;
    }
    .upd{
        color:royalblue;
    }
</style>