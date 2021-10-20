<template>
  <div class="page-header-index-wide my-showpage">
    <div id="map">
      <!-- 选择水表范围 -->
      <div class="water-points">
        <div class="point single unsel" data-type="single" title="单表" />
        <div class="point area unsel" data-type="area" title="分区" />
        <div class="point all" data-type="all" title="总表" />
      </div>
      <div class="show-points-type">
        设备运行状态
      </div>
    </div>
    <div class="left">
      <div class="show-blk">
        <div class="title">设备状态汇总</div>
        <div class="content">
          <div class="monitor-item card-panel1">
            <div class="monitor-name">正常</div>
            <div class="monitor-val">2988</div>
          </div>
          <div class="monitor-item card-panel2">
            <div class="monitor-name">故障</div>
            <div class="monitor-val">232m</div>
          </div>
          <div class="monitor-item card-panel3">
            <div class="monitor-name">预警</div>
            <div class="monitor-val">288</div>
          </div>
          <div class="monitor-item card-panel4">
            <div class="monitor-name">报警</div>
            <div class="monitor-val">232</div>
          </div>
        </div>
      </div>
      <div class="show-blk">
        <div class="title tab">
          <div class="year-tab tab-clk" data-type="year-cur">雷击数据</div>
          <div class="year-tab" data-type="year-history">历史数据</div>
        </div>
        <div class=" tab-blk year-cur">
          <div class="choose sel-year">
            <div class="box">
              <ul class="box_wheel">
                <li data-id="2016">2016年</li>
                <li data-id="2016">2017年</li>
                <li data-id="2016">2018年</li>
                <li data-id="2016">2019年</li>
                <li data-id="2016" class="clk">2020年</li>
              </ul>
            </div>
            <div class="btn btn_left" />
            <div class="btn btn_right" />
          </div>
          <div class="content">
            <div id="year-chart" class="chart-area year-chart">
              <x-chart :id="yearChart" :option="yearOption" />
            </div>
          </div>
        </div>
        <div class="tab-blk year-history">
          <div class="history-text">智慧水务综合服务平台历年用水趋势折线图，本年度将持续为您节水</div>
          <div class="content">
            <div id="year-history-chart" class="left-chart" />
          </div>
        </div>
      </div>
      <div class="show-blk">
        <div class="title tab">
          <div class="year-tab tab-clk">预警信息</div>
          <div class="year-tab">操作日志</div>
        </div>
        <div class=" tab-blk year-cur" style="display:none">
          <div class="content">
            <div class="detail-blk">
              <div class="count">设备总数：<span>1</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线设备：<span>1</span></div>
              <div class="box">
                <div class="item">
                  <div class="item-c">0</div>
                  <div class="item-t">低电压监测</div>
                </div>
                <div class="item">
                  <div class="item-c">0</div>
                  <div class="item-t">漏水监测</div>
                </div>
                <div class="item">
                  <div class="item-c">0</div>
                  <div class="item-t">离线监测</div>
                </div>
              </div>
            </div>
            <div class="detail-blk">
              <div class="warn-detail">
                <div class="warn-title">最新告警警</div>
                <div class="warn-line">告警类别：低电压</div>
                <div class="warn-line">产生时间：2020-03-12 12:00:03</div>
                <div class="warn-line">告警事件：低电压</div>
                <div class="warn-line">处理状态：完成</div>
              </div>
              <div class="warn-detail no-warn">
                <div class="warn-title">暂无告警</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-blk">
          <div class="detail-blk">
            <div class="count">设备总数：<span>1</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在线设备：<span>1</span></div>
            <div class="box">
              <div class="item ser-times">
                <div class="item-c">0</div>
                <div class="item-t">累计维修</div>
              </div>
              <div class="item ser-date">
                <div class="item-c">0</div>
                <div class="item-t">上次维修日期</div>
              </div>
              <div class="item ser-days">
                <div class="item-c">0</div>
                <div class="item-t">正常运行</div>
              </div>
            </div>
          </div>
          <div class="detail-blk">
            <div class="row-repair">
              <div id="map-line" class="row-fluid" />
              <div class="warn-msg-tit" style="padding-left: 10px;">
                <div style="flex: 4;">分区名称</div>
                <div style="flex: 6;">形成原因</div>
                <div>维修方式</div>
                <div>时间</div>
              </div>
              <div class="warn-msg-body">
                <div id="container">
                  <div id="list-wrapper">
                    <!-- <ul class="notice-list" id="notice-list"><li>
                      <div style="flex: 4;"><span>小学区</span></div>
                      <div style="flex: 6;">管段腐蚀严重</div>
                      <div>更换管段</div>
                      <div title="undefined">2019-07-01</div>
                    </li><li>
                      <div style="flex: 4;"><span>小学区</span></div>
                      <div style="flex: 6;">管段腐蚀严重</div>
                      <div>增加抱箍</div>
                      <div title="undefined">2019-07-01</div>
                    </li><li>
                      <div style="flex: 4;"><span>中学区</span></div>
                      <div style="flex: 6;">水管破裂</div>
                      <div>增加弯头抱箍</div>
                      <div title="undefined">2019-03-24</div>
                    </li><li>
                      <div style="flex: 4;"><span>中学区</span></div>
                      <div style="flex: 6;">阀门损坏</div>
                      <div>更换阀门</div>
                      <div title="undefined">2019-03-23</div>
                    </li><li>
                      <div style="flex: 4;"><span>小学区</span></div>
                      <div style="flex: 6;">阀门接口松动</div>
                      <div>增加橡皮垫，抱箍</div>
                      <div title="undefined">2019-03-18</div>
                    </li><li>
                      <div style="flex: 4;"><span>校门区</span></div>
                      <div style="flex: 6;">接口处松动</div>
                      <div>增加抱箍</div>
                      <div title="undefined">2019-03-17</div>
                    </li><li>
                      <div style="flex: 4;"><span>小学区</span></div>
                      <div style="flex: 6;">阀门损坏</div>
                      <div>更换阀门</div>
                      <div title="undefined">2019-03-16</div>
                    </li><li>
                      <div style="flex: 4;"><span>中学区</span></div>
                      <div style="flex: 6;">阀门螺丝脱落</div>
                      <div>增加橡皮垫</div>
                      <div title="undefined">2019-03-16</div>
                    </li></ul> -->
                    <ul id="con1" ref="con1" :class="{anim:animate==true}">
                      <li v-for="item in serviceList" :key="item.id">
                        <div style="flex: 4;"><span>{{ item.dma }}</span></div>
                        <div style="flex: 6;">{{ item.reason }}</div>
                        <div>{{ item.service }}</div>
                        <div>{{ item.time }}</div>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="show-blk">
        <div class="title">近7日运行状态图</div>
        <div class="content">
          <div id="day-chart" class="chart-area">
            <x-chart :id="dayChart" :option="dayOption" />
          </div>
        </div>
      </div>
      <div class="show-blk">
        <div class="title">状态概览</div>
        <div class="content">
          <div id="year-chart" class="chart-area">
            <x-chart :id="monthChart" :option="monthOption" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.js'
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
// import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
// import { mixinDevice } from '@/utils/mixin'
// 导入chart组件
// import XChart from '@/views/utils/chart.vue'

