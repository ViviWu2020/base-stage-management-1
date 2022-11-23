<template>
  <div class="manage">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <!-- 用户表单信息 -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" value-format="yyyy-mm-dd" placeholder="选择日期时间"> </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增与查询 -->
    <div class="manage-header">
      <el-button class="new" @click="handleAdd" type="primary"> + 新增</el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户列表数据 -->
    <el-table height="92%" :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" label="出生日期"></el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="addr" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { addUser, getUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请选择地址" }],
      },
      tableData: [],
      modelType: 0, // 0 新增用户弹窗，1 编辑弹窗
      total: 0, //当前总条数
      pageData: {
        page: 1,
        limit: 20,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //获取用户列表数据
    getList() {
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //校验通过
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              //增加信息后重新刷新数据
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    //弹窗关闭时
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //取消按钮
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
      console.log(this.form);
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    //列表的查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less">
.manage {
  .manage-header {
    display: flex;
    justify-content: space-between;
    .new {
      height: 40px;
    }
  }
  height: 92%;
  .el-table {
    margin-bottom: 20px;
  }
  .pager {
    float: right;
  }
}
</style>
