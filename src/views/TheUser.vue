<template>
  <div class="manage">
    <!-- 新增弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="closeDialog">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="buttonDiv">
      <!-- 新增按钮 -->
      <div>
        <el-button type="primary" @click="handleAdd">+新增</el-button>
      </div>
      <!-- 搜索 -->
      <el-form :inline="true" :model="userName" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="userName.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">返回</el-button>
      </el-form>
    </div>
    <div class="tableList">
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column prop="sex" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, deleteUser } from '@/API/index'
export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        age: [
          { required: true, message: '请输入年龄' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ],
        birth: [
          { required: true, message: '请输入生日' }
        ],
        addr: [
          { required: true, message: '请输入地址' }
        ]
      },
      tableData: [],
      modalType: 0, // 0表示新增,1表示编辑,
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userName: {
        name: ''
      }
    }
  },
  methods: {
    // 提交用户表单
    submit () {
      this.$refs.form.validate((valid) => {
        // 校验通过提交数据
        if (valid) {
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表接口
              this.getList()
            })
          }
          this.closeDialog()
        }
      })
    },
    // 关闭弹窗,清除数据
    closeDialog () {
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
    },
    // 删除user
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {

        })
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑user
    handleEdit (row) {
      this.modalType = 1
      this.dialogVisible = true
      // 注意需要对当前数据进行深拷贝,否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 新增user
    handleAdd () {
      this.modalType = 0
      this.dialogVisible = true
    },
    // 获取列表
    getList () {
      getUser({ params: { ...this.pageData, ...this.userName } }).then(({ data }) => {
        console.log(data)
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    // 修改页码
    changePage (val) {
      this.pageData.page = val
      getUser({ params: this.pageData }).then(({ data }) => {
        this.tableData = data.list
      })
    },
    // 查询
    onSubmit () {
      this.getList()
      this.userName.name = ''
    }
  },
  mounted () {
    this.getList()
  }
}

</script>

<style lang="less" scoped>
  .manage{
    height: 90%;
    .buttonDiv{
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
    .tableList{
      height: 90%;
      position: relative;
      .page {
        position: absolute;
        right: 0;
        margin-top: 20px;
      }
    }
  }
</style>
