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
    weeks:{
      type:Array,
      defaults:["星期一","星期二"]
    }
  },
  data() {
    return {
      chart: null,
      lineChartData: {
        zcData:[0, 0, 0, 0, 0, 0, 0],
        expectedData:[0, 0, 0, 0, 0, 0, 0],
        actualData:[0, 0, 0, 0, 0, 0, 0]
      },
      azcount:0,
      reals:[],
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
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
    setOptions({ zcData, expectedData, actualData } = {}) {
      let that = this
      let lMax = this._calcMaxNumber(zcData);
      let exMax = this._calcMaxNumber(expectedData);
      if(lMax < exMax){
         lMax = exMax;
      }
      // let lMin = this._calcMinNumber(expectedData);
      let rMax = this._calcMaxNumber(actualData);
      if(lMax < rMax){
        lMax = rMax;
      }
      // let rMin = this._calcMinNumber(actualData);
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        backgroundColor: 'transparent',
        xAxis: {
          show:true,
          data: this.weeks,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          // boundaryGap: false,
          axisTick: {
            show: false
          },
          position:'bottom',			//---x轴位置
          offset:0,					//---x轴相对于默认位置的偏移
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度
            margin: 10,					//---刻度标签与轴线之间的距离
            color:'rgba(255,255,255,0.8)',				//---默认取轴线的颜色
            fontSize:  12
          },
          // axisLine:{					//---坐标轴 轴线
          //   show:true,					//---是否显示
          //   lineStyle:{
          //     color:'rgba(255,255,255,0.8)',
          //     width:1,
          //     type:'solid',
          //   }
          // },
          // axisPointer: {
          //       type: 'shadow'
          //   }
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
          //  type: 'cross'
         // },
          padding: [5, 10],
          borderWidth: 2,
          borderColor: 'rgb(8,249,255)',
          borderRadius:0,
          backgroundColor: 'rgb(22,47,89)'

        },
        yAxis: [{
          // name:'正常数',
          show:true,					//---是否显示
          type:'value',			//---轴类型，默认'category'
          scale: true,
          axisLine:{					//---坐标轴 轴线
            show:false,					//---是否显示
            lineStyle:{
              color:'rgba(255,255,255,0.2)',
              width:1,
              type:'solid',
            },
          },
          axisTick: {
            show: false
          },
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度
            margin: 8,					//---刻度标签与轴线之间的距离
            color:'rgb(255,255,255)',
          },
          boundaryGap : 0,
          min: 0,
          max: lMax,
          splitNumber: 5,
          interval:lMax/5,
          minInterval:1,
          splitLine: {
            show: true,
            lineStyle:{
              color:'rgb(9,45,82)',
              width: 1,
              type: 'dottod'
            }
          },
          splitArea : {show : false}//保留网格区域
        },{
          // name:'警报数',
          show:true,					//---是否显示
          type:'value',			//---轴类型，默认'category'
          scale: true,
          axisLine:{					//---坐标轴 轴线
            show:false,					//---是否显示
            lineStyle:{
              color:'rgba(255,255,255,0.2)',
              width:1,
              type:'solid',
            },
          },
          axisTick: {
            show: false
          },
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度
            margin: 8,					//---刻度标签与轴线之间的距离
            color:'rgb(255,255,255)',
          },
          boundaryGap : 0,
          min: 0,
          max: lMax,
          splitNumber: 5,
          interval:lMax/5,
          minInterval:1,
          splitLine: {
            show: true,
            lineStyle:{
              color:'rgb(9,45,82)',
              width: 1,
              type: 'dottod'
            }
          },
          splitArea : {show : false}//保留网格区域
        },{
          // name:'雷击数',
          show:true,					//---是否显示
          type:'value',			//---轴类型，默认'category'
          scale: true,
          axisLine:{					//---坐标轴 轴线
            show:false,					//---是否显示
            lineStyle:{
              color:'rgb(213,16,16)',
              width:1,
              type:'solid',
            },
          },
          axisTick: {
            show: false
          },
          axisLabel:{					//---坐标轴 标签
            show:true,					//---是否显示
            inside:false,				//---是否朝内
            rotate:0,					//---旋转角度
            margin: 8,					//---刻度标签与轴线之间的距离
            color:'rgba(255,255,255,0.8)',				//---默认取轴线的颜色
          },
         boundaryGap : [ 0.2, 0.2 ],
         min: 0,
         max: lMax,
         splitNumber: 5,
         interval:lMax/5,
         splitLine: {
            show: true,
            lineStyle:{
              color:'rgb(9,45,82)',
              width: 1,
              type: 'dottod'
            }
          },
          splitArea : {show : false}//保留网格区域
        }],
        legend: {
          // type: 'scroll',
          right: 10,
          top: 10,
          //orient: 'horizontal',   // 水平
          // itemGap: that._resizeVal(0.2),            // 间隔
          // itemWidth: that._resizeVal(0.14),          // 图形宽度。
          // itemHeight: that._resizeVal(0.14),        // 图形高度。
          textStyle: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 14
          },
          data: ['正常数', '警报数', '雷击数']
        },
        series: [{
          name: '正常数',
          type: 'line',
          data: zcData,
          smooth: true,
          sampling: 'average',
          itemStyle: {
            color: '#65d186'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#9bfab7'
            }, {
              offset: 1,
              color: '#1f3927'
            }])
          },
        },{
          name: '警报数',
          type: 'line',
          data: expectedData,
          smooth: true,
           sampling: 'average',
            itemStyle: {
                color: 'rgba(21,227,234,1)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(21,227,234, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(21,227,234, .3)'
                }])
            },
        },
        {
          name: '雷击数',
          type: 'line',
          data: actualData,
          yAxisIndex: 1,
          smooth: true,
          sampling: 'average',
            itemStyle: {
                color: 'rgba(238,85,125, 1)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(238,85,125, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(238,85,125, .3)'
                }])
            },
        }]
      })
    },
    appendData(data){//近一周状况
      var context = this;

      for(var i=0;i<this.dataweek.length;i++){
        var days = this.dataweek[i];
        this.reals = this.reals.map((item)=>{
          let daye = context.getDayByTime(item.In_Time);

          if( days == daye){
            //故障标志位，T有故障，F无故障，D离线
            if(item.ErrFlag == 'T'){
              context.lineChartData.expectedData[i] ++;
            }
            if(item.TTime){
              context.lineChartData.actualData[i] +=item.TTime;
            }
            //01预警
            if(item.ErrThunder=='01' ||item.ErrLeihua=='01' ||item.ErrLC1=='01' ||item.ErrLC2=='01' ||
              item.ErrTemp=='01' || item.ErrLC3=='01'
            ){
              context.lineChartData.expectedData[i] ++;
            }

            //10预警
            if(item.ErrThunder=='10' ||item.ErrLeihua=='10' ||item.ErrLC1=='10' ||item.ErrLC2=='10' ||
              item.ErrTemp=='10' || item.ErrLC3=='10'
            ){
              context.lineChartData.expectedData[i] ++;
            }
            console.log(context.lineChartData)
            this.setOptions(context.lineChartData)
          }
          return item;
        });
      }
      this.lineChartData = context.lineChartData;
      console.log(this.dataweek);
      console.log(this.reals);
      console.log(this.lineChartData);

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