export default {
  mixins: [resize],
  // components: {
  // components: {
  //   ChartCard,
  //   MiniArea,
  //   MiniBar,
  //   MiniProgress,
  //   RankList,
  //   Bar,
  //   Trend,
  //   NumberInfo,
  //   MiniSmoothArea,
  //   XChart
  // },
  data() {
    return {
      dmaPwd: '', // dma 密码字段
      showDMAPwd: true, // 是否显示dma密码
      canDraw: false,
      mapType: '2d',
      drawType: '',
      location1: [], // 轨迹变量
      centerLNT: 0.00, // 中心点x
      enterLAT: 0.00, // 中心点y
      loading: true,
      mapObj: null, // 地图对象
      mouseTool: null, // 地图工具对象
      mouseToolOverlays: [], // 绘画的内容
      clickListener: null,
      selMarker: null,
      markerIndex: 0, // marker索引，每添加+1
      clkMarker: null, // 点击的marker
      clkLine: null, // 点击的线
      clkMarkerType: null, // 点击的maker类型
      isShowInfo: false, // 是否显示Info框
      markerIcons: {
        watermeter: {
          title: '水表'
          // src: require('../../assets/dma/marker-watermeter.png')
        },
        pressure: {
          title: '压力表'
          // src: require('../../assets/dma/marker-pressure.png')
        },
        smartvalve: {
          title: '智能阀'
          // src: require('../../assets/dma/marker-smartvalve-1.png')
        },
        service: {
          title: '维修点'
          // src: require('../../assets/dma/marker-service.png')
        },
        firehydrant: {
          title: '消防栓'
          // src: require('../../assets/dma/marker-firehydrant.png')
        }
      },
      yearChart: 'year-chart',
      yearOption: {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '', // 表头文字
          style: {
            display: 'none'
          }
        },
        legend: {
          enabled: false
        },
        xAxis: { // x轴显示的内容
          categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          //   plotbands: [{ // 可以显示一个方块，如果需要的话可以更改透明度和颜色
          //     from: 4.5,
          //     to: 6.5,
          //     color: 'rgba(68,170,213,0)' // 透明度和颜色
          // }],
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          crosshair: true
        },
        yAxis: { // y轴显示的内容
          gridLineColor: 'rgba(255, 255, 255, 0.15)',
          min: 0,
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 0.8)'
            }
          },
          title: {
            text: '用水量',
            enabled: false
          },
          allowDecimals: false
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          color: 'rgba(124, 236, 212, 0.85)',
          name: '用水量',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
      },
      monthChart: 'month-chart',
      monthOption: {
        chart: {
          type: 'areaspline',
          backgroundColor: 'transparent'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '', // 表头文字
          style: {
            display: 'none'
          }
        },
        legend: {
          enabled: true,
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          layout: 'vertical',
          y: 0,
          itemStyle: { 'color': 'rgba(255, 255, 255, 1)', 'fontWeight': 'skin' },
          padding: 3,
          itemMarginTop: 5,
          itemMarginBottom: 5
        },
        xAxis: { // x轴显示的内容
          categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          //   plotbands: [{ // 可以显示一个方块，如果需要的话可以更改透明度和颜色
          //     from: 4.5,
          //     to: 6.5,
          //     color: 'rgba(68,170,213,0)' // 透明度和颜色
          // }],
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          crosshair: true
        },
        yAxis: { // y轴显示的内容
          gridLineColor: 'rgba(255, 255, 255, 0.15)',
          min: 0,
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          title: {
            text: '用水量',
            enabled: false
          },
          allowDecimals: false
        },
        plotOptions: {
          areaspline: {
            marker: {
              radius: 3,
              symbol: 'circle'

            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          color: 'rgba(91, 143, 249, 1)',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(91, 143, 249, 1)'],
              [1, 'rgba(91, 143, 249, .1)']
            ]
          },
          name: '行政楼',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        },
        {
          color: 'rgba(90, 216, 166, 1)',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(90, 216, 166, 1)'],
              [1, 'rgba(90, 216, 166, .1)']
            ]
          },
          name: '教学楼',
          data: [5.0, 3.9, 2.5, 6.5, 7.4, 9.5, 12.2, 45.5, 43.3, 22.3, 32.9, 4.6]
        },
        {
          color: 'rgba(197, 61, 251, 1)',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(197, 61, 251, 1)'],
              [1, 'rgba(197, 61, 251, .1)']
            ]
          },
          name: '食堂',
          data: [3.0, 2.9, 6.5, 6.5, 5.4, 11.5, 14.2, 16.5, 13.3, 8.3, 8.9, 6.6]
        }]
      },
      dayChart: 'day-chart',
      dayOption: {
        chart: {
          type: 'area',
          backgroundColor: 'transparent'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '', // 表头文字
          style: {
            display: 'none'
          }
        },
        legend: {
          enabled: false
        },
        xAxis: { // x轴显示的内容
          categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          //   plotbands: [{ // 可以显示一个方块，如果需要的话可以更改透明度和颜色
          //     from: 4.5,
          //     to: 6.5,
          //     color: 'rgba(68,170,213,0)' // 透明度和颜色
          // }],
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          crosshair: true
        },
        yAxis: { // y轴显示的内容
          gridLineColor: 'rgba(255, 255, 255, 0.15)',
          min: 0,
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          title: {
            text: '用水量',
            enabled: false
          },
          allowDecimals: false
        },
        plotOptions: {
          area: {
            marker: {
              radius: 3,
              symbol: 'circle'

            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          color: 'rgba(247, 163, 92, 1)',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(247, 163, 92, 1)'],
              [1, 'rgba(247, 163, 92, .1)']
            ]
          },
          name: '用水量',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
      },
      animate: false,
      serviceList: [
        { id: 1, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 2, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 3, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' }
      ]
    }
  },
  mounted() {
    this.init()
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    this.map = new AMap.Map('map', {
      center: [103.22222, 36.33333],
      zoom: 14
    })
    setInterval(this.scroll, 1000)
  },
  methods: {
    init: function() {
      var that = this
      that.mapObj = new AMap.Map('map', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/blue', // 地图样式
        center: [118.937918, 32.099507],
        viewMode: '3D', // 变成了3d 地图了
        buildingAnimation: true, // 可以让显示的建筑物变成动画现实
        zoom: 17
      })
      that.mapObj.on('click', () => {
        that.mapObj.clearInfoWindow()
        that.isShowInfo = false
      })
      // 绘画工具
      that.mouseTool = new AMap.MouseTool(that.mapObj)
      // 监听draw事件可获取画好的覆盖物
      that.mouseTool.on('draw', (type, obj) => {
        that.mouseToolOverlays.push(type.obj)
        if (that.drawType === 'polyline') { // 折线获取线坐标
          that.drawPath = type.obj.getPath()
        } else { // marker 获取点坐标
          that.drawPath = [type.obj.w.position.lng, type.obj.w.position.lat]
        }
        that.drawByTool()
      })
    },
    // 地图类型 2x
    selMapType: function(value) {
      this.mapType = value
      // var type = new AMap.MapType({
      //   showControlButton: false,
      //   defaultType: 1 // 0:2d, 1:卫星
      //   })
      //   this.mapObj.addControl(type)
    },
    drawSelType: function(type) {
      var that = this
      if (this.canDraw) { // 密码验证通过可以绘画
        if (type !== that.drawType) {
          that.drawType = type
        } else {
          type = ''
          that.drawType = ''
        }
        if (type === '') {
          // 再次点击绘画类型，停止绘画
          that.mouseTool.close(true)
          console.log('return')
        } else if (type === 'polyline') {
          console.log('line')
          that.mouseTool.polyline({})
        } else {
          that.mouseTool.marker({})
        }
      } else {
        if (!this.showDMAPwd) {
          this.showDMAPwd = true
        }
      }
    },
    // 根据鼠标轨迹画图，绑定
    drawByTool: function() {
      var that = this
      that.mapObj.clearInfoWindow()
      that.isShowInfo = false
      setTimeout(function() {
        // that.mouseTool.close(true)
        // that.drawType = ''
        that.mapObj.remove(that.mouseToolOverlays)
      }, 100)
      if (that.drawType === 'polyline') {
        console.log('draw line...')
        var line = new AMap.Polyline({
          path: that.drawPath,
          strokeColor: '#066EEE', // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 5, // 线宽
          strokeStyle: 'solid', // 线样式
          map: that.mapObj
        })
        line.on('click', function(e) {
          console.log('lineclick')
          that.clkLine = line
          // infowin窗体内容
          var MyComponent = Vue.extend({
            methods: {
              deleteLine: function() {
                that.mapObj.remove(that.clkLine)
                that.clkLine = null
                that.mapObj.clearInfoWindow()
              }
            },
            template: '<div class="map-infowin">' +
                  '<div class="arrow"></div>' +
                  '<div class="info-line">' + e.lnglat + '</div>' +
                  '<div class="info-line" @click="deleteLine()">删除管线</div>' +
                '</div>'
          })
          var component = new MyComponent().$mount()
          var infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            content: component.$el,
            offset: new AMap.Pixel(2, -10)
          })
          infoWindow.open(that.mapObj, e.lnglat)
        })
      } else {
        console.log('draw marker...')
        const markerObj = that.markerIcons[that.drawType]
        that.markerIndex++
        var marker = new AMap.Marker({
          title: markerObj.title,
          icon: markerObj.src,
          position: that.drawPath,
          clickable: true,
          map: that.mapObj,
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
          // 设置拖拽效果
          raiseOnDrag: true,
          extData: that.drawType + '-' + that.markerIndex
        })
        marker.on('click', function(e) {
          // var _this = this
          debugger
          that.clkMarker = marker
          var curMarkerType = JSON.parse(JSON.stringify(e.target.getExtData()))
          // infowin窗体内容
          var clkMarkerType = curMarkerType.split('-')[0]
          var curMarkerInfo = that.markerIcons[clkMarkerType]
          that.clkMarkerType = clkMarkerType
          var MyComponent = Vue.extend({
            methods: {
              bindFun: function() {
                console.log('bind...')
                // 点击事件 使用 组件对象
                that.getUnBindList()
              },
              deleteMarker: function() {
                that.mapObj.remove(that.clkMarker)
                that.clkMarker = null
                that.mapObj.clearInfoWindow()
              }
            },
            template: '<div class="map-infowin">' +
                  '<div class="arrow"></div>' +
                  '<div class="info-line" @click="bindFun()">绑定' + curMarkerInfo.title + '</div>' +
                  '<div class="info-line" @click="deleteMarker()">删除' + curMarkerInfo.title + '</div>' +
                '</div>'
          })
          var component = new MyComponent().$mount()
          var infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            content: component.$el,
            offset: new AMap.Pixel(2, -45)
          })
          infoWindow.open(that.mapObj, e.target.getPosition())
        })
      }
    },
    scroll() {
      this.animate = true // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.serviceList.push(this.serviceList[0]) // 将数组的第一个元素添加到数组的
        this.serviceList.shift() // 删除数组的第一个元素
        this.animate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500)
    }

  }
}
</script>
<style lang="less">
.my-showpage{
  position: relative;
  background: url(~@/assets/images/bg1.jpg) no-repeat;
}
  #map{
    width:100%;
    height: 900px;
    border: 1px solid #084E85;
    border-radius: 8px;
    border-radius: 8px;
  }
  .left {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 458px;
      bottom: 0;
      z-index: 2;
  }

  .right {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 458px;
      bottom: 0;
      z-index: 2;
  }
  .show-blk {
    position: relative;
    margin-bottom: 10px;
    min-height:258px;
    width:458px;
    background:rgba(0,0,0,0.5);
    box-shadow: inset 0px 0px 45px 0px rgba(40,186,243,0.5);
    border:1px solid #187397;
    border-radius:8px;
  }
  .show-blk .content {
      z-index: 2;
      padding: 10px;
  }

  .show-blk .title {
    height:50px;
    background:rgba(40,186,243,0.2);
    border-radius:8px 8px 0px 0px;
    filter:blur(0px);
    text-align: center;
    font-size:20px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 50px;
  }

  .show-blk .title.tab {
      font-size: 0;
      text-align: left;
  }

  .show-blk .title.tab div {
      display: inline-block;
      width: 50%;
      text-align: center;
  }

  .show-blk .title.tab .year-tab {
      position: relative;
      font-size: 16px;
      color: rgba(255, 255, 255, .5);
      box-sizing: border-box;
      cursor: pointer;
  }

  .show-blk .title.tab .year-tab:after {
      content: '';
      position: absolute;
      left: 0;
      top: 30%;
      bottom: 30%;
      width: 100%;
      border-right: 1px solid rgba(40,186,243,0.4);;
      pointer-events: none;
      /* transform-origin: 0 0;
      -webkit-transform-origin: 0 0;
      transform: scale(0.5, 0.5);
      -webkit-transform: scale(0.5, 0.5); */
  }

  .show-blk .title.tab .year-tab:last-child::after {
      border: none;
  }

  .show-blk .title.tab .year-tab.tab-clk {
      color: #ffffff;
      font-size: 20px;
  }
  .history-text {
    background: #0081c2;
    height: 70px;
    color: #fff;
    box-sizing: border-box;
    padding: 10px;
    text-indent: 2em;
}

