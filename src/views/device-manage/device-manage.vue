<template>
  <!-- <div class="app-container"> -->
  <div>
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.queryString" placeholder="输入节点查询条件"class="filter-item filter-int" @keyup.enter.native="handleFilter" /> -->
      <!--icon="el-icon-search"->
      <el-button v-waves class="filter-item" type="primary"@click="handleFilter">
        查询
      </el-button>
      <!- icon="el-icon-edit" -->
      <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item orange" type="primary" @click="handleClearFault">
        清除故障
      </el-button>
      <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleDeviceInit">
        服务初始化
      </el-button>
      <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleGetNewData">
        同步服务端数据
      </el-button>
      <el-button v-permission="['admin1','admin2','blw']" class="filter-item" type="primary" @click="handleCreate">
        新增
      </el-button>
      <!-- icon="el-icon-upload" -->
      <!-- <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleDoSend">
        下发
      </el-button> -->
      <el-button v-waves v-permission="['admin1','admin2','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleUpload">
        导入
      </el-button>
      <el-button v-waves v-permission="['admin1','admin2','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">
        导出
      </el-button>

      <!-- <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleGetNewData">
        获取实时参数
      </el-button> -->
    </div>
    <!-- header-cell-style="background-color: rgba(255,255,255,.2);color: #FFFFFF;;font-weight: bold;border-bottom: 1px solid #EBEEF5;"-->
    <el-table
      :key="tableKey"
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      fit
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="checkSelection"
    >
      <el-table-column type="selection" label="选择" width="65" />
      <el-table-column label="节点ID" prop="addr" sortable="custom" align="center" width="100" :class-name="getSortClass('addr')">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点编号" prop="addr" sortable="custom" align="center" width="100" :class-name="getSortClass('addr')">
        <template slot-scope="{row}">
          <span>{{ row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配电箱号" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品Id" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.PID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点类型" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.NodeType | nodeTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.descript }}</span>
        </template>
      </el-table-column>

      <el-table-column label="串口服务器IP" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serialserver_ip }}</span>
        </template>
      </el-table-column>

      <el-table-column label="串口服务器端口" min-width="220px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serialserver_port }}</span>
        </template>
      </el-table-column>

      <el-table-column label="安装位置" min-width="110px" align="center">
        <template slot-scope="{row}">
          <!-- style="color:red;" -->
          <span>{{ row.InstallPos }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" class-name="status-col" min-width="120px">
        <template slot-scope="{row}">
          <el-tag :type="row.delete | statusFilter">
            {{ row.delete | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="350px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" class="table-btn" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.delete!='0'" class="table-btn green" size="mini" type="success" @click="handleModifyStatus(row,'0')">
            启用
          </el-button>
          <el-button v-if="row.delete!='1'" class="table-btn red" size="mini" @click="handleModifyStatus(row,'1')">
            禁用
          </el-button>
          <!--
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="节点编号" prop="addr">
          <el-input v-model="temp.addr" />
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="temp.descript" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.delete" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置">
          <el-input v-model="temp.InstallPos" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchEvent, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination/index'
import { deleteRole } from '@/api/role' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '0', display_name: '启用' },
  { key: '1', display_name: '禁用' }
]
// E:开启 D:关闭
const qyjyOptions = [
  { key: 'E', display_name: '开启' },
  { key: 'D', display_name: '关闭' }
]
// E:开启 D:关闭
const nodeTypeOptions = [
  { key: '0', display_name: '本地节点' },
  { key: '1', display_name: 'DTU节点' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const qyjyKeyValue = qyjyOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const nodeTypeKeyValue = nodeTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'DeviceManager',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    statusFilter(status) { // 0禁用 1启用
      const statusMap = {
        1: 'success',
        // draft: 'info',
        0: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    qyjyFilter(code) {
      return qyjyKeyValue[code]
    },
    nodeTypeFilter(code) {
      return nodeTypeKeyValue[code]
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
        pageSize: 10,
        queryString: undefined,
        sort: '+addr'
      },
      importanceOptions: [1, 2, 3],
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
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      downloadList: []
    }
  },
  computed: { //          监听词条
    getNodeData() {
      return this.$store.state.app.nodes
    }
  },
  watch: {
    getNodeData: {
      handler(newValue, oldValue) { // 当词条改变时执行事件
        // console.log('new',newValue)
        // console.log('old',oldValue)
        this.appendData(newValue)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.listQuery.page) {
        this.listQuery.currentPage = this.listQuery.page
      }
      var query = {
        url: 'uc/nodes',
        data: this.listQuery
      }
      fetchEvent(query).then(response => {
        this.list = response.responseBody
        this.total = response.page.page_total
        this.listLoading = false
      })
    },
    appendData(newValue) {
      var nnode = newValue
      this.list.map((item, i) => {
        if (item.addr == nnode.addr) {
          // this.relas.splice(i,1)
          item.BOut = nnode.BOut
          item.LCurrentMax = nnode.LCurrentMax
          item.Switch1 = nnode.Switch1
          item.Switch2 = nnode.Switch2
          item.Switch3 = nnode.Switch3
          item.Switch4 = nnode.Switch4
          item.TAlarm = nnode.TAlarm
          item.TCurrent1 = nnode.TCurrent1
          item.TCurrent2 = nnode.TCurrent2
          item.TCurrent3 = nnode.TCurrent3
          item.TCurrentAlarm = nnode.TCurrentAlarm
          item.TRiseMax = nnode.TRiseMax
        }
        return item
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      var query = {
        url: 'uc/nodes/' + row.addr,
        data: { addr: row.addr, delete: status },
        methods: 'put'
      }
      fetchEvent(query).then(response => {
        this.$message({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        row.delete = status
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'addr') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+ n.addr'
      } else {
        this.listQuery.sort = '- n.addr'
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
      // this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$router.push({ name: 'device-detail', params: { status: 'create' }})
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      this.$nextTick(() => {
        // this.$refs['dataForm'].clearValidate()
        this.temp.isEdit = true
        this.$router.push({ name: 'device-detail', params: this.temp })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleUpload() {
      this.$router.push({ name: 'upload-device', params: { type: 'node' }}) //
    },
    handleDownload() {
      this.downloadLoading = true
      var query = {
        url: 'uc/nodes',
        data: {
          pageSize: 10000,
          currentPage: 1,
          queryString: this.listQuery.queryString
        }
      }
      fetchEvent(query).then(response => {
        this.downloadList = response.responseBody
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['节点编号', '状态', '配电箱号', '产品ID', '节点类型', '说明', '安装位置', '串口服务器IP', '端口']
          const filterVal = ['addr', 'delete', 'name', 'PID', 'NodeType', 'descript', 'InstallPos', 'serialserver_ip', 'serialserver_port']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '设备列表'
          })
          this.downloadLoading = false
        })
      })
    },
    formatJson(filterVal) {
      return this.downloadList.map(v => filterVal.map(j => {
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
    },
    checkSelection() {
      // this.multipleSelection = val;
    },
    handleDoSend() {
      // console.info(this.multipleSelection);
      // console.info(this.$refs.multipleTable.tableData);
      const selectionNodes = this.$refs.multipleTable.selection
      if (selectionNodes != null) {
        this.listLoading = true
        for (var i = 0; i < selectionNodes.length; i++) {
          var query = {
            url: 'uc/send/nodes/33',
            data: selectionNodes[i],
            methods: 'put',
            params: {
              seqNo: 22
            }
          }
          fetchEvent(query).then(response => {
            this.$notify({
              title: '成功',
              message: '下发成功',
              type: 'success',
              duration: 2000
            })
            this.listLoading = false
          })
        }
        this.listLoading = false
      }
    },
    handleDeviceInit() {
      this.$confirm('系统设备初始化,将读取配置信息表重新设置。', '确认初始化系统设备吗?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          var query = {
            url: 'uc/nodes/initHint',
            data: {},
            methods: 'put',
            params: {
            }
          }
          fetchEvent(query).then(response => {
            this.$notify({
              title: '成功',
              message: '初始化成功',
              type: 'success',
              duration: 2000
            })
            this.listLoading = false
          })
        })
        .catch(err => { console.error(err) })
    },
    handleClearFault() {
      const selectionNodes = this.$refs.multipleTable.selection
      if (selectionNodes == null || selectionNodes.length == 0) {
        this.$notify({
          title: '提示',
          message: '请选择需要清除的设备',
          type: 'warning',
          duration: 2000
        })
        return false
      }
      let addrs = ''
      for (var i = 0; i < selectionNodes.length; i++) {
        if (!addrs) {
          addrs = selectionNodes[i].ID
        } else {
          addrs += ',' + selectionNodes[i].ID
        }
      }

      var query = {
        url: 'uc/nodes/clearFault',
        data: {},
        methods: 'put',
        params: { addrs
        }
      }
      fetchEvent(query).then(response => {
        this.$notify({
          title: '成功',
          message: '清除通知成功',
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
      })
    },
    handleGetNewData() {
      // const selectionNodes = this.$refs.multipleTable.selection
      // if (selectionNodes == null || selectionNodes.length == 0) {
      //   this.$notify({
      //     title: '提示',
      //     message: '请选择需要获取参数的设备',
      //     type: 'warning',
      //     duration: 2000
      //   })
      //   return false
      // }
      //
      // let addrs = ''
      // for (var i = 0; i < selectionNodes.length; i++) {
      //   if (!addrs) {
      //     addrs = selectionNodes[i].ID
      //   } else {
      //     addrs += ',' + selectionNodes[i].ID
      //   }
      // }

      var query = {
        url: 'core/new/data',
        data: {}
        //methods: 'put',
       // params: { addrs }
      }
      fetchEvent(query).then(response => {
        this.$notify({
          title: '成功',
          message: '获取成功',
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
.filter-container{
  display: block;;
  min-width: 1px;
  height: rem(40);
  float: right;
  margin-bottom: rem(60);
}
.filter-item.filter-int{
  width: rem(360);
}
</style>
