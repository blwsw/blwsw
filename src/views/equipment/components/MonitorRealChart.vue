<template>
<!-- :style="{height:height,width:width}" -->
  <div :class="className"  :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    FLHHTIME: {
      type: String,
      defaults: '20'
    }
  },
  data() {
    return {
      chart: null,
      lineChartData: {
        zc: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        gz: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        yj: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        bj: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      azcount: 0,
      reals: [],
      xdata: ['01','02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        // debugger
        this.setOptions(val)
      }
    },


  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ zc, gz, yj, bj } = {}) {
      let that = this
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        backgroundColor: 'transparent',
        xAxis: {
          show: true,
          // data: this.weeks,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: this.xdata,
          type: 'category',
          boundaryGap: false,
           axisLabel: {
            color: 'rgb(255,255,255,)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 0,
          top: 40,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross'
          // },
          padding: [5, 10]
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgb(255,255,255)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle:{
              color:'rgb(9,45,82)',
              width: 1,
              type: 'dottod'
            }
          },
          splitArea : {show : false}//保留网格区域
        },
        legend: {
          data: ['正常', '故障', '预警', '报警'],
          textStyle: {
            color: '#FFFFFF',
            fontSize:12,
          }
        },

        series: [{
            name: '正常',
            type: 'line',
            symbol: 'none',
            color: 'rgb(59,264,63)',
            data: zc,//[20, 32, 12, 13, 10, 9],
            markLine: {
              symbol: ['none', 'none'],
              itemStyle: {
                normal: {
                  lineStyle: {
                    type: 'solid',
                    color: 'rgba(255,255,255,.5)',
                    shadowColor: "#FFFFFF",
                    shadowOffsetX: -15,
                    shadowOffsetY: 0,
                    shadowBlur:30,
                  },
                  label: {
                    show: false
                  }
                }
              },
              data: [{
                xAxis: this.FLHHTIME+'',
              }]
            }
        },
        {
            name: '故障',
            type: 'line',
            color:'rgb(246,200,41)',
            symbol: 'none',
            data: gz //[22, 18, 19, 23, 12, 33]
        },
        {
            name: '预警',
            type: 'line',
            color: 'rgb(158,90,250)',
           symbol: 'none',
            data: yj//[15, 22, 21, 14, 22, 25]
        },
        {
            name: '报警',
            type: 'line',
            color: 'rgb(239,83,124)',
            symbol: 'none',
            data: bj //[32, 32, 31, 34, 12, 36]
        }]
      })
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    getDayByTime(inTime){
      var today = new Date(inTime);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate =  this.doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
    },
    // 计算大小值保证y轴间隔
    _calcMaxNumber(arr){
      let max = Math.max(...arr);
      let maxInt = Math.ceil(max/9.5);
      let maxVal = maxInt*10;
      return maxVal;
    },
    // 计算最小值
    _calcMinNumber(arr){
      let min = Math.min(...arr);
      let minInt = Math.floor(min/10);
      let minVal = minInt*10;
      return minVal;
    },
    _resizeVal (res) {
      let docEl = document.documentElement,
        clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res*fontSize;
    }
  }
}
</script>