.show-blk .select {
    background: #0081c2;
    height: 70px;
    line-height: 70px;
    display: flex;
    flex-direction: row;
    padding: 0 10px;
}

.show-blk .select .sel-item {
    width: 125px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: rgba(255, 255, 255, .2);
    color: #fff;
    font-size: 18px;
    margin-right: 7px;
    margin-top: 10px;
}

.show-blk .select .sel-item.clk {
    background: #fff;
    color: #0081c2;
}

.show-blk .choose {
    background:rgba(40,186,243,0.2);
    height: 50px;
    line-height: 50px;
    position: relative;
    box-sizing: border-box;
}

.box {
    height: 44px;
    margin: 0 32px;
    position: relative;
    overflow: hidden;
}

.box_wheel {
    position: absolute;
    overflow: hidden;
}

.box_wheel li {
    /* width: 1040px;
    height: 500px;
    background: pink;
    text-align: center;
    line-height: 500px;
    float: left; */
    float: left;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background:rgba(40,186,243,0.2);
    color: #fff;
    font-size: 16px;
    margin-right: 25px;
    cursor: pointer;
    border:1px solid red;
}

.box_wheel li:last-child {
    margin-right: 0;
}

.box_wheel li.clk {
  background:rgba(40,186,243,1);
}

.sel-month .box {
    margin: 0 30px;
}

