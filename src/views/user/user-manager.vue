<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        inline
        :model="listQuery"
      >
        <el-form-item label="用户名">
          <el-input v-model="listQuery.userName" placeholder="用户名" style="width: 200px;" class="filter-item filter-int" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="listQuery.userType" placeholder="请选择角色!" clearable style="width:200px" class="filter-item filter-int">
            <el-option v-for="item in userroles" :key="item.code" :label="item.value" :value="item.code" />
          </el-select>
        </el-form-item>
        <!--
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>-->
        <!-- icon="el-icon-search"  -->
        <el-button v-waves class="filter-item" type="primary" @click="handleFilter">
          查询
        </el-button>
        <!-- icon="el-icon-edit"  -->
        <el-button v-permission="['admin1','blw']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
          新增
        </el-button><!--
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>

      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>-->
      </el-form>
    </div>
    <!--

      header-cell-style="background-color: #f5f7fa;color: #909399;font-weight: bold;border-bottom: 1px solid #EBEEF5;"

      border
    -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录名" width="100px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-permission="['admin1','blw']" size="mini" class="table-btn" type="primary" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-permission="['admin1','blw']" size="mini" class="table-btn orange" @click="handleFetchPv(row)">
            修改密码
          </el-button><!--
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>-->
          <el-button v-if="row.status!='deleted'" v-permission="['admin1','blw']" size="mini" class="table-btn orange" type="primary" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" class="user-form" label-width="100px" style="margin-left:50px;">
        <el-form-item label="用户角色" prop="userType">
          <el-select v-model="temp.userType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in userroles" :key="item.code" :label="item.value" :value="item.code" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="temp.username" :autosize="{ minRows: 2, maxRows: 6}" />
        </el-form-item>
        <!--<el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="table-btn" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
        <el-button class="table-btn orange" @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="修改密码">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" class="user-form" label-width="100px" style="margin-left:50px;">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="temp.password" name="password" :type="passwordType" style="width:80%;" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleNewPasword">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle, fetchEvent } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { mapGetters } from 'vuex'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'UserManager',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      userroles: [{
        code: 'admin1', value: '超级管理员'
      }, {
        code: 'admin2', value: '管理员'
      }, {
        code: 'admin3', value: '操作员'
      }],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        password: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: { },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }, { max: 100, message: '名称长度不能超过100位' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { max: 100, message: '名称长度不能超过100位' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { max: 30, message: '名称长度不能超过30位' }, { min: 6, message: '密码长度不能小于6位' }]
      },
      downloadLoading: false,
      passwordType: ''
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapGetters([
      'uid'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.responseBody
        this.total = response.page.page_total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'blw'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '创建成功',
              message: '用户创建成功默认密码123456',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.password = ''
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      var context = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = context.list.findIndex(v => v.id === tempData.id)
            context.list.splice(index, 1, tempData)
            context.dialogFormVisible = false
            context.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    handleDelete(row, index) {
      this.loading = true
      var obj = {
        url: 'uc/users/' + row.id,
        data: {
          userId: row.id
        },
        methods: 'Delete'
      }
      fetchEvent(obj).then(response => {
        if (response.code == 200) {
          this.$notify({
            title: '删除成功',
            message: '账号成功',
            type: 'success',
            duration: 2000
          })
          this.list.splice(row, 1)
          this.loading = false
        }
      })
    },
    handleFetchPv(row) {
      // fetchPv(pv).then(response => {
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
      this.pvData = row
      this.dialogPvVisible = true
    },
    handleNewPasword() {
      var password = this.temp.password

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          var obj = {
            url: 'uc/users/' + this.uid + '/pwd',
            data: {
              newPwd: password,
              userId: this.pvData.id
            },
            methods: 'put'
          }
          fetchEvent(obj).then(response => {
            if (response.code == 200) {
              this.$notify({
                title: '修改成功',
                message: '密码修改成功',
                type: 'success',
                duration: 2000
              })
              this.dialogPvVisible = false
              this.loading = false
            }
          })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
  .user-form{
    width: rem(400);
    margin-left: rem(50);
  }
  .el-table{
    font-size: rem(14) !important;
  }
</style>
