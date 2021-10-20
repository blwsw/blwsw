<template>
  <div class="app-container"  style="padding: 0;margin: 0;">
    <div class="filter-container">
      <!--
      <el-form
        inline
        :model="listQuery"
      >

        <el-form-item label="设备分类">
          <el-checkbox-group v-model="listQuery.type" class="ckbox">
            <el-checkbox label="1">
              浪涌保护器
            </el-checkbox>
            <el-checkbox label="2">
              接地电阻保护仪
            </el-checkbox>
            <el-checkbox label="3">
              大气电场测试仪
            </el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="组织结构">
          <el-input
            v-model="listQuery.InstallPos"  placeholder = "请选择组织结构!"   class="filter-item filter-int input-with-select"
            size="small" style="width: 130px;"
          >

          </el-input>
          <el-button @click="dialogSelectVisible = true" style="margin-left: -25px;" v-waves class="filter-item" type="primary"  icon="el-icon-search" >选择</el-button>
          <el-dialog title="选择组织结构" z-index="20" :visible.sync="dialogSelectVisible">

            <DepartmentTree
              :tree="$store.state.departments.tree"
              select-mode="single"
              @click-node="clickNode"
            />

          </el-dialog>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-checkbox-group v-model="listQuery.status" class="ckbox">
            <el-checkbox label="1">
              正常
            </el-checkbox>
            <el-checkbox label="2">
              故障
            </el-checkbox>
            <el-checkbox label="3">
              报警
            </el-checkbox>
            <el-checkbox label="4">
              预警
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
      </el-form>
