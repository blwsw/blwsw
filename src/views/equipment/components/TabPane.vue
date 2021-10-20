<template>
  <div class="app-container" style="padding: 0;margin: 0;">
    <div>

      <div style="float: right; margin-bottom:1px;">
        <div class="btndiv">
          <el-button v-permission="['admin1','admin2','blw']" :loading="downloadLoading" type="primary" @click="handleDownload1">
            导出
          </el-button>
          <el-button :loading="downloadLoading" type="primary" @click="handlePrint">
            打印
          </el-button></div>
        <div class="legend-list">
          <div class="legend " :class="{'is-active':showzt}" @click="showzt = true">
            <div class="legend-desc">设备数据</div>
          </div>
          <div class="legend" :class="{'is-active':!showzt}" @click="showzt = false">
            <div class="legend-desc">设备状态</div>
          </div>
          <div class="legend" @click="changeStatus(1)">
            <div class="legend-color zc" />
            <div class="legend-desc">正常</div>
          </div>
          <div class="legend" @click="changeStatus(2)">
            <div class="legend-color gz" />
            <div class="legend-desc">故障</div>
          </div>
          <div class="legend" @click="changeStatus(3)">
            <div class="legend-color bj" />
            <div class="legend-desc">报警</div>
          </div>
          <div class="legend" @click="changeStatus(4)">
            <div class="legend-color yj" />
            <div class="legend-desc">预警</div>
          </div>
        </div>
      </div>

      <!-- header-cell-style="background-color: #f5f7fa;color: #909399;font-weight: bold;border-bottom: 1px solid #EBEEF5;"  -->
      <el-table id="tableList" :height="pageH" :data="list" fit highlight-current-row>
        <el-table-column key="1" min-width="70px" label="节点编号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column key="2" min-width="70px" label="配电箱号">
          <template slot-scope="{row}">
            <span>{{ row.pdcNo }}</span>
          </template>
        </el-table-column>

        <el-table-column key="3" min-width="140px" align="center" label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.In_Time }}</span>
          </template>
        </el-table-column>
        <template v-if="showzt">
          <el-table-column key="4" min-width="80px" align="center" label="雷击次数" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.TTime }}</span>
            </template>
          </el-table-column>
          <el-table-column key="5" min-width="120px" label="雷击电流 (kA)" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.TCurrent }}</span>
            </template>
          </el-table-column>
          <el-table-column key="6" min-width="100px" label="实时温度 (℃)" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.OTemp }}</span>
            </template>
          </el-table-column>
          <el-table-column key="7" min-width="120px" label="泄露电流1 (mA)">
            <template slot-scope="scope">
              <span>{{ scope.row.LCurrent1 }}</span>
            </template>
          </el-table-column>
          <el-table-column key="8" min-width="120px" label="泄露电流2 (mA)" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.LCurrent2 }}</span>
            </template>
          </el-table-column>
          <el-table-column key="9" min-width="120px" label="泄露电流3 (mA)" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.LCurrent3 }}</span>
            </template>
          </el-table-column>
          <el-table-column key="Deterior" min-width="100px" label="劣化比例(%)" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.Deterior }}%</span>
            </template>
          </el-table-column>
        </template>
        <template v-if="!showzt">

          <el-table-column key="ErrThunder" min-width="80px" label="雷击状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrThunder | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="ErrTemp" min-width="80px" label="温度状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrTemp | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="ErrLeihua" min-width="80px" label="劣化状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrLeihua | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="ErrLC1" min-width="80px" label="泄漏状态1" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrLC1 | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="ErrLC2" min-width="80px" label="泄漏状态2" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrLC2 | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="ErrLC3" min-width="80px" label="泄漏状态3" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="run-status" :class="row.ErrLC3 | statusFilter2" />
            </template>
          </el-table-column>
          <el-table-column key="Switch1" min-width="80px" label="脱离器1" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--            <span>{{ row.Switch1 |switchFilter }}</span>-->
              <div class="run-status" :class="row.Switch1 | runStatusFilter" />
            </template>
          </el-table-column>
          <el-table-column key="Switch2" min-width="80px" label="脱离器2" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--            <span>{{ row.Switch2 |switchFilter }}</span>-->
              <div class="run-status" :class="row.Switch2 | runStatusFilter" />
            </template>
          </el-table-column>
          <el-table-column key="Switch3" min-width="80px" label="脱离器3" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--            <span>{{ row.Switch3 |switchFilter }}</span>-->
              <div class="run-status" :class="row.Switch3 | runStatusFilter" />
            </template>
          </el-table-column>
          <el-table-column key="Switch4" min-width="80px" label="脱离器4" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--            <span>{{ row.Switch4 |switchFilter }}</span>-->
              <div class="run-status" :class="row.Switch4 | runStatusFilter" />
            </template>
          </el-table-column>
        </template>
        <el-table-column min-width="120px" align="center" label="安装位置">
          <template slot-scope="scope">
            <span>{{ scope.row.InstallPos }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { fetchEvent } from '@/api/article'
import { formatTime, parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import store from '@/store'

export default {
  components: { Pagination },
  directives: { permission },
  filters: {
    statusFilter(status) { // 故障代码，00正常01预警10报警
      const statusMap = {
        '00': '正常',
        '01': '预警',
        '10': '报警'
      }
      return statusMap[status]
    },
    switchFilter(status) { // 开关量1，0关，1开  = 开关量（1：故障 0：正常） 脱离器
      const statusMap = {
        '1': '故障',
        '0': '正常'
      }
      return statusMap[status]
    },
    runStatusFilter(status) {
      const statusMap = {
        '1': 'bj',
        '0': 'zc'
      }
      return statusMap[status]
    },
    statusFilter2(status) { // 故障代码，00正常01预警10报警
      const statusMap = {
        '00': 'zc',
        '01': 'yj',
        '10': 'bj'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'L1'
    },
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      downloadLoading: false,
      filename: '导出文件',
      autoWidth: true,
      bookType: 'xlsx',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        eventType: 'IN',
        sort: '-in_Time',
        status: '1,2,3,4'
      },
      loading: false,
      pageH: 1000,
      total: 0,
      showzt: true
    }
  },
  computed: { //          监听词条
    getReals() {
      return this.$store.state.app.reals
    }
  },
  watch: {
    getReals: {
      handler(newValue, oldValue) { // 当词条改变时执行事件
        // this.list = newValue
        // this.total = this.list.length;
      }
    }
  },
  created() {
    this.pageH = this._resizeVal(7) + 'px'
  },
  mounted() {
    // this.list = this.$store.state.app.reals
    // if (!this.list || this.list.length == 0) {
    //   this.list = store.dispatch('app/getReals', { reload: true })
    //   this.list = []
    // }
    // this.total = this.list.length;
    this.getList()
  },
  methods: {
    changeStatus(istatus) {
      if (istatus === 0) {
        this.listQuery.status = ['1', '2', '3', '4']
      } else {
        this.listQuery.status = istatus
      }

      this.getList()
    },
    getList() {
      this.loading = true
      this.$emit('create') // for test
      this.listQuery.queryString = { nodeType: 'ly',
        status: this.listQuery.status }
      var obj = {
        url: 'core/reals',
        data: this.listQuery
      }
      fetchEvent(obj).then(response => {
        this.list = response.responseBody
        if (response.page) {
          this.total = response.page.page_total
        }
        this.loading = false
      })
    },
    handleDownload1() {
      this.downloadLoading = true

      this.listQuery.queryString = { nodeType: 'ly',
        status: this.listQuery.status
      }
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 10000
      var obj = {
        url: 'core/reals',
        data: this.listQuery
      }
      fetchEvent(obj).then(response => {
        var exportlist = response.responseBody
        import('@/vendor/Export2Excel').then(excel => {
          let tHeader = ['节点编号', '配电箱号', '更新时间', '雷击次数', '雷击电流', '实时温度', '泄露电流1(mA)', '泄露电流2(mA)', '泄露电流3(mA)', '雷击状态', '温度状态', '劣化状态', '泄漏状态1', '泄漏状态2', '泄漏状态3', '脱离器1', '脱离器2', '脱离器3', '脱离器4', '安装位置', '劣化度']
          let filterVal = ['addr', 'pdcNo', 'In_Time', 'TTime', 'TCurrent', 'OTemp', 'LCurrent1', 'LCurrent2', 'LCurrent3', 'ErrThunderN', 'ErrTempN', 'ErrLeihuaName', 'ErrLC1N', 'ErrLC2N', 'ErrLC3N', 'Switch1N', 'Switch2N', 'Switch3N', 'Switch4N', 'InstallPos', 'Deterior']
          this.filename = '电涌保护器'
          if (this.showzt) {
            tHeader = ['节点编号', '配电箱号', '更新时间', '雷击次数', '雷击电流', '实时温度', '泄露电流1(mA)', '泄露电流2(mA)', '泄露电流3(mA)', '安装位置', '劣化度']
            filterVal = ['addr', 'pdcNo', 'In_Time', 'TTime', 'TCurrent', 'OTemp', 'LCurrent1', 'LCurrent2', 'LCurrent3', 'InstallPos', 'Deterior']
          } else {
            tHeader = ['节点编号', '配电箱号', '更新时间', '雷击状态', '温度状态', '劣化状态', '泄漏状态1', '泄漏状态2', '泄漏状态3', '脱离器1', '脱离器2', '脱离器3', '脱离器4', '安装位置']
            filterVal = ['addr', 'pdcNo', 'In_Time', 'ErrThunderN', 'ErrTempN', 'ErrLeihuaName', 'ErrLC1N', 'ErrLC2N', 'ErrLC3N', 'Switch1N', 'Switch2N', 'Switch3N', 'Switch4N', 'InstallPos']
          }
          const statusMap = {
            '00': '正常',
            '01': '预警',
            '10': '报警'
          }
          const swithstatusMap = {
            '1': '故障',
            '0': '正常'
          }
          const list = exportlist.map((l) => {
            l.ErrLeihuaName = statusMap[l.ErrLeihua]
            l.ErrThunderN = statusMap[l.ErrThunder]
            l.ErrTempN = statusMap[l.ErrTemp]
            l.ErrLC1N = statusMap[l.ErrLC1]
            l.ErrLC2N = statusMap[l.ErrLC2]
            l.ErrLC3N = statusMap[l.ErrLC3]
            l.Switch1N = swithstatusMap[l.Switch1]
            l.Switch2N = swithstatusMap[l.Switch2]
            l.Switch3N = swithstatusMap[l.Switch3]
            l.Switch4N = swithstatusMap[l.Switch4]

            return l
          })
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      })
    },
    handlePrint() {
      var newWindow = window.open('打印窗口', '_blank')
      let tHeader = ['节点编号', '配电箱号', '更新时间', '雷击次数', '雷击电流', '实时温度', '泄露电流1(mA)', '泄露电流2(mA)', '泄露电流3(mA)', '雷击状态', '温度状态', '劣化状态', '泄漏状态1', '泄漏状态2', '泄漏状态3', '脱离器1', '脱离器2', '脱离器3', '脱离器4', '安装位置', '劣化度']
      let filterVal = ['addr', 'pdcNo', 'In_Time', 'TTime', 'TCurrent', 'OTemp', 'LCurrent1', 'LCurrent2', 'LCurrent3', 'ErrThunderN', 'ErrTempN', 'ErrLeihuaName', 'ErrLC1N', 'ErrLC2N', 'ErrLC3N', 'Switch1N', 'Switch2N', 'Switch3N', 'Switch4N', 'InstallPos', 'Deterior']
      if (this.showzt) {
        tHeader = ['节点编号', '配电箱号', '更新时间', '雷击次数', '雷击电流', '实时温度', '泄露电流1(mA)', '泄露电流2(mA)', '泄露电流3(mA)', '安装位置', '劣化度']
        filterVal = ['addr', 'pdcNo', 'In_Time', 'TTime', 'TCurrent', 'OTemp', 'LCurrent1', 'LCurrent2', 'LCurrent3', 'InstallPos', 'Deterior']
      } else {
        tHeader = ['节点编号', '配电箱号', '更新时间', '雷击状态', '温度状态', '劣化状态', '泄漏状态1', '泄漏状态2', '泄漏状态3', '脱离器1', '脱离器2', '脱离器3', '脱离器4', '安装位置']
        filterVal = ['addr', 'pdcNo', 'In_Time', 'ErrThunderN', 'ErrTempN', 'ErrLeihuaName', 'ErrLC1N', 'ErrLC2N', 'ErrLC3N', 'Switch1N', 'Switch2N', 'Switch3N', 'Switch4N', 'InstallPos']
      }
      var htmla = "<table style='width: 1200px;'><tr>"
      for (var i = 0; i < tHeader.length; i++) {
        if (tHeader[i] == '更新时间') {
          htmla += "<td width='180px' style='align-items: center;font-weight: bold;'>" + tHeader[i] + '</td>'
        } else {
          htmla += "<td width='120px' style='align-items: center;font-weight: bold;'>" + tHeader[i] + '</td>'
        }
      }
      htmla += '</tr>'
      const statusMap = {
        '00': '正常',
        '01': '预警',
        '10': '报警'
      }
      const swithstatusMap = {
        '1': '故障',
        '0': '正常'
      }
      this.list.map((item, i) => {
        item.ErrLeihuaName = statusMap[item.ErrLeihua]
        item.ErrThunderN = statusMap[item.ErrThunder]
        item.ErrTempN = statusMap[item.ErrTemp]
        item.ErrLC1N = statusMap[item.ErrLC1]
        item.ErrLC2N = statusMap[item.ErrLC2]
        item.ErrLC3N = statusMap[item.ErrLC3]
        item.Switch1N = swithstatusMap[item.Switch1]
        item.Switch2N = swithstatusMap[item.Switch2]
        item.Switch3N = swithstatusMap[item.Switch3]
        item.Switch4N = swithstatusMap[item.Switch4]

        htmla += '<tr>'
        for (var i = 0; i < filterVal.length; i++) {
          htmla += "<td style='align-items: center'>" + item[filterVal[i]] + '</td>'
        }
        htmla += '</tr>'
      })
      htmla += '</table>'
      // var docStr = document.getElementById('tableList').innerHTML
      console.log(htmla)
      newWindow.document.write(htmla)
      // newWindow.document.body.innerHTML = docStr
      newWindow.document.close()
      newWindow.print()
      newWindow.close()
    },
    formatJson(filterVal, list) {
      return list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    parseTime1(dateobj) {
      var datestr = dateobj.year + '-' + dateobj.monthValue + '-' + dateobj.dayOfMonth + ' ' + dateobj.hour + ':' + dateobj.minute + ':' + dateobj.second
      return datestr
    },
    _resizeVal(res) {
      const docEl = document.documentElement
      const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (!clientWidth) return
      const fontSize = 100 * (clientWidth / 1920)
      return res * fontSize
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
  .btndiv{
    margin-left: 55%;
    width: 50%
  }
  .is-active {
    background: #1AD9E2;
    border-radius: rem(10);
    padding: rem(10);
  }
  </style>