.sel-month .box_wheel li {
    width: 30px;
}
ul {
  padding: 0;
}
li {
    list-style: none;
}

.btn {
    position: absolute;
    top: 3px;
    width: 32px;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
}

.btn_left {
    left: 0;
    // background: url('~@/assets/showpage/arrow-left.png') no-repeat center center;
}

.btn_right {
    right: 0;
   //  background: url('~@/assets/showpage/arrow-right.png') no-repeat center center;
}

.show-blk .count {
    height: 46px;
    line-height: 50px;
    font-size:13px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(40,186,243,1);
    padding-left: 15%;
    padding-right: 15%;
}

.show-blk .count span {
    font-size:25px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-left: 40px;
}
.show-blk .count span:first-child{
  margin-right: 60px;
}
.monitor-item{
  width: 50%;
  height: 82px;
  border-radius: 50%;
  display: inline-block;
  // background: url(~@/assets/showpage/route.png) no-repeat;
  background-position: 20px 20px;
  background-size: 32px 32px;
  padding: 9% 0 0 20%;
}
.monitor-item .monitor-name{
  height: 20px;
  line-height: 20px;
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,.7);
}
.monitor-item .monitor-val{
  font-size:18px;
  font-family:PingFangSC-Light,PingFang SC;
  font-weight:300;
  color:rgba(255,255,255,.9);
}
.year-history{
  display:none;
}
.detail-blk {
    min-height: 150px;
    margin-bottom: 10px;
    overflow: hidden;
}

