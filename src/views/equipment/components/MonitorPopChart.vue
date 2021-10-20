<template>
  <!-- <div :class="className" :style="{height:height,width:width}" /> -->
  <div :class="className" :style="{height:height,width:width}">
      <div :id="popChart" :option="chartOptions"></div>
  </div>
</template>

<script>
import resize from './mixins/resize'
import HighCharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(HighCharts);
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
      default: '270px'
    },
    chartData: {
      type: Array,
      default: [22, 35, 99]
      //required: true
    },
    date:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      popChart: 'pop-chart',
      chart: null,
      chartOptions: {
        chart: {
          backgroundColor:'transparent',
          type: 'packedbubble',
          zoomType: 'xy',
          height: '100%'
        },
        title:{
          text: ''
        },
         tooltip: {
          enabled: false
        },
        legend: {
          itemStyle: {color: '#ffffff'}
        },
        credits: { enabled: false },
        plotOptions: {
          packedbubble: {
            minSize: '20%',
            maxSize: '90%',
            zMin: 0,
            zMax: 100,
            layoutAlgorithm: {
              dragBetweenSeries: true,

              bubblePadding:15,
              splitSeries:false,
              gravitationalConstant: 0.02
            },
            dataLabels: {
              enabled: true,
              format: '{point.value}',
              // filter: {
              // 	property: 'y',
              // 	operator: '>',
              // 	value: 250
              // },
              style: {
                color: '#FFF',
                textOutline: 'none',
                fontWeight: 'normal',
                fontSize: 16
              }
            }
          }
        },
        series: [{
          name: '正常',
          color: '#58d49a',
          type: 'packedbubble',
          data: [76]
        }, {
          name: '故障',
          color: 'rgb(255,255,24)',
          type: 'packedbubble',
          data: [45]
        }, {
          name: '预警',
          color: 'rgb(62,246,255)',
          type: 'packedbubble',
          data: [12]
        }]
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val);
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
      //this.chart = echarts.init(this.$el, 'macarons');
       this.setOptions(this.chartData);
      this.chart = HighCharts.chart(this.popChart,this.chartOptions)
    },
    setOptions(chartData){
      this.chartOptions = {
        chart: {
          backgroundColor:'transparent',
            type: 'packedbubble',
            zoomType: 'xy',
            height: '100%'
        },
        title:{
          text: ''
        },
        tooltip: {
          enabled: false
        },
        legend: {
          itemStyle: {color: '#ffffff'}
        },
        credits: { enabled: false },
        plotOptions: {
          packedbubble: {
            minSize: '20%',
              maxSize: '90%',
              zMin: 0,
              zMax: 100,
              layoutAlgorithm: {
              dragBetweenSeries: true,

                bubblePadding:15,
                splitSeries:false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
              enabled: true,
                format: '{point.value}',
                // filter: {
                // 	property: 'y',
                // 	operator: '>',
                // 	value: 250
                // },
                style: {
                color: '#FFF',
                  textOutline: 'none',
                  fontWeight: 'normal',
                  fontSize: 16
              }
            }
          }
        },
        series: [{
          name: '正常',
          color: '#58d49a',
          type: 'packedbubble',
          data: [chartData[0]]
        }, {
          name: '故障',
          color: 'rgb(255,255,24)',
          type: 'packedbubble',
          data: [chartData[1]]
        }, {
          name: '预警',
          color: 'rgb(62,246,255)',
          type: 'packedbubble',
          data: [chartData[2]]
        }]
      }

      this.chart = HighCharts.chart(this.popChart,this.chartOptions)
    }
  }
}
</script>
