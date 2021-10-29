<template>
  <div class="app-container" style="padding: 0;margin: 0">
    <div>
      <div style="float: right; margin-bottom:1px;">
        <div class="btndiv">
        <el-button v-permission="['admin1','admin2','blw']" :loading="downloadLoading" type="primary" @click="handleDownload1">
          导出
        </el-button>
        <el-button :loading="downloadLoading" type="primary" @click="handlePrint">
          打印
        </el-button>
        </div>
        <div class="legend-list">
          <div class="legend" :class="{'is-active':true}">
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
      <el-table id="tableList2" ref="tableList2" :height="pageH" :data="list" fit highlight-current-row style="width: 100%;">
        <el-table-column min-width="80px" label="节点编号">
          <template slot-scope="{row}">
            <span>{{ row.addr }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="配电箱号">
          <template slot-scope="{row}">
            <span>{{ row.pdcNo }}</span>
          </template>
        </el-table-column>
        <el-table-column  min-width="100px" align="center" label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.In_Time }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" label="接地电阻" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.RVal }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="80px" label="接地状态" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <div class="run-status" :class="row.ErrR | statusFilter2" />
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
import store from '@/store'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  components: { Pagination },
  directives: { permission },
  filters: {
    statusFilter2:function(t){var e={0:"zc",2:"yj",1:"bj"};return e[t]},
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
      filename: '接地电阻',
      autoWidth: true,
      bookType: 'xlsx',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        eventType: 'IN',
        sort: '-in_Time'
      },
      loading: false,
      pageH: 1000,
      total: 0
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
      }
    }
  },
  created() {
    this.pageH = this._resizeVal(7) + 'px'
  },
  mounted() {
    this.getList();
  },
  methods: {
    changeStatus:function(t){this.listQuery.status=0===t?["1","2","3","4"]:t,this.getList()},
    getList() {
      this.loading = true
      this.$emit('create') // for test
      this.listQuery.queryString = { nodeType: "res",status:this.listQuery.status }
      var obj = {
        url: 'core/reals',
        data: this.listQuery
      }
      fetchEvent(obj).then(response => {
        this.list = response.responseBody
        if (response.page){
          this.total = response.page.page_total
        }
        this.loading = false
      })
    },
    handleDownload1() {
      this.downloadLoading = true

      var e={0:"正常",2:"预警",1:"报警"};

      import('@/vendor/Export2Excel').then(excel => {
        var tHeader = ["节点编号","配电箱号","更新时间","接地电阻","接地状态"];
        var filterVal = ["addr","pdcNo","In_Time","RVal","ErrRN"];
        var list = this.list.map((function(t,n){t.ErrRN=e[t.ErrR]}));
        var data = this.formatJson(filterVal, list);
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
      var newWindow = window.open('打印窗口', '_blank');
      var e=["节点编号","配电箱号","更新时间","接地电阻","接地状态"],
        n=["addr","pdcNo","In_Time","RVal","ErrRN"],
        a="<table style='width: 1200px;'><tr>";
        for(var i=0;i<e.length;i++){
          if("更新时间"==e[i]){
            a+="<td width='180px' style='align-items: center;font-weight: bold;'>"+e[i]+"</td>"
          }else{
            a+="<td width='120px' style='align-items: center;font-weight: bold;'>"+e[i]+"</td>";
          }
      }
      a+="</tr>";
        var r={0:"正常",2:"预警",1:"报警"};
        this.list.map((function(t,e){
          t.ErrRN=r[t.ErrR],
            a+="<tr>";
          for(var e=0;e<n.length;e++){
            a+="<td style='align-items: center'>"+t[n[e]]+"</td>";
          }
          a+="</tr>"
        }
          )),a+="</table>",
      newWindow.document.write(a)
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
    margin-left: 45%;
    width: 50%;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
  }
  .is-active {
    background: #1AD9E2;
    border-radius: rem(10);
    padding: rem(10);
  }
</style>