.detail-blk .box {
    display: flex;
    flex-direction: row;
    height: 120px;
    margin: 0;
}

.detail-blk .box .item {
    height: 120px;
    width: 145px;
}

.detail-blk .box .item .item-t {
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
}

.detail-blk .box .item .item-c {
    width: 86px;
    height: 86px;
    border: 4px solid rgba(72,198,110,1);
    border-radius: 50%;
    position: relative;
    margin: auto;
    text-align: center;
    line-height: 100px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(72,198,110,1);
}

.detail-blk .box .item .item-c::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    width: 68px;
    height: 68px;
    border: 1px solid rgba(72,198,110,1);
    border-radius: 50%;
}

.detail-blk .box .item .item-c::after {
    content: '报警';
    position: absolute;
    top: 13px;
    left: 23px;
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(72,198,110,1);
    line-height: 20px;
}

.detail-blk .box .item.error .item-c {
    border-color: #ec414d;
    color: #ec414d;
}

.detail-blk .box .item.error .item-c::before {
  top: 90px;
    border-color: #ec414d;
}

.detail-blk .box .item.error .item-c::after {
    color: #ec414d;
}
.detail-blk .box .item.ser-times .item-c,
.detail-blk .box .item.ser-date .item-c,
.detail-blk .box .item.ser-days .item-c{
  line-height: 54px;
}
.detail-blk .box .item.ser-times .item-c::after{
  content: '次';
  top: 47px;
  left: 30px;
}
.detail-blk .box .item.ser-date .item-c::after{
  content: '号';
  top: 47px;
  left: 30px;
}
.detail-blk .box .item.ser-days .item-c::after{
  content: '天';
  top: 47px;
  left: 30px;
}

