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
    },
    autoResize: {
      type: Boolean,
      default: true
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
      var that = this
      if (!legendData) {
        legendData = ['正常', '故障', '报警', '预警']
      }
      this.chart.setOption({
        // title: {
        //   text: '',
        //   //subtext: '总台数'+this.azcount+"台",
        //   left: 'center',
        //   textStyle:{
        //     fontSize: that._resizeVal(0.5),
        //   },
        // },
        // tooltip: {
        //   show: false,
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        // legend: {
        //   left: 'center',
        //   top: 'center',
        //   data: legendData
        // },
        // series: [
        //   {
        //     name: '系统状态',
        //     type: 'pie',
        //     hoverAnimation: false,
        //     roseType: 'radius',
        //     // radius: [15, 90],
        //     // center: ['50%', '50%'],
        //     radius: ['60%', '65%'],
        //     // data: picChartData,
        //     data : [
        //         {name:'',
        //           value: parseInt(picChartData[0].value/picChartData[1]),
        //           itemStyle : {
        //             normal: {
        //               color: '#2866FF',
        //               label: {
        //                 normal: {show: true}
        //               }
        //             }
        //           }
        //         },
        //         {name:'other',value:100 - parseInt(picChartData[0].value/picChartData[1]), label: { normal: { show: false}}}
        //       ],
        //     // animationEasing: 'cubicInOut',
        //     // animationDuration: 2600,
        //     label:{
        //       normal:{
        //         show: true,
        //         position: 'center',
        //         color: '#fff',
        //         fontSize: that._resizeVal(0.5),
        //         fontWeight: 'bold',
        //         formatter: '{d}'
        //       }
        //     }
        //   }
        // ],
        // itemStyle: {
        //   //通常情况下：
        //   normal: {
        //     //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
        //     color: function(params) {
        //       var colorList = [
        //         "#65d186",
        //         "#f29e3c",
        //         "#f67287",
        //         "#f29e3c",
        //         "#f67287"
        //       ]; //每根柱子的颜色
        //       return colorList[params.dataIndex];
        //     }
        //   },
        // }
        title: {
          text: picChartData[1],
          textStyle: {
            color: '#FFFFFF',
            fontSize: 40
          },
          left: 'center',
          top: 'center'
        },
        angleAxis: {
          max: 100, // 满分
          clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['red', 'green']
            }
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '140%' // 图形大小
        },
        series: [{
          type: 'bar',
          data: [{
            value: parseInt(picChartData[1]),
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: picChartData[0].itemStyle.color // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: picChartData[0].itemStyle.color // 100% 处的颜色
                  }]
                }
              }
            }
          }],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 14,
          barGap: '-100%', // 两环重叠
          radius: ['49%', '52%'],
          z: 2
        }, { // 灰色环
          type: 'bar',
          data: [{
            value: 100,
            itemStyle: {
              color: 'rgba(255,255,255,.21)'
            }
          }],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 6,
          barGap: '-80%', // 两环重叠
          radius: ['48%', '53%'],
          z: 1
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
