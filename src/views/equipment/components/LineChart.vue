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
      type: Object,
      required: true
    },
    weeks:{
      type:Array,
      defaults:["星期一","星期二"]
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
        //console.log(val);
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
      var that = this
      this.chart.setOption({
        title: {
          text: '',
          subtext: '',
          left: 'left',
          textStyle:{
            fontSize: 16,
          },
        },
        xAxis: {
          // data: this.weeks,
          // boundaryGap: false,
          // axisTick: {
          //   show: false
          // },
          // position:'bottom',
          // type: 'category',
          data: this.weeks,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
         axisTick: {
            show: false
          },
          position:'bottom',			//---x轴位置
          offset:0,					//---x轴相对于默认位置的偏移
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度	
            margin: that._resizeVal(0.2),					//---刻度标签与轴线之间的距离
            color:'#ffffff',				//---默认取轴线的颜色
            fontSize: that._resizeVal(0.12)
          },
          axisLine:{					//---坐标轴 轴线
            show:false,					//---是否显示
            lineStyle:{
              color:'#fff',
              width:1,
              type:'solid',
            }
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          name: '雷击数',
          nameTextStyle: {
            color:'#ffffff',				//---默认取轴线的颜色
            fontSize: that._resizeVal(0.18)
          },
         type: 'value',
          axisTick: {
            show: false
          },
          axisLine:{					//---坐标轴 轴线
            show:true,					//---是否显示
            lineStyle:{
              color:'rgba(231,232,242,.5)',
              width:1,
              type:'dashed',
            },
          },
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度	
            margin: 8,					//---刻度标签与轴线之间的距离
            color:'#ffffff',				//---默认取轴线的颜色
            fontSize: that._resizeVal(0.18)
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle:{
              color:'rgba(231,232,242,.5)',
              width: 1,
              type: 'dashed'
            }
          },
          splitArea : {show : false}//保留网格区域
        },
        legend: {
          data: ['雷击数']
        },
        series: [{
          name: '雷击',
          itemStyle: {
            normal: {
              color: '#1AA5E6',
              lineStyle: {
                color: '#1AA5E6',
                width: 4
              // },
              // areaStyle: {
              //   color: '#f37e31'
              }
            }
          },
          smooth: true,
          symbol:'emptyCircle',
          symbolSize:8,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
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
