<template>
    <div id="customer">
        <h2>{{name}}</h2>
        <el-button type="" @click="dialogFormVisible = true" size="small">添加</el-button>
        <el-button class="batch" type="danger" @click="batchHandler" size="small">批量删除</el-button>

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="customer.realname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="customer.telephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="customer.status" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click.prevent="submitHandler">确 定</el-button>
        </div>
        </el-dialog>

        <el-table :data="list" class="tal">
            <el-table-column prop="id" label="#" @click.prevent="checkHandler">
                <el-checkbox ></el-checkbox>
            </el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="telephone" label="手机号"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="photo" label="照片"></el-table-column>
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
            name:"顾客管理",
            dialogFormVisible: false,
            list:[],
            customer:{},
            ids:new Set(),
            formLabelWidth: '120px',
            form:"",
            title:"添加用户信息"
        }
    },
    created(){
        this.reloadData();
    },
    methods:{
        updateHandler(customer){
            this.dialogFormVisible = true,
            this.customer = customer;
        },
        reloadData(){
            axios.get("/customer/findAll")
            .then((response)=>{
                this.list = response.data.data;
            })
        },
        async submitHandler(){
            let response = await axios.post("/customer/saveOrUpdate",this.customer);
            this.dialogFormVisible = false
            alert(response.data.message);
            this.customer = {};
            this.reloadData();
        },
        async deleteHandler(id){
            let response = await axios.get("/customer/deleteById",{params:{id}});
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
                url:"/customer/batchDelete",
                method:"post",
                data:{ids:Array.from(v.ids)},
            })
            .then((response)=>{
                alert(response.data.message);
                this.reloadData();
            })
        },
        checkHandler(){
            this. checked="true";
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
        margin-right: 1rem;
    }
    .upd{
        color:royalblue;
    }
</style>