<template>
  <!-- :style="{height:height,width:width}" -->
  <div :class="className" :style="{height:height,width:width}" />
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
      default: '480px'
      // default: ''
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    weeks: {
      type: Array,
      defaults: ['星期一', '星期二']
    }
  },
  data() {
    return {
      chart: null,
      lineChartData: {
        expectedData: [0, 0, 0, 0, 0, 0, 0],
        actualData: [0, 0, 0, 0, 0, 0, 0]
      },
      azcount: 0,
      reals: []
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }

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
    setOptions({ expectedData, actualData } = {}) {
      const that = this
      const lMax = this._calcMaxNumber(expectedData)
      // let lMin = this._calcMinNumber(expectedData);
      const rMax = this._calcMaxNumber(actualData)
      // let rMin = this._calcMinNumber(actualData);
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        xAxis: {
          show: true,
          data: this.weeks, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // boundaryGap: false,
          axisTick: {
            show: false
          },
          position: 'bottom',			// ---x轴位置
          offset: 0,					// ---x轴相对于默认位置的偏移
          axisLabel: {					// ---坐标轴 标签
            show: true,					// ---是否显示
            inside: false,				// ---是否朝内
            rotate: 0,					// ---旋转角度
            margin: that._resizeVal(0.2),					// ---刻度标签与轴线之间的距离
            color: '#ffffff',				// ---默认取轴线的颜色
            fontSize: that._resizeVal(0.16)
          },
          axisLine: {					// ---坐标轴 轴线
            show: true,					// ---是否显示
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: that._resizeVal(0.3),
          right: that._resizeVal(0.3),
          bottom: that._resizeVal(0.2),
          top: that._resizeVal(0.7),
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross'
          // },
          padding: [5, 10]
        },
        yAxis: [{
          name: '警报数',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: true,					// ---是否显示
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {					// ---坐标轴 标签
            show: true,					// ---是否显示
            inside: false,				// ---是否朝内
            rotate: 0,					// ---旋转角度
            margin: 8					// ---刻度标签与轴线之间的距离
          },
          boundaryGap: [0.1, 0.1],
          min: 0,
          max: lMax,
          splitNumber: 5,
          interval: lMax / 5
        }, {
          name: '雷击数',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: true,					// ---是否显示
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {					// ---坐标轴 标签
            show: true,					// ---是否显示
            inside: false,				// ---是否朝内
            rotate: 0,					// ---旋转角度
            margin: 8					// ---刻度标签与轴线之间的距离
            // color:'red',				//---默认取轴线的颜色
          },
          boundaryGap: [0.1, 0.1],
          min: 0,
          max: rMax,
          splitNumber: 5,
          interval: rMax / 5
        }],
        legend: {
          type: 'plain', // 普通图例
          icon: 'circle',
          orient: 'horizontal', // 水平
          itemGap: that._resizeVal(0.2), // 间隔
          itemWidth: that._resizeVal(0.14), // 图形宽度。
          itemHeight: that._resizeVal(0.14), // 图形高度。
          textStyle: {
            color: '#fffffff',
            fontSize: that._resizeVal(0.24)
          },
          data: ['警报数', '雷击数']
        },
        series: [{
          name: '警报数',
          type: 'bar',
          data: expectedData,
          label: {						// ---图形上的文本标签
            show: false,
            color: '#19E5EA'
          },
          itemStyle: {					// ---图形形状
            normal: {
              color: '#19E5EA',
              columnStyle: {
                color: '#19E5EA',
                width: 2
              }
            }
          },
          barWidth: '8',				// ---柱形宽度
          // itemStyle: {
          //   normal: {
          //     color: '#19E5EA',
          //     columnStyle: {
          //       color: '#19E5EA',
          //       width: 2
          //     }
          //   }
          // },
          smooth: true
          // animationDuration: 1000,
          // animationEasing: 'cubicInOut'
        },
        {
          name: '雷击数',
          type: 'bar',
          data: actualData,
          yAxisIndex: 1,
          label: {						// ---图形上的文本标签
            show: false,
            color: '#FFD800'
          },
          itemStyle: {					// ---图形形状
            normal: {
              color: '#FFD800',
              columnStyle: {
                color: '#FFD800',
                width: 2
              }
            }
          },
          barWidth: '8',				// ---柱形宽度
          smooth: true
          // itemStyle: {
          //   normal: {
          //     color: '#FFD800',
          //     columnStyle: {
          //       color: '#FFD800',
          //       width: 2
          //     },
          //     areaStyle: {
          //       color: '#FFD800'
          //     }
          //   }
          // },
          // animationDuration: 1000,
          // animationEasing: 'quadraticOut'
        }]
      })
    },
    appendData(data) { // 近一周状况
      var context = this

      for (var i = 0; i < this.dataweek.length; i++) {
        var days = this.dataweek[i]
        this.reals = this.reals.map((item) => {
          const daye = context.getDayByTime(item.In_Time)

          if (days == daye) {
            // 故障标志位，T有故障，F无故障，D离线
            if (item.ErrFlag == 'T') {
              context.lineChartData.expectedData[i]++
            }
            if (item.TTime) {
              context.lineChartData.actualData[i] += item.TTime
            }
            // 01预警
            if (item.ErrThunder == '01' || item.ErrLeihua == '01' || item.ErrLC1 == '01' || item.ErrLC2 == '01' ||
              item.ErrTemp == '01' || item.ErrLC3 == '01'
            ) {
              context.lineChartData.expectedData[i]++
            }

            // 10预警
            if (item.ErrThunder == '10' || item.ErrLeihua == '10' || item.ErrLC1 == '10' || item.ErrLC2 == '10' ||
              item.ErrTemp == '10' || item.ErrLC3 == '10'
            ) {
              context.lineChartData.expectedData[i]++
            }
            console.log(context.lineChartData)
            this.setOptions(context.lineChartData)
          }
          return item
        })
      }
      this.lineChartData = context.lineChartData
      console.log(this.dataweek)
      console.log(this.reals)
      console.log(this.lineChartData)
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
    // 计算大小值保证y轴间隔
    _calcMaxNumber(arr) {
      const max = Math.max(...arr)
      const maxInt = Math.ceil(max / 9.5)
      const maxVal = maxInt * 10
      return maxVal
    },
    // 计算最小值
    _calcMinNumber(arr) {
      const min = Math.min(...arr)
      const minInt = Math.floor(min / 10)
      const minVal = minInt * 10
      return minVal
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