-->
      <div style="float: right; margin-bottom:1px;">
        <div class="legend-list">
          <div class="legend" @click="changeParam(0)">
            <div class="legend-desc">设备状态</div>
          </div>
          <div class="legend" @click="changeParam(1)">
            <div class="legend-color zc"></div>
            <div class="legend-desc">正常</div>
          </div>
          <div class="legend" @click="changeParam(2)">
            <div class="legend-color gz"></div>
            <div class="legend-desc">故障</div>
          </div>
          <div class="legend" @click="changeParam(3)">
            <div class="legend-color bj"></div>
            <div class="legend-desc">报警</div>
          </div>
          <div class="legend" @click="changeParam(4)">
            <div class="legend-color yj"></div>
            <div class="legend-desc">预警</div>
          </div>
        </div>
      </div>

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
      <el-table-column label="项目名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span >{{ row.prodName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点编号" prop="addr" sortable="custom" align="center" width="100" :class-name="getSortClass('addr')">
        <template slot-scope="{row}">
          <span>{{ row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配电箱号" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.NodeType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安装位置" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.InstallPos }}</span>
        </template>
      </el-table-column>
      <el-table-column label="串口服务器IP" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serialserver_ip }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务器端口" min-width="220px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serialserver_port }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column label="雷击电流报警设定值" min-width="220px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TCurrentAlarm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="温度报警设定值" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TAlarm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="温升限值设定值" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TRiseMax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏电流限值" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.LCurrentMax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脱扣" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.BOut | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开关量1" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Switch1 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开关量2" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Switch2 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开关量3" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Switch3 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开关量4" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Switch4 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏电流1" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TCurrent1 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏电流2" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TCurrent2 | qyjyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏电流3" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TCurrent3 | qyjyFilter }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="运行状态" class-name="status-col" min-width="120px" align="center">
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.delete | statusFilter">
            {{ row.delete | typeFilter }}
          </el-tag> -->
          <div class="run-status" :class="row.status | runStatusFilter"></div>
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
import DepartmentTree from './../DepartmentManage/DepartmentTree';
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
const runStatusOptions = [
  { key: '1', display_name: 'zc' },
  { key: '3', display_name: 'bj' },
  { key: '4', display_name: 'yj' },
  { key: '2', display_name: 'gz' }
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
const runStatusKeyValue = runStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'DeviceManager',
  components: { Pagination,DepartmentTree },
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
    runStatusFilter(code){
      return runStatusKeyValue[code]
    }
  },
  props: {
    type: {
      type: String,
      default: '1'
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
        status: ['1', '2', '3', '4'],
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
      dialogSelectVisible: false,
      seleNode: {},
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
      downloadList: [],
      oranges:[{
        code: "万达广场",
        value: "万达广场"
      },{
        code: "女人街",
        value: "女人街"
      },]
    }
  },
  mounted() {
    console.log(this.type);
    if(this.type === 'L1'){
          this.listQuery.PID = 1
    }else
    if(this.type === 'L2'){
      this.listQuery.PID = 2
    }else {
      this.listQuery.PID = 3
    }
    this.getList()
  },
  computed: { //          监听词条
    getRealsData() {
      return this.$store.state.app.reals
    },
    getType(){
      return this.type
    }
  },
  watch: {
    getRealsData: {
      handler(newValue, oldValue) { // 当词条改变时执行事件
        // console.log('new',newValue)
        // console.log('old',oldValue)
        this.appendData(newValue)
      }
    },
    getType: {
      handler(nval,oval){
        console.log(nval);
      }

    }
  },
  created() {
    // this.params = this.$route.params
    // console.log(this.params);
    // if (this.params) {
    //   // const id = this.$route.params && this.$route.params.id
    //   var ppame = this.$route.params
    //   ppame = ppame['ppame']
    //   if(ppame === 'dy'){
    //     this.listQuery.type = ['1']
    //   }else
    //   if(ppame === 'jd'){
    //     this.listQuery.type = ['2']
    //   }else {
    //     this.listQuery.type = ['1', '2', '3']
    //   }
    // }
    // this.$store.dispatch('departments/load');
    // this.getList()
  },
  methods: {
    changeParam(istatus) {
      if(istatus === 0){
        this.listQuery.status = ['1', '2', '3', '4']
      }else{
        this.listQuery.status = istatus
      }

      this.getList();
    },
    clickNode(obj){
      this.dialogSelectVisible =false;
      this.listQuery.InstallPos = obj.name;
      this.seleNode = obj;
    },
    getList() {
      this.listLoading = true
      if (this.listQuery.page) {
        this.listQuery.currentPage = this.listQuery.page
      }
      var statusStr = this.listQuery.status.toString();
      var queryString = {
        status: statusStr,
        InstallPos: this.listQuery.InstallPos,
        PID: this.listQuery.PID
      };
      var param = {
        currentPage: this.listQuery.currentPage,
        pageSize: this.listQuery.pageSize,
        queryString: queryString
      };
      var query = {
        url: 'core/dlist',
        data: param
      }
      fetchEvent(query).then(response => {
        this.list = response.responseBody.map((item, i) => {

          if(item.ErrFlag == 'F'){
            item.status = '1';
          }
          if(item.ErrFlag == 'T'){
            //01预警
            if(item.ErrThunder=='01' ||item.ErrLeihua=='01' ||item.ErrLC1=='01' ||item.ErrLC2=='01' ||
              item.ErrTemp=='01' || item.ErrLC3=='01'
            ){
              item.status = '4';
            }

            //10报警
            if(item.ErrThunder=='10' ||item.ErrLeihua=='10' ||item.ErrLC1=='10' ||item.ErrLC2=='10' ||
              item.ErrTemp=='10' || item.ErrLC3=='10' || item.Switch1 =='1' || item.Switch2 =='1' || item.Switch3 =='1' || item.Switch4 =='1'
            ){
              item.status = '3';
            }
          }
          if(item.ErrFlag == 'D'){
            item.status =  '2';
          }
          return item;
        });
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
          if(item.ErrFlag == 'F'){
            item.status = '1';
          }
          if(item.ErrFlag == 'T'){
            //01预警
            if(item.ErrThunder=='01' ||item.ErrLeihua=='01' ||item.ErrLC1=='01' ||item.ErrLC2=='01' ||
              item.ErrTemp=='01' || item.ErrLC3=='01'
            ){
              item.status = '4';
            }

            //10报警
            if(item.ErrThunder=='10' ||item.ErrLeihua=='10' ||item.ErrLC1=='10' ||item.ErrLC2=='10' ||
              item.ErrTemp=='10' || item.ErrLC3=='10' || item.Switch1 =='1' || item.Switch2 =='1' || item.Switch3 =='1' || item.Switch4 =='1'
            ){
              item.status = '3';
            }
          }
          if(item.ErrFlag == 'D'){
            item.status =  '2';
          }
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
        this.listQuery.sort = '+addr'
      } else {
        this.listQuery.sort = '-addr'
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
      this.$router.push({ name: 'upload-device', params: { id: '' }}) //
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
          const tHeader = ['节点地址', '安装位置', '名称', '串口服务器IP', '端口', '雷击电流报警设定值', '温度报警设定值', '温升限值设定值', '漏电流限值', '脱扣', '开关量1', '开关量2', '开关量3', '开关量4', '漏电流1', '漏电流2', '漏电流3', '备注']
          const filterVal = ['addr', 'InstallPos', 'name', 'serialserver_ip', 'serialserver_port', 'TCurrentAlarm', 'TAlarm', 'TRiseMax', 'LCurrentMax', 'BOut', 'Switch1', 'Switch2', 'Switch3', 'Switch4', 'TCurrent1', 'TCurrent2', 'TCurrent3', 'descript']
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
          addrs = selectionNodes[i].addr
        } else {
          addrs += ',' + selectionNodes[i].addr
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
      const selectionNodes = this.$refs.multipleTable.selection
      if (selectionNodes == null || selectionNodes.length == 0) {
        this.$notify({
          title: '提示',
          message: '请选择需要获取参数的设备',
          type: 'warning',
          duration: 2000
        })
        return false
      }

      let addrs = ''
      for (var i = 0; i < selectionNodes.length; i++) {
        if (!addrs) {
          addrs = selectionNodes[i].addr
        } else {
          addrs += ',' + selectionNodes[i].addr
        }
      }

      var query = {
        url: 'uc/nodes/getParams',
        data: {},
        methods: 'put',
        params: { addrs }
      }
      fetchEvent(query).then(response => {
        this.$notify({
          title: '成功',
          message: '设备参数获取成功，等设备响应后数据更新',
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
.ckbox ::v-deep{
  .el-checkbox__label,
  .el-checkbox__input.is-checked + .el-checkbox__label {
    font-size: rem(16);
    color: #4696ff;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #4696ff;
    border-color: #4696ff;
  }
}
.legend-list{
  font-size: 0;
  .legend{
    display: inline-block;
    margin-right: rem(20);
    cursor: pointer;
    &:last-child{
      margin-right: 0;
    }
    &>div{
      display: inline-block;
    }
    .legend-color{
      width: rem(12);
      height: rem(12);
      border-radius: rem(12);
      margin-right: rem(12);
    }
    .legend-desc{
      font-size: rem(14);
      color: #FFFFFF;
    }
  }
}
.zc{
  background: rgb(59,264,63);
}
.gz{
  background: rgb(246,200,41);
}
.yj{
  background: rgb(158,90,250);
}
.bj{
  background: rgb(239,83,124);
}
.run-status{
  margin: auto;
  text-align: center;
  width: rem(22);
  height: rem(22);
  border-radius: rem(22);
}
</style>
