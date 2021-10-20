<template>
  <!-- :style="{height:height,width:width}" -->
  <div :class="className" :style="{height:height,width:width}"  />
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
      default: '230px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default: {
        zccount: [10, 21, 20, 0, 60, 0, 11, 2, 3],
        gzcount: [0, 8, 22, 14, 19, 32, 21, 2, 3],
        yjcount: [7, 21, 15, 18, 22, 23, 21, 2, 3],
        bjcount: [6, 12, 17, 0, 32, 0, 11, 2, 3]
      }
    }
  },
  data() {
    return {
      chart: null,
      // lineChartData: {
      //   zccount: [10, 21, 20, 0, 60, 0, 11, 2, 3],
      //   gzcount: [0, 8, 22, 14, 19, 32, 21, 2, 3],
      //   yjcount: [7, 21, 15, 18, 22, 23, 21, 2, 3],
      //   bjcount: [6, 12, 17, 0, 32, 0, 11, 2, 3]
      // },
      azcount: 0,
      reals: [],
      weeks: ['08', '10', '12', '14', '16', '18', '20', '22', '24']

    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (val) {
          this.setOptions(val)
        }

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
    setOptions({ zccount, gzcount,yjcount,bjcount } = {}) {
      const that = this
      const lMax = this._calcMaxNumber(zccount)
      // let lMin = this._calcMinNumber(expectedData);
      const rMax = this._calcMaxNumber(gzcount)
      // let rMin = this._calcMinNumber(actualData);
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        backgroundColor: 'transparent',
        xAxis: {
          show: true,
          data: ['08', '10', '12', '14', '16', '18', '20', '22', '24'], // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            margin: 10,					// ---刻度标签与轴线之间的距离
            color: 'rgba(255,255,255,0.8)',				// ---默认取轴线的颜色
            fontSize: 12
          },
          axisLine: {					// ---坐标轴 轴线
            show: true,					// ---是否显示
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
              width: 1,
              type: 'solid'
            }
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 0,
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
        yAxis: [{
          // name:'正常',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
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
            margin: 8,					// ---刻度标签与轴线之间的距离
            color: 'rgba(255,255,255,0.8)'
          },
          boundaryGap: 0,
          min: 0,
          max: lMax,
          splitNumber: 5,
          interval: lMax / 5,
          minInterval: 1,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: { show: false }// 保留网格区域
        }, {
          // name:'故障',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
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
            margin: 8,					// ---刻度标签与轴线之间的距离
            color: 'rgba(255,255,255,0.8)'				// ---默认取轴线的颜色
          },
          boundaryGap: [0.2, 0.2],
          min: 0,
          max: rMax,
          splitNumber: 5,
          interval: rMax / 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: { show: false }// 保留网格区域
        }, {
          // name:'预警',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
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
            margin: 8,					// ---刻度标签与轴线之间的距离
            color: 'rgba(255,255,255,0.8)'				// ---默认取轴线的颜色
          },
          boundaryGap: [0.2, 0.2],
          min: 0,
          max: rMax,
          splitNumber: 5,
          interval: rMax / 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: { show: false }// 保留网格区域
        }, {
          // name:'报警',
          show: true,					// ---是否显示
          type: 'value',			// ---轴类型，默认'category'
          scale: true,
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
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
            margin: 8,					// ---刻度标签与轴线之间的距离
            color: 'rgba(255,255,255,0.8)'				// ---默认取轴线的颜色
          },
          boundaryGap: [0.2, 0.2],
          min: 0,
          max: rMax,
          splitNumber: 5,
          interval: rMax / 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: { show: false }// 保留网格区域
        }],
        legend: {
          // type: 'scroll',
          right: 10,
          top: 10,
          // orient: 'horizontal',   // 水平
          // itemGap: that._resizeVal(0.2),            // 间隔
          // itemWidth: that._resizeVal(0.14),          // 图形宽度。
          // itemHeight: that._resizeVal(0.14),        // 图形高度。
          textStyle: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 14
          },
          data: ['正常数', '故障数', '预警数', '报警数']
        },
        series: [{
          name: '正常数',
          type: 'line',
          data: zccount,
          smooth: true,
          sampling: 'average',
          itemStyle: {
            color: 'rgba(247, 163, 92, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(247, 163, 92, 1)'
            }, {
              offset: 1,
              color: 'rgba(247, 163, 92, .3)'
            }])
          }
        },
        {
          name: '故障数',
          type: 'line',
          data: gzcount,
          yAxisIndex: 1,
          smooth: true,
          sampling: 'average',
          itemStyle: {
            color: 'rgba(91, 143, 249, 1)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(91, 143, 249, 1)'
            }, {
              offset: 1,
              color: 'rgba(91, 143, 249, .3)'
            }])
          }
        }, {
            name: '预警数',
            type: 'line',
            data: yjcount,
            yAxisIndex: 1,
            smooth: true,
            sampling: 'average',
            itemStyle: {
              color: '#F19433'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#F19433'
              }, {
                offset: 1,
                color: '#5c5953'
              }])
            }
          },
          {
            name: '报警数',
            type: 'line',
            data: bjcount,
            yAxisIndex: 1,
            smooth: true,
            sampling: 'average',
            itemStyle: {
              color: '#E93F33'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#E93F33'
              }, {
                offset: 1,
                color: '#4c3b3a'
              }])
            }
          }]
      })
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
