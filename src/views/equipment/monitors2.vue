<template>
  <div class="monitor-container">
    <!-- 地图 -->
    <div id="map">
    </div>
    <div class="left">
      <div class="show-blk">
        <div class="title">设备状态汇总</div>
        <div class="content">
          <!--<div class="monitor-item">
            <div class="monitor-name">平均流速</div>
            <div class="monitor-val">232m³/h</div>
          </div>
          <div class="monitor-item">
            <div class="monitor-name">平均流速</div>
            <div class="monitor-val">232m³/h</div>
          </div>
          <div class="monitor-item">
            <div class="monitor-name">平均流速</div>
            <div class="monitor-val">232m³/h</div>
          </div>
          <div class="monitor-item">
            <div class="monitor-name">平均流速</div>
            <div class="monitor-val">232m³/h</div>
          </div>
          <div class="monitor-item">
            <div class="monitor-name">平均流速</div>
            <div class="monitor-val">232m³/h</div>
          </div> -->
          <div v-for="item in pieChartData" class="monitor-item">
            <div class="monitor-name">{{ item.name }}</div>
            <div class="monitor-val">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="show-blk">
        <div class="title">雷击数据</div>
        <div class='el-table-hight'>
          <el-table 
            id="tableList" 
            class="monitor-table"
            height="220"
            :data="reals"
            fit 
            highlight-current-row
            style="width: 100%; border-color: rgba(234,235,243,.2);border:none;"
            ref="tablelist">
            <el-table-column
              v-loading="loading"
              align="center"
              label="序号"
              min-width="40px"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="srow">
                <!-- <span  v-bind:style="{color:srow.row.colorss}" > {{srow.$index+1}} </span> -->
                <span style="color:rgba(255,255,255,.8)"> {{srow.$index+1}} </span>
              </template>
            </el-table-column>
            <el-table-column  min-width="50px" label="节点编号" align="center" show-overflow-tooltip  style="background: transparent">
              <template slot-scope="{row}">
                <!-- <span v-bind:style="{color:row.colorss}" >{{ row.addr }}</span> -->
                <span  style="color:rgba(255,255,255,.8)" >{{ row.addr }}</span>
              </template>
            </el-table-column>
            <el-table-column  min-width="50px" label="设备状态" align="center"  show-overflow-tooltip  style="background: transparent">
              <template slot-scope="{row}">
                <span v-bind:style="{color:row.colorss}"  >{{ row.ErrLeihuaStatusName }}</span>
              </template>
            </el-table-column>
          </el-table>
          </div>
      </div>
      <div class="show-blk">
        <div class="title">
          报警信息
          <!-- <div class="year-tab tab-clk">报警信息</div>
          <div class="year-tab">操作日志</div>-->
        </div>
        <div class=" tab-blk year-cur">
          <div class="content">
            <div class="detail-blk">
              <div class="count">设备总数：<span>72</span> &nbsp;&nbsp;&nbsp;&nbsp;在线设备：<span>72</span></div>
              <div class="box">
                <div class="item gz">
                  <div class="item-c">0</div>
                  <!-- <div class="item-t">低电压监测</div>-->
                </div>
                <div class="item yj">
                  <div class="item-c">0</div>
                  <!-- <div class="item-t">漏水监测</div>-->
                </div>
                <div class="item bj error" >
                  <div class="item-c">1</div>
                 <!--  <div class="item-t">离线监测</div>-->
                </div>
              </div>
            </div>
            <div class="detail-blk">
              <div class="warn-detail" >
                <div class="warn-title">最新告警</div>
                <div class="warn-line">告警类别：低电压</div>
                <div class="warn-line">产生时间：2020-03-12 12:00:03</div>
                <div class="warn-line">告警事件：低电压</div>
                <div class="warn-line">处理状态：完成</div>
              </div>
              <div class="warn-detail no-warn" style="display:none">
                <div class="warn-title">暂无告警</div>
              </div>
            </div>
          </div>
        </div>
        <!--
        <div class="tab-blk" style="display:none">
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
              <div class="row-fluid" id="map-line">
              </div>
              <div class="warn-msg-tit" style="padding-left: 10px;">
                <div style="flex: 4;">分区名称</div>
                <div style="flex: 6;">形成原因</div>
                <div>维修方式</div>
                <div>时间</div>
              </div>
              <div class="warn-msg-body">
                <div id="container">
                  <div id="list-wrapper">
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
        -->
      </div>
    </div>
    <div class="right">
      <div class="show-blk">
        <div class="title">近7日运行状态图</div>
        <div class="content">
          <div id="day-chart" class="chart-area">
            <line-chart :chart-data="lineChartData" :weeks="weeks" />
          </div>
        </div>
      </div>
      <div class="show-blk">
        <div class="title">状态概览</div>
        <div class="content">
          <div id="year-chart" class="chart-area">
            <pie-chart :chart-data="pieChartData" :azcount="azcount" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AMap from AMap;
