<template>
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
      default: '350px'
      // default: ''
    },
    chartData: {
      type: Array,
      required: true
    },
    azcount: {
      type: Number,
      default: 0
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
      this.setOptions(this.chartData, null)
    },
    setOptions(picChartData, legendData) {
      const that = this
      if (!legendData) {
        legendData = ['正常', '故障', '预警', '报警']
      }
      this.chart.setOption({
        // title: {
        //   text: '',
        //   subtext: '总台数'+this.azcount+"台",
        //   left: 'left',
        //   textStyle: {
        //     fontSize: 16,
        //   },
        // },
        containLabel: true,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          show: false,
          left: 'center',
          bottom: '10',
          data: legendData
        },
        title: {
          text: this.azcount + '台',
          left: 'center',
          top: '50%',
          textStyle: {
            color: '#fff',
            fontSize: that._resizeVal(0.2),
            align: 'center'
          }
        },
        graphic: [{
          type: 'circle',
          z: 10,
          bounding: 'raw',
          origin: [75, 75],
          style: {
            fill: '#fff',
            lineWidth: 20
          }
        }, {
          type: 'text',
          left: 'center',
          top: '42%',
          style: {
            text: '总台数',
            textAlign: 'center',
            fill: '#fff',
            fontSize: that._resizeVal(0.18)
          }
        }
        ],
        series: [
          {
            name: '系统状态',
            type: 'pie',
            data: picChartData,
            minAngle: 1,
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            // roseType: 'radius',
            // radius: [15, 95],
            // center: ['40%', '55%'],

            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            radius: ['30%', '65%'],
            label: {
              align: 'left',
              normal: {
                formatter(v) {
                  let text = v.name + ' ' + Math.round(v.percent) + '%'
                  if (text.length <= 8) {
                    return text
                  } else if (text.length > 8 && text.length <= 16) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8)}`
                  } else if (text.length > 16 && text.length <= 24) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16)}`
                  } else if (text.length > 24 && text.length <= 30) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24)}`
                  } else if (text.length > 30) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}`
                  }
                },
                textStyle: {
                  color: '#ffff',
                  fontSize: that._resizeVal(0.18)
                }
              }
            }
          }
        ]
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
