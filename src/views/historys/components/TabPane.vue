<template>
  <div class="app-container" style="padding: 0;margin: 0;">
    <div class="filter-container filter-right" style="padding-bottom: 0px;padding-top: 0px;">
      <el-form
        inline
        :model="listQuery"
      >
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary"  @click="handlePrint">
          打印
        </el-button>
        <el-button v-waves v-permission="['admin1','blw']" :loading="downloadLoading" class="filter-item" type="primary" @click="handleUpload">
          清空
        </el-button>
        <el-button v-waves v-permission="['admin1','admin2','blw']" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          导出
        </el-button>

      </el-form>
    </div>

    <!-- header-cell-style="background-color: #f5f7fa;color: #909399;font-weight: bold;border-bottom: 1px solid #EBEEF5;"  -->
    <el-table
      id="tableList"
      :data="list"
      fit
      highlight-current-row
    >
      <!--<el-table-column
        v-loading="loading"
        align="center"
        label="序号"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>-->
      <el-table-column min-width="70px" label="节点编号">
        <template slot-scope="{row}">
          <!--<span class="link-type" @click="handleUpdate(row)">{{ row.addr }}</span>-->
          <span>{{ row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="130px" align="center" label="发生日期">
        <template slot-scope="scope">
          <span>{{ scope.row.In_Time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="配电箱号">
        <template slot-scope="scope">
          <span>{{ scope.row.pdcNo }}</span>
        </template>
      </el-table-column>
    <template v-if="type == 'L1'">
      <el-table-column min-width="70px" label="设备状态" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrFlag |statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="雷击状态" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrThunder |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="温度状态" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrTemp |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="劣化状态" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrLeihua |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="泄漏状态1" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrLC1 |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="泄漏状态2" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrLC2 |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="泄漏状态3" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ErrLC3 |GZFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="脱离器1" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Switch1 |switchFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="脱离器2" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Switch2 |switchFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="脱离器3" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Switch3 |switchFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" label="脱离器4" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Switch4 |switchFilter }}</span>
        </template>
      </el-table-column>
</template>
      <template v-if="type == 'L2'">
        <el-table-column min-width="70px" label="接地状态" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.ErrFlag |statusFilter }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column min-width="150px" align="center" label="安装位置">
        <template slot-scope="scope">
          <span>{{ scope.row.InstallPos }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>

</template>

<script>
import { fetchEvent, fetchHistory } from '@/api/article'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import permission from '@/directive/permission'
export default {
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    statusFilter(status) {
      const statusMap = { // 设备状态，T有故障，F无故障，D离线
        'T': '有故障',
        'F': '无故障',
        'D': '离线'
      }
      return statusMap[status]
    },
    GZFilter(status) {
      const statusMap = { // 00正常01预警10报警
        '00': '正常',
        '01': '预警',
        '10': '报警'
      }
      return statusMap[status]
    },
    switchFilter(status) { // 开关量1，0关，1开  = 开关量（1：故障 0：正常） 脱离器
      const statusMap = {
        '1': '报警',
        '0': '正常'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'L1'
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        eventType: '',
        sort: '-addr'
      },
      loading: false,
      downloadLoading: false,
      eventTypes: [{
        code: '65', value: '服务反馈/推送采集数据'
      }, {
        code: '66', value: '服务召唤设备参数反馈'
      }, {
        code: '67', value: '服务下发设备参数反馈'
      }, {
        code: '68', value: '服务初始化反馈'
      }, {
        code: '69', value: '服务清除设备故障反馈'
      }, {
        code: '50', value: '前端召唤设备参数'
      }, {
        code: '51', value: '前端下发设备参数'
      }, {
        code: '49', value: '前端召唤采集数据'
      }, {
        code: '52', value: '前端通知服务初始化'
      }, {
        code: '53', value: '前端通知服务清除设备故障'
      }, {
        code: '', value: '其他日志'
      }]
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
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchHistory(this.listQuery).then(response => {
        this.list = response.responseBody.map((e) => {
          this.eventTypes.map((t) => {
            if (t.code == e.eventType) {
              e.eventTypeName = t.value
              return false
            }
          })
          return e
        })
        this.total = response.page.page_total
        this.loading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.$router.push({ name: 'logsDetail', params: { seqNo: row.seqNo, requestBody: row.requestBody, responseBody: row.responseBody }}) //
    },
    handleUpload() {
      // this.$router.push({ name: 'upload-history', params: { }}) //
      var query = {
        url: 'core/clean/history',
        data: {
          PID: this.listQuery.PID
        },
        params: {
          PID: this.listQuery.PID
        }
      }
      fetchEvent(query).then(response => {
        this.$notify({
          title: '成功',
          message: '清除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDownload() {
      const statusMap = { // 设备状态，T有故障，F无故障，D离线
        'T': '有故障',
        'F': '无故障',
        'D': '离线'
      }
      const yjstatusMap = { // 00正常01预警10报警
        '00': '正常',
        '01': '预警',
        '10': '报警'
      }
      const gzstatusMap = {
        '1': '报警',
        '0': '正常'
      }
      this.downloadLoading = true
      var query = {
        url: 'uc/get/history',
        data: {
          pageSize: 10000,
          currentPage: 1,
          queryString: this.listQuery.queryString
        }
      }
      fetchEvent(query).then(response => {
        this.downloadList = response.responseBody.map((e) => {
          e.ErrFlagName = statusMap[e.ErrFlag]
          e.ErrThunderName = yjstatusMap[e.ErrThunder]
          e.ErrTempName = yjstatusMap[e.ErrTemp]
          e.ErrLeihuaName = yjstatusMap[e.ErrLeihua]
          e.ErrLC1Name = yjstatusMap[e.ErrLC1]
          e.ErrLC2Name = yjstatusMap[e.ErrLC2]
          e.ErrLC3Name = yjstatusMap[e.ErrLC3]
          e.Switch1Name = gzstatusMap[e.Switch1]
          e.Switch2Name = gzstatusMap[e.Switch2]
          e.Switch3Name = gzstatusMap[e.Switch3]
          e.Switch4Name = gzstatusMap[e.Switch4]
          return e
        })

        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['节点编号', '发生日期', '配电箱号', '设备状态', '雷击状态', '温度状态', '温度劣化', '漏电劣化1', '漏电劣化2', '漏电劣化3', '脱离器1', '脱离器2', '脱离器3', '脱离器4', '安装位置']
          const filterVal = ['addr', 'In_Time', 'pdcNo', 'ErrFlagName', 'ErrThunderName', 'ErrTempName', 'ErrLeihuaName', 'ErrLC1Name', 'ErrLC2Name', 'ErrLC3Name', 'Switch1Name', 'Switch2Name', 'Switch3Name', 'Switch4Name', 'InstallPos']

          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '历史记录'
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
    handlePrint() {
      var newWindow = window.open('打印窗口', '_blank')
      var docStr = document.getElementById('tableList').innerHTML
      // console.log(docStr)
      newWindow.document.write(docStr)
      // newWindow.document.body.innerHTML = docStr
      newWindow.document.close()
      newWindow.print()
      newWindow.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
.filter-right{
  text-align: right;
}
</style>