.warn-msg-tit {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00CAFF;
    font-size: 12px;
    border-bottom: 1px solid #112B6F;
}
.warn-msg-tit div {
    flex: 5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
}

#list-wrapper{
    height: 32px;
    overflow: hidden;
}
.anim{
    transition: all 0.5s;
    margin-top: -30px;
}
// #con1 li{
//     list-style: none;
//     line-height: 30px;
//     height: 30px;
// }
#list-wrapper li,.list-wrapper1 li {
    height: 30px;
    display: flex;
    font-size: 11px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #19459B;
}

#list-wrapper li div ,.list-wrapper1 li div{
    flex: 5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    white-space: nowrap;
}

#list-wrapper li ,.list-wrapper1 li{
    color: #FFFFFF;
}
.warn-detail {
    margin: 10px;
    // background: rgba(40,186,243,0.1) url(~@/assets/showpage/warn.png) no-repeat;
    background-position: 43px 20px;
    background-size: 68px 68px;
    box-sizing: border-box;
    padding: 20px 0 20px 163px;
    position: relative;
}

.warn-detail .warn-title {
    position: absolute;
    top: 95px;
    left: 43px;
    color: #ec414d;
    font-size: 16px;
}
.warn-detail.no-warn{
   // background-image: url(~@/assets/showpage/no-warn.png);
    background-position: center 10px;
    min-height: 125px;
    padding: 0;
}
.warn-detail.no-warn .warn-title{
    color:#4bcb73 ;
    text-align: center;
    width: 100%;
    left: 0;
}