// 导入chart组件
//import XChart from '@/views/utils/chart.vue'
import LineChart from './components/MonitorLineChart'
import PieChart from './components/MonitorPieChart'
import {parseTime} from "@/utils";
import store from "@/store";
import {fetchEvent} from "@/api/article";
export default {
  name: 'monitors',
  components: {
    LineChart,
    PieChart
  },
  data () {
    return {
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

      // markerIcons: {
      //   watermeter: {
      //     title: '水表',
      //     src: require('../../assets/images/marker.png')
      //   },
      //   pressure: {
      //     title: '压力表',
      //     src: require('../../assets/dma/marker-pressure.png')
      //   },
      //   smartvalve: {
      //     title: '智能阀',
      //     src: require('../../assets/dma/marker-smartvalve-1.png')
      //   },
      //   service: {
      //     title: '维修点',
      //     src: require('../../assets/dma/marker-service.png')
      //   },
      //   firehydrant: {
      //     title: '消防栓',
      //     src: require('../../assets/dma/marker-firehydrant.png')
      //   }
      // },
      animate: false,
      serviceList: [
        { id: 1, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 2, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 3, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' }
      ],
      lineChartData : {
        expectedData:[0, 0, 0, 0, 0, 0, 0],
        actualData:[0, 0, 0, 0, 0, 0, 0]
      },
      expectedData:[0, 0, 0, 0, 0, 0, 0],
      actualData:[0, 0, 0, 0, 0, 0, 0],
      pieChartData:[
         { value: 0, name: '正常' ,itemStyle:{color:"#65d186"}},
        // { value: 0, name: '故障',itemStyle:{color:"#f29e3c"} },
        // { value: 0, name: '报警' ,itemStyle:{color:"#f67287"}},
       // { value: 0, name: '正常' ,itemStyle:{color:"#3567EF"}},
        { value: 0, name: '故障',itemStyle:{color:"#e0d405"} },
        { value: 0, name: '预警' ,itemStyle:{color:"#F19433"}},
        { value: 0, name: '报警' ,itemStyle:{color:"#E93F33"}},
      ],
      barChart:[
        [0, 0, 0,0, 0, 0, 0],//正常
        [0, 0, 0,0, 0, 0, 0],//故障
        [0, 0, 0,0, 0, 0, 0],//预警
        [0, 0, 0,0, 0, 0, 0]//报警
      ],
      barChart222:[],
      azcount:0,
      reals:[],
      dataweek:[],
      weeks:[],
      loading:false,
      //00正常01预警10报警
      status: [
        {code:"",value:"未知"},
        {code:"00",value:"正常"},
        {code:"01",value:"预警"},
        {code:"10",value:"报警"},
      ],
      historyData:[],
      // 图表高度适配
      lineChartH: 0,
      barChartH: 0,
      pieChartH: 0
    }
  },
  computed: { //          监听词条
    getRealData(){
      return this.$store.state.app.reals
    }
  },
  watch: {
    getRealData: {
      handler(newValue,oldValue){ //当词条改变时执行事件
         console.log('new',newValue)
        // console.log('old',oldValue)
        this.reals = newValue;
        this.appendData(newValue);
      },
      deep: true
    }
  },
  mounted () {
  },
  created () {
    var day = null;
    for(let i=6;i>=0;i--){
      day = this.getWeek(-i);
      this.dataweek.push(day);
      this.weeks.push("星期"+parseTime(day, '{a}'));
      //this.statusChart[i].date=day;
    }
    this.reals = this.$store.state.app.reals;
    if(!this.relas || this.relas.length ==0){
      this.getReals();
      
    }
    
  },
  methods: {
    initMap: function () {
      var that = this
      that.mapObj = new AMap.Map('map', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/blue', // 地图样式
        center: [118.767413,32.041544],
        viewMode: '3D',
        buildingAnimation: true, // 可以让显示的建筑物变成动画现实
        zoom: 14
      });
      // marker点展示
      for (let i = 0; i < that.reals.length; i++) {
        const pointObj = that.reals[i]
        // var pointId = pointObj.deviceId
        // var pointType = pointObj.deviceType
        // var meterId = pointObj.meterId
        if(pointObj.longitude) {
          console.log(pointObj.longitude, pointObj.latitude)
          var pointlnglat = new AMap.LngLat(pointObj.longitude, pointObj.latitude)
          var mapMarker = new AMap.Marker({
            title: pointObj.pdcNo,
            // icon: that.markerIcons[pointType].src,
            icon: new AMap.Icon({
                size: new AMap.Size(30, 30), // 图标大小
                image: require('../../assets/images/marker.png')
            }),
            offset: new AMap.Pixel(-15, -30), // 设置点标记偏移量
            position: pointlnglat,
            clickable: true,
            map: that.mapObj,
            // extData: pointType + '-' + pointId + '-' + meterId
          })
          mapMarker.on('click', function (e) {
            that.markerClkFun(e, this)
          })
        }
      }
      that.mapObj.on('click', () => {
        that.mapObj.clearInfoWindow()
        // that.isShowInfo = false
      })
    },
    dataInit(){
      this.pieChartData=[
        { value: 0, name: '正常' ,itemStyle:{color:"#05FFFD"}},
        { value: 0, name: '故障',itemStyle:{color:"#CF8336"} },
        { value: 0, name: '预警' ,itemStyle:{color:"#9165F8"}},
        { value: 0, name: '报警' ,itemStyle:{color:"#E8554B"}},
      ];
      this.lineChartData.expectedData =this.expectedData;
      this.barChart222 = this.barChart;

      this.lineChartData ={
        expectedData:[0, 0, 0, 0, 0, 0, 0],
          actualData:[0, 0, 0, 0, 0, 0, 0]
      },
        this.expectedData=[0, 0, 0, 0, 0, 0, 0],
        this.actualData=[0, 0, 0, 0, 0, 0, 0],

        this.barChart = [
        [0, 0, 0,0, 0, 0, 0],
        [0, 0, 0,0, 0, 0, 0],
        [0, 0, 0,0, 0, 0, 0],
         [0, 0, 0,0, 0, 0, 0]
      ], this.barChart222=[];
    },
    async getReals(){
      this.relas = await store.dispatch('app/getReals',{reload:true} );
      await store.dispatch('app/setReals', this.relas);
      this.appendData(this.relas);
    },
    getWeek (day) {
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate =  this.doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
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
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getTTimeCount(item){ //获取雷击数
      //本年月份的雷击次数
      //var fdate = this.getDayByTime(item.In_Time);
      var i=6;
      // for(var i=0;i<this.dataweek.length;i++){
      //   var days = this.dataweek[i];
      //   if(days== fdate){
          this.actualData[i]+=item.TTime;
          //故障标志位，T有警报，F无故障，D离线故障
          if(item.ErrFlag == 'F'){
            this.barChart[0][i]++;
          }
          if(item.ErrFlag == 'D'){

            this.barChart[3][i]++;
          }else if(item.ErrFlag == 'T'){
            //01预警
            if(item.ErrThunder=='01' ||item.ErrLeihua=='01' ||item.ErrLC1=='01' ||item.ErrLC2=='01' ||
              item.ErrTemp=='01' || item.ErrLC3=='01'
            ){
              this.barChart[1][i]++;
              this.expectedData[i] ++;
            }

            //10报警
            if(item.ErrThunder=='10' ||item.ErrLeihua=='10' ||item.ErrLC1=='10' ||item.ErrLC2=='10' ||
              item.ErrTemp=='10' || item.ErrLC3=='10' || item.Switch1 =='1' || item.Switch2 =='1' || item.Switch3 =='1' || item.Switch4 =='1'
            ){
              this.barChart[2][i]++;
              this.expectedData[i] ++;
            }
          }
      //   }
      // }
      this.lineChartData.actualData =this.actualData;
      this.lineChartData.expectedData =this.expectedData;
      this.barChart222 = this.barChart;
    },
    getStateColor(code,yj){
      //{code:"00",value:"正常"},
      //{code:"01",value:"预警"},
      //{code:"10",value:"报警"},
      if(code == "F"){
        return "#4DD9D8";
      }
      if(code == "D"){
        return "#CF8336";
      }
      if(code == "T"){
        if(yj =="01"){
          return "#D7FF00";
        }
        if(yj =="10"){
          return "#E8554B";
        }
      }
    },
    appendData(data){//近一周状况
      this.dataInit();
      this.initMap();
      var context = this;
      context.azcount= this.reals.length;
      this.reals = this.reals.map((item)=>{

        context.getTTimeCount(item);

        //totalList计算total
        //故障标志位，T有警报，F无故障，D离线=故障
        if(item.ErrFlag == 'F'){
          context.pieChartData[0].value ++;
        }
        if(item.ErrFlag == 'T'){
            //01预警
            if(item.ErrThunder=='01' ||item.ErrLeihua=='01' ||item.ErrLC1=='01' ||item.ErrLC2=='01' ||
              item.ErrTemp=='01' || item.ErrLC3=='01'
            ){
              context.pieChartData[2].value ++;
              item.YJ="01";
            }

            //10报警
            if(item.ErrThunder=='10' ||item.ErrLeihua=='10' ||item.ErrLC1=='10' ||item.ErrLC2=='10' ||
              item.ErrTemp=='10' || item.ErrLC3=='10' || item.Switch1 =='1' || item.Switch2 =='1' || item.Switch3 =='1' || item.Switch4 =='1'
            ){
              context.pieChartData[3].value ++;
              item.YJ="10";
            }
        }
        if(item.ErrFlag == 'D'){
          context.pieChartData[1].value ++;
        }else{
          // context.zxcount++;
        }
        // context.azcount++;
        item.colorss = this.getStateColor(item.ErrFlag,item.YJ);
        item.ErrLeihuaStatusName = this.getStatusName(item.ErrFlag,item.YJ);
        return item;
      });
      this.getHistory();
      
    },
    getStatusName(code,yj){
      if(!code){
        return "未知";
      }
      let statusName = code;
      if(code == "F"){
        return "正常";
      }
      if(code == "D"){
        return "故障";
      }
      if(code == "T"){
        if(yj =="01"){
          return "预警";
        }
        if(yj =="10"){
          return "报警";
        }
      }
      return statusName;
    },
    getHistory(){
      if(this.historyData.length >0){
        this.hisData(this.historyData);
      }else{
        this.loading = true
        var obj = {
          url: 'get/history/tj/count',
          data: {
            currentPage:1,
            pageSize:10000
          }
        }
        var context = this;
        fetchEvent(obj).then(response => {
          context.historyData = response.responseBody;
          context.hisData(response.responseBody);
        })
      }
    },
    hisData(hisData){
      console.log(hisData);
     var barChart=
       [
        [0, 0, 0,0, 0, 0, this.barChart[0][6]],//正常
        [0, 0, 0,0, 0, 0, this.barChart[1][6]],//故障
        [0, 0, 0,0, 0, 0, this.barChart[2][6]],//预警
        [0, 0, 0,0, 0, 0, this.barChart[3][6]]//报警
      ];
      hisData.map((e)=>{
        for(var i=0;i<this.dataweek.length;i++) {
          var days = this.dataweek[i];
          if (days == e.In_Time) {
            this.actualData[i]=e.TTime;
            barChart[0][i]=e.zccount;
            barChart[3][i]=e.gzcount;
            barChart[1][i]=e.yjcount;
            barChart[2][i]=e.bjcount;
            this.expectedData[i] +=e.yjcount;
            this.expectedData[i] +=e.bjcount;
          }
        }
      });
      var a = {
        actualData:this.actualData,
        expectedData:this.expectedData
      };
      this.lineChartData =a;
      this.barChart222 = barChart;
    },
    _resizeVal (res) {
      let docEl = document.documentElement,
        clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res*fontSize;
    },
    scroll () {
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
.monitor-container{
  position: relative;
}
  #map{
    width:100%;
    min-height:900px;
    border: 1px solid #084E85;
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
    min-height:220px;
    width:458px;
    box-shadow: 0 2px 4px 0 rgba(255,255,255,0.03), inset 2px 2px 35px 0 rgba(255,255,255,0.10);
    border-radius: 10px;
    border: 1px solid rgba(26,165,230,.5);
    background:rgba(0,0,0,0.5);
  }
  .show-blk .content {
      z-index: 2;
      padding: 10px;
  }

  .show-blk .title {
    height:50px;
    background: rgba(26,165,230,.15);
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
    //background: url('~@/assets/showpage/arrow-left.png') no-repeat center center;
}

.btn_right {
    right: 0;
    //background: url('~@/assets/showpage/arrow-right.png') no-repeat center center;
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
  margin-right: 30px;
}
.monitor-item{
  width: 50%;
  display: inline-block;
  background: url(~@/assets/images/route.png) no-repeat;
  background-position: 20px 20px;
  background-size: 32px 32px;
  padding: 13px 0 0 65px;
}
.monitor-item .monitor-name{
  height: 20px;
  line-height: 20px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,.7);
  margin-bottom:10px;
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
    // min-height: 150px;
    // margin-bottom: 10px;
    overflow: hidden;
}

.detail-blk .box {
    display: flex;
    flex-direction: row;
    height: 120px;
    margin-top: 10px;
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
.detail-blk .box .item.gz .item-c::after{
  content: '故障';
}
.detail-blk .box .item.yj .item-c::after{
  content: '预警';
}
.detail-blk .box .item.bj .item-c::after{
  content: '报警';
}
.detail-blk .box .item.error .item-c {
    border-color: #ec414d;
    color: #ec414d;
}

.detail-blk .box .item.error .item-c::before {
  // top: 90px;
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
    background: rgba(40,186,243,0.1) url(~@/assets/images/warn.png) no-repeat;
    background-position: 43px 16px;
    background-size: 68px 68px;
    box-sizing: border-box;
    padding: 10px 0 10px 163px;
    position: relative;
}

.warn-detail .warn-title {
    position: absolute;
    top: 90px;
    left: 43px;
    color: #ec414d;
    font-size: 16px;
}
.warn-detail.no-warn{
    background-image: url(~@/assets/images/no-warn.png);
    background-position: center 10px;
    min-height: 110px;
    padding: 0;
}
.warn-detail.no-warn .warn-title{
    color:#4bcb73 ;
    text-align: center;
    width: 100%;
    left: 0;
    top: 80px;
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
    //background: url(~@/assets/map-info-t.svg) no-repeat;
    margin-top: -5px;
   }
   .map-info .bottom-b{
    height: 11px;
    //background: url(~@/assets/map-info-b.svg) no-repeat;
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
   .monitor-table.el-table thead th{
    background-color: transparent !important;
    color: #00CAFF;
    border-bottom: 1px solid #153a9a !important;
    height:30px !important;
    line-height:30px !important;
   }
   .monitor-table.el-table td{
      height:30px !important;
     line-height:30px !important;
     border-bottom:1px solid rgba(255,255,255,0.4);
   }
</style>
