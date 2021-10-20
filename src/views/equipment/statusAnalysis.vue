<template>
  <div class="dashboard-editor-container">
    <div class="status-blk">
      <div class="title">设备状态分析</div>
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div class="chart-wrapper">

            <line-chart :chart-data="lineChartData" :weeks="weeks" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="status-blk">
      <div class="title">设备状态分析</div>
      <el-row :gutter="0">
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="chart-wrapper">
            <div class="c-title zc">正常</div>
            <pie-chart :chart-data="zcpieChartData" :azcount="azcount" />
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="chart-wrapper">
            <div class="c-title gz">故障</div>
            <pie-chart :chart-data="gzpieChartData" :azcount="azcount" />
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="chart-wrapper">
            <div class="c-title yj">预警</div>
            <pie-chart :chart-data="yjpieChartData" :azcount="azcount" />
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="chart-wrapper">
            <div class="c-title bj">报警</div>
            <pie-chart :chart-data="bjpieChartData" :azcount="azcount" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { fetchEvent } from '@/api/article'
import bgUrl from '@/assets/images/bg.jpg'
import { parseTime } from '@/utils'
export default {
  name: 'StatusAnalysis',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },

  data() {
    return {
      lineChartData: {
        expectedData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      expectedData: [0, 0, 0, 0, 0, 0, 0],
      actualData: [0, 0, 0, 0, 0, 0, 0],
      pieChartData: [
        { value: 0, name: '正常', itemStyle: { color: '#65d186' }},
        { value: 0, name: '故障', itemStyle: { color: '#e0d405' }}

      ],
      zcpieChartData: [
        { value: 0, name: '正常', itemStyle: { color: '#4DD9D8' }},
        '0%'
      ],
      gzpieChartData: [
        { value: 0, name: '故障', itemStyle: { color: '#CFB137' }},
        '0%'
      ],
      yjpieChartData: [
        { value: 0, name: '预警', itemStyle: { color: '#9165F8' }},
        '0%'
      ],
      bjpieChartData: [
        { value: 0, name: '报警', itemStyle: { color: '#E8554B' }},
        '0%'
      ],
      barChartData: [
        { value: 0, name: '正常' },
        { value: 0, name: '故障' },
        { value: 0, name: '报警' },
        { value: 0, name: '预警' }
      ],
      statusChart: [
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] },
        { date: '', barChartData: [
          { value: 0, name: '正常' },
          { value: 0, name: '故障' },
          { value: 0, name: '报警' },
          { value: 0, name: '预警' }
        ] }
      ],
      dataweek: [],
      weeks: [],
      loading: false,
      dataList: [],
      zccount: 0,
      gzcount: 0,
      yjcount: 0,
      bjcount: 0,
      azcount: 0,
      historyData: [],
      totalList: [
        { count: 0, lable: '正常台数', icon: 'el-icon-video-play' },
        { count: 0, lable: '故障台数', icon: 'el-icon-warning' },
        { count: 0, lable: '预警台数', icon: 'el-icon-message-solid' },
        { count: 0, lable: '报警台数', icon: 'el-icon-sunrise-1' },
        { count: 0, lable: '离线台数', icon: 'el-icon-circle-close' }
      ],
      // 00正常01预警10报警
      status: [
        { code: '', value: '未知' },
        { code: '00', value: '正常' },
        { code: '01', value: '预警' },
        { code: '10', value: '报警' }
      ]
    }
  },
  created() {
    this.expectedData = [0, 0, 0, 0, 0, 0, 0]
    this.actualData = [0, 0, 0, 0, 0, 0, 0]
    var day = null
    for (let i = 6; i >= 0; i--) {
      day = this.getWeek(-i)
      this.dataweek.push(day)
      // this.statusChart[i].date=day;
      this.weeks.push('星期' + parseTime(day, '{a}'))
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getStateColor(code, yj) {
      // {code:"00",value:"正常"},
      // {code:"01",value:"预警"},
      // {code:"10",value:"报警"},
      if (code == 'F') {
        return '#65d186'
      }
      if (code == 'D') {
        return '#e0d405'
      }
      if (code == 'T') {
        if (yj == '01') {
          return '#F19433'
        }
        if (yj == '10') {
          return '#E93F33'
        }
      }
    },
    getList() {
      this.loading = true
      var obj = {
        url: 'uc/get/reals',
        data: {
          currentPage: 1,
          pageSize: 10000
        }
      }
      fetchEvent(obj).then(response => {
        var context = this
        this.dataList = response.responseBody.map((e) => {
          // totalList计算total
          // 故障标志位，T有故障，F无故障，D离线
          if (e.ErrFlag == 'F') {
            context.zcpieChartData[0].value++
            context.zccount++
          } else
          if (e.ErrFlag == 'T') {
            // 01预警
            if (e.ErrThunder == '01' || e.ErrLeihua == '01' || e.ErrLC1 == '01' || e.ErrLC2 == '01' ||
                e.ErrTemp == '01' || e.ErrLC3 == '01' || e.Switch1 == '0' || e.Switch2 == '0' || e.Switch3 == '0' || e.Switch4 == '0'
            ) {
              context.yjpieChartData[0].value++
              context.yjcount++
            }

            // 10预警
            if (e.ErrThunder == '10' || e.ErrLeihua == '10' || e.ErrLC1 == '10' || e.ErrLC2 == '10' ||
                e.ErrTemp == '10' || e.ErrLC3 == '10' || e.Switch1 == '1' || e.Switch2 == '1' || e.Switch3 == '1' || e.Switch4 == '1'
            ) {
              context.bjpieChartData[0].value++
              context.bjcount++
            }
          } else
          if (e.ErrFlag == 'D') {
            context.gzpieChartData[0].value++
            context.gzcount++
          }
          context.azcount++

          this.getTTimeCount(e)
          e.colorss = this.getStateColor(e.ErrFlag, e.YJ)
          e.ErrLeihuaStatusName = this.getStatusName(e.ErrFlag, e.YJ)
          return e
        })
        this.loading = false
        this.zcpieChartData[1] = this.GetPercent(this.zccount, this.azcount)
        this.gzpieChartData[1] = this.GetPercent(this.gzcount, this.azcount)
        this.yjpieChartData[1] = this.GetPercent(this.yjcount, this.azcount)
        this.bjpieChartData[1] = this.GetPercent(this.bjcount, this.azcount)
        this.getHistory()
      })
    },
    GetPercent(num, total) {
      // / <summary>
      // / 求百分比
      // / </summary>
      // / <param name="num">当前数</param>
      // / <param name="total">总数</param>
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    },
    getTTimeCount(item) { // 获取雷击数
      this.expectedData[6] += item.TTime
      this.lineChartData.expectedData = this.expectedData
    },
    getTimeStatusCounts() { // 近一周的状态数据
      // console.log(this.statusChart);
      var context = this
      // for(var i=0;i<this.dataweek.length;i++){
      // var days = this.dataweek[i];
      var i = 0
      this.dataList.map((item) => {
        const daye = context.getDayByTime(item.In_Time)
        // if( days == daye){
        // 故障标志位，T有故障，F无故障，D离线
        if (item.ErrFlag == 'F') {
          context.statusChart[i].barChartData[0].value++
        }
        if (item.ErrFlag == 'D') {
          context.statusChart[i].barChartData[1].value++
        }
        if (item.ErrFlag == 'T') {
          // 01预警
          if (item.ErrThunder == '01' || item.ErrLeihua == '01' || item.ErrLC1 == '01' || item.ErrLC2 == '01' ||
                item.ErrTemp == '01' || item.ErrLC3 == '01'
          ) {
            context.statusChart[i].barChartData[3].value++
          }

          // 10预警
          if (item.ErrThunder == '10' || item.ErrLeihua == '10' || item.ErrLC1 == '10' || item.ErrLC2 == '10' ||
                item.ErrTemp == '10' || item.ErrLC3 == '10' || item.Switch1 == '1' || item.Switch2 == '1' || item.Switch3 == '1' || item.Switch4 == '1'
          ) {
            context.statusChart[i].barChartData[2].value++
          }
        }

        // }
      })
      // }
    },
    getStatusName(code, yj) {
      if (!code) {
        return '未知'
      }
      const statusName = code
      if (code == 'F') {
        return '正常'
      }
      if (code == 'D') {
        return '故障'
      }
      if (code == 'T') {
        if (yj == '01') {
          return '预警'
        }
        if (yj == '10') {
          return '报警'
        }
      }
      return statusName
    },
    getWeek(day) {
      var today = new Date()
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds)
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },
    doHandleMonth(month) {
      var m = month
      if (month.toString().length == 1) {
        m = '0' + month
      }
      return m
    },
    getDayByTime(inTime) {
      var today = new Date(inTime)
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },
    getHistory() {
      if (this.historyData.length > 0) {
        this.hisData(this.historyData)
      } else {
        this.loading = true
        var obj = {
          url: 'uc/get/history/tj/count',
          data: {
            currentPage: 1,
            pageSize: 10000
          }
        }
        var context = this
        fetchEvent(obj).then(response => {
          context.historyData = response.responseBody
          context.hisData(response.responseBody)
        })
      }
    },
    hisData(hisData) {
      console.log(hisData)
      hisData.map((e) => {
        for (var i = 1; i < this.dataweek.length; i++) {
          var days = this.dataweek[i]
          var barChartData = [
            { value: 0, name: '正常' },
            { value: 0, name: '故障' },
            { value: 0, name: '报警' },
            { value: 0, name: '预警' }
          ]
          if (days == e.In_Time) {
            this.expectedData[i] = e.TTime
            barChartData[0].value = e.zccount
            barChartData[1].value = e.gzcount
            barChartData[3].value = e.yjcount
            barChartData[2].value = e.bjcount
            this.statusChart[i].barChartData = barChartData
          }
        }
        var a = {
          expectedData: this.expectedData
        }
        this.lineChartData = a
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$r: 32;
.dashboard-editor-container {
  padding: 30/$r+rem 60/$r+rem;
  //background-color: rgb(240, 242, 245);
  position: relative;

  .status-blk {
    box-shadow: 0 2px 4px 0 rgba(255,255,255,0.03), inset 2px 2px 35px 0 rgba(255,255,255,0.10);
    border-radius: 10px;
    margin-bottom:30/$r+rem;
    .title{
      background: rgba(26,165,230,.15);
      border-radius: 10px 10px 0 0;
      height: 50/$r+rem;
      line-height: 50/$r+rem;
      font-family: SourceHanSansSC-Regular;
      font-size: 18/$r+rem;
      color: #FFFFFF;
      letter-spacing: 0;
      padding-left: 50/$r+rem;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        left: 30/$r+rem;
        top: 12/$r+rem;
        bottom: 12/$r+rem;
        width: 4px;
        background-color: #FFFFFF;
      }
    }
    }

  .chart-wrapper {
    // background: #fff;
    // padding: 16px 16px 0;
    // margin-bottom: 32px;
    // padding: 15px;
    text-align:center;
    .c-title{
      margin-top:30/$r+rem;
      display:inline-block;
      z-index:999;
      text-align:center;
      font-family: SourceHanSansCN-Regular;
      font-size: 24/$r+rem;
      color: #FFFFFF;
      letter-spacing: 0;
      padding-left:15/$r+rem;
      position:relative;
      &:before{
        content:'';
        position:absolute;
        left:0;
        top:2px;
        bottom:2px;
        width:5px;
        background:red;
      }
      &.zc:before{
        background:#4DD9D8
      }
      &.gz:before{
        background:#CFB137
      }
      &.yj:before{
        background:#9165F8
      }
      &.bj:before{
        background:#E8554B
      }
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