.warn-detail .warn-line {
    color:rgba(255,255,255,1);
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    line-height: 24px;
}
  .chart-area{
    height: 330px;
  }
  .chart-area.year-chart{
    height: 240px;
  }

.water-points {
    position: absolute;
    bottom: 30px;
    left: 458px;
    right: 458px;
    height: 110px;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    justify-content: space-around;
    align-items: center;
    z-index: 2;
}

.water-points .point {
  width: 110px;
  height: 110px;
  background-position: center;
  // border: 1px solid #187397;
}

.water-points .point.single.unsel {
    // background-image: url(~@/assets/showpage/p-single-unsel.png);
}

.water-points .point.single {
    // background-image: url(~@/assets/showpage/p-single.png);
}

.water-points .point.area.unsel {
    // background-image: url(~@/assets/showpage/p-area-unsel.png);
}

.water-points .point.area {
    // background-image: url(~@/assets/showpage/p-area.png);
}

.water-points .point.all.unsel {
    // background-image: url(~@/assets/showpage/p-all-unsel.png);
}

.water-points .point.all {
    // background-image: url(~@/assets/showpage/p-all.png);
}

.show-points-type {
    position: absolute;
    left: 500px;
    right: 500px;
    top: 10px;
    height:50px;
    line-height: 50px;
    background:rgba(0,0,0,0.5);
    box-shadow:0px 6px 8px 0px rgba(0,0,0,0.5);
    border-radius:8px;
    // opacity:0.6;
    font-size:20px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    z-index: 2;
}
  .ant-radio-group.ant-radio-group-outline.ant-radio-group-default{
   width: 176px;
   height: 28px;
    border: 1px solid #084E85;
    border-radius: 8px;
    border-radius: 8px;
  }
  .ant-radio-button-wrapper{
    background: rgba(255,255,255,0.05);
    border: 1px solid #084E85;
    position: relative;
    display: inline-block;
    height: 28px;
    margin: 0;
    padding: 0 15px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #F0F0F0;
    line-height: 28px;
    border: 1px solid #d9d9d9;
    border-top-width: 1.02px;
    border-left: 0;
    cursor: pointer;
    -webkit-transition: color 0.3s, background 0.3s, border-color 0.3s;
    transition: color 0.3s, background 0.3s, border-color 0.3s;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child{
    background: #015FA9;
    border-color: none !important;
    border-radius: 8px;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
  // 地图气泡
  .map-infowin{
    position: relative;
    padding: 9px 0;
    width: 162px;
    height: 86px;
    background:rgba(255,255,255,0.4);
    border-radius: 18px;
  }
  .map-infowin .info-line {
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-family:SourceHanSansSC-Medium,SourceHanSansSC;
    font-weight:500;
    color:rgba(0,0,0,1);
    border-bottom: 1px solid #476B86;
    cursor: pointer;
  }
  .map-infowin .info-line:last-child{
    border:none;
  }
  .map-infowin .arrow {
    position: absolute;
    width: 162px;
    height: 20px;
    bottom: -20px;
    left: 0;
    // background: url(~@/assets/Mask.svg) no-repeat;
    background-position: center -42px;
  }
  .map-info{
    position: absolute;
    left: 46px;
    top: 38px;
    width: 322px;
    z-index: 1;
  }
   .map-info .top-b{
    height: 10px;
    // background: url(~@/assets/map-info-t.svg) no-repeat;
    margin-top: -5px;
   }
   .map-info .bottom-b{
    height: 11px;
    // background: url(~@/assets/map-info-b.svg) no-repeat;
   }
   .map-info .info-title{
    height:25px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(240,240,240,1);
    line-height:25px;
    text-align: center;
   }
   .map-info .info-con{
    height:200px;
    padding: 20px 0;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(240,240,240,1);
    line-height:20px;
    border-left: 1px solid rgba(8,78,133,1);;
    border-right: 1px solid rgba(8,78,133,1);;
    background-color: rgba(255,255,255,0.1);
    box-sizing: border-box;
   }
   .map-info .info-con .info-line{
    height: 40px;
    line-height: 40px;
    border-bottom:1px solid #28BAF3;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(240,240,240,1);
    box-sizing: border-box;
    padding: 0 20px;
   }
   .map-info .info-con .info-line:last-child{
     border:none;
   }
</style>
