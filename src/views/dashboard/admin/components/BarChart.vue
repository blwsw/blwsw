<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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
      default: '330px'
      // default: ''
    },
    chartData: {
      type: Array,
      required: true
    },
    weeks: {
      type: Array,
      defaults: ['星期一', '星期二']
    }
  },
  data() {
    return {
      chart: null
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
    setOptions(chartData) {
      const that = this
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: that._resizeVal(0.5),
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.weeks, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            fontSize: that._resizeVal(0.12)
          },
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {					// ---坐标轴 轴线
            show: false,					// ---是否显示
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {					// ---坐标轴 标签
            show: true,					// ---是否显示
            inside: false,				// ---是否朝内
            rotate: 0,					// ---旋转角度
            margin: 8					// ---刻度标签与轴线之间的距离
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#CACBD2',
              width: 1,
              type: 'dashed'
            }
          },
          splitArea: { show: false }// 保留网格区域
        }],
        series: [{
          name: '正常',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: chartData[0], // [79, 52, 200, 334, 390, 330, 220],
          animationDuration,
          barWidth: '3',
          itemStyle: {
            // 通常情况下：
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#05FFFD'
            }
          }
        }, {
          name: '故障',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: chartData[3], // [79, 52, 200, 334, 390, 330, 220],
          animationDuration,
          barWidth: '3',
          itemStyle: {
            // 通常情况下：
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#CF8336'
            }
          }
        }, {
          name: '预警',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: chartData[1], // [80, 52, 200, 334, 390, 330, 220],
          animationDuration,
          barWidth: '3',
          itemStyle: {
            // 通常情况下：
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#9165F8'
            }
          }
        }, {
          name: '报警',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: chartData[2], // [30, 52, 200, 334, 390, 330, 220],
          animationDuration,
          barWidth: '3',
          itemStyle: {
            // 通常情况下：
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: '#E8554B'
            }
          }
        }]
      })
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
