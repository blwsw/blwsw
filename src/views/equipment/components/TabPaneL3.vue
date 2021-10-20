<template>
  <div class="app-container" style="padding: 0;margin: 0">
    <div>
      <div style="float: right; margin-bottom:1px;">
        <el-button v-permission="['admin1','admin2','blw']" :loading="downloadLoading" type="primary" @click="handleDownload1">
          导出
        </el-button>
        <el-button :loading="downloadLoading" type="primary" @click="handlePrint">
          打印
        </el-button></div>
      <el-table id="tableList3" ref="tableList3" :height="pageH" :data="list" fit highlight-current-row>
        <el-table-column min-width="50px" label="节点编号">
          <template slot-scope="{row}">
            <span>{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="网关编号">
          <template slot-scope="{row}">
            <span>{{ row.pdcNo }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="温度 (℃)" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.OTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="湿度" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.OTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="转速" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.OTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="电场强度" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.OTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="110px" align="center" label="安装位置">
          <template slot-scope="scope">
            <span>{{ scope.row.InstallPos }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import { fetchEvent } from '@/api/article'
import { formatTime, parseTime } from '@/utils'
import store from '@/store'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  directives: { permission },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
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
      filename: '实时温度',
      autoWidth: true,
      bookType: 'xlsx',
      listQuery: {
        currentPage: 1,
        pageSize: 5,
        eventType: 'IN',
        sort: '-in_Time'
      },
      loading: false,
      pageH: 1000
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
        this.list = newValue
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
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      var obj = {
        url: 'uc/get/reals',
        data: this.listQuery
      }
      fetchEvent(obj).then(response => {
        this.list = response.responseBody
        this.loading = false
      })
    },
    handleDownload1() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '节点编号', '配电箱号', '时间', '实时温度', '安装位置']
        const filterVal = ['seqNo', 'addr', 'pdcNo', 'In_Time', 'OTemp', 'address']
        const list = this.list
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
    },
    handlePrint() {
      var newWindow = window.open('打印窗口', '_blank')
      var docStr = document.getElementById('tableList3').innerHTML
      console.log(docStr)
      newWindow.document.write(docStr)
      // newWindow.document.body.innerHTML = docStr
      newWindow.document.close()
      newWindow.print()
      newWindow.close()
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

