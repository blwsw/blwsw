<template>
  <div class="monitor-container">

    <div class="div-col left">
      <div class="grid-content left-1">
          <div class="title">
            实时运行情况
          </div>
          <div class="content-main">
            <div class="data-row">
              <div class="normal">{{pieChartData[0].value}}</div>
              <div class="percent">
                <div class="per-val down"><i class="el-icon-bottom"></i> {{(azcount/pieChartData[0].value).toFixed(2)}}</div>
                %</div>
              <!-- <div class="percent">同比<div class="per-val up"><i class="el-icon-top"></i>22</div>%</div> -->
            </div>
            <div class="real-chart-area">
              <real-chart :chart-data="TimeTj" :FLHHTIME="FLHHTIME"  />
            </div>

          </div>
        </div>
        <div class="grid-content left-2">
          <div class="title">
            设备巡检状态
          </div>
          <div class="content-main" style="margin-left:0; margin-right:0" @click="tolist('all')">
            <div class="devices left">
              <div class="device-blk">
                <el-row class="device-row left-data" :xs="24" :sm="24" :lg="12" v-bind:key="n.ID" v-for="(n,index) in xzztList.slice(0,4)">
                  <el-col :span="1" class="no" v-bind:class="{ 'zc': n.ErrLeihuaStatusName == '正常','bj':n.ErrLeihuaStatusName == '报警','gz':n.ErrLeihuaStatusName == '故障','yj':n.ErrLeihuaStatusName == '预警' }">{{ index+1 }}</el-col>
                  <el-col :span="10" :title="n.name">{{ n.name }}</el-col>
                  <el-col :span="4">{{ n.addr }}</el-col>
                  <el-col :span="5">{{ n.ErrLeihuaStatusName }}</el-col>
                </el-row>
              </div>
              <div class="device-blk">
                <el-row class="device-row" :xs="24" :sm="24" :lg="12" v-bind:key="n.ID" v-for="(n,index) in xzztList.slice(4,8)">
                  <el-col :span="1" class="no" v-bind:class="{ 'zc': n.ErrLeihuaStatusName == '正常','bj':n.ErrLeihuaStatusName == '报警','gz':n.ErrLeihuaStatusName == '故障','yj':n.ErrLeihuaStatusName == '预警' }">{{ index+5 }}</el-col>
                  <el-col :span="10" :title="n.name">{{ n.name }}</el-col>
                  <el-col :span="4">{{ n.addr }}</el-col>
                  <el-col :span="5">{{ n.ErrLeihuaStatusName }}</el-col>
                </el-row>
              </div>
            </div>
            <!-- <el-row class="device-row" :xs="24" :sm="24" :lg="12" v-bind:key="n.ID" v-for="(n,index) in xzztList">

                  <el-col :span="4" class="no">{{ index+1 }}</el-col>
                  <el-col :span="5">{{ n.name }}</el-col>
                  <el-col :span="4">{{ n.ID }}</el-col>
                  <el-col :span="8">{{ n.InstallPos }}</el-col>
                  <el-col :span="4">{{ n.ErrLeihuaStatusName }}</el-col>
                </el-row> -->
          </div>
        </div>
        <div class="grid-content left-3">
          <div class="title">
            接地电阻监测信息
          </div>
          <div class="content-main" @click="tolist('jd')">
            <marquee direction="up" align="absmiddle" style="padding:5px" behavior="scroll" height="140" hspace="0" vspace="0" loop="-1" scrollamount="6" scrolldelay="200" onMouseOut="this.start()" onMouseOver="this.stop()">
              <template v-for="x in jdxzztList" >
                <el-row class="info-line" :gutter="5" >
                  <el-col :span="8">{{x.inTime}}</el-col>
                  <el-col :span="3">{{x.name}}</el-col>
                  <el-col :span="3">{{x.addr}}</el-col>
                  <el-col :span="6">{{x.InstallPos}}</el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'F'" class="status on"></el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'T' && '1' ==x.ErrR "  class="status off"></el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'T' && '0' ==x.ErrR "  class="status yj"></el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'D' "  class="status gz"></el-col>
                </el-row>
              </template>
            </marquee>
          </div>
        </div>
    </div>
    <div class="div-col center">
      <div class="grid-content center-1">
          <div class="weather-main">
            <img v-if="!realWeatherData.wea_img" v-bind:src="require('../../assets/images/weather-icons/qing.png')" class="real-img" alt="">
            <img v-if="realWeatherData.wea_img" v-bind:src="require('../../assets/images/weather-icons/'+realWeatherData.wea_img+'.png')" class="real-img" alt="">
            <div v-if="realWeatherData" class="wea">{{realWeatherData.wea}}</div>
            <div v-if="realWeatherData" class="tem">{{realWeatherData.tem}}°</div>
            <div class="time-hour">{{curHour}}</div>
            <div class="time-date">{{curDay}}</div>
            <div class="time-week">{{weekDay[curWeek]}}</div>

            <div class="tem-range">最低 {{realWeatherData.tem_night}}° / 最高 {{realWeatherData.tem_day}}°</div>
            <div class="week-data" v-if="weekWeatherData && weekWeatherData.data">
              <div class="weekObj" v-for="(weatherObj,index) in weekWeatherData.data.slice(1,4)" :key="index">
                <img v-bind:src="require('../../assets/images/weather-icons/'+weatherObj.wea_img+'.png')" class="week-img" alt="">
                <div class="week-day">{{weekDay[weatherObj.week]}}</div>
                <div class="week-temrange">{{weatherObj.tem_night}}°/{{weatherObj.tem_day}}°</div>
              </div>
            </div>
            <div class="city">{{realWeatherData.city}}</div>
            <div class="update-time" @click="refreshWeather">{{realWeatherData.update_time}} 发布</div>
          </div>
        </div>
        <div class="grid-content center-2">
          <div class="title">
            近七日雷击报警折线图
          </div>
          <div class="content-main">
            <div class="week-chart-area">
              <line-chart :chart-data="lineChartData" :weeks="weeks" />
            </div>
          </div>
        </div>
    </div>
    <div class="div-col right">
      <div class="grid-content right-1">
          <div class="title">
            系统运行状态良率指标
          </div>
          <div class="content-main">
            <div class="sys-status">
              <div class="status-item zc" style="color:rgb(67,248,72);">
                <div class="status-desc">正常</div>
                <div class="status-line">
                  <div class="status-val" :style="'width:'+((pieChartData[0].value/azcount)*100).toFixed(2)+'%;'"></div>
                </div>
                <div class="status-precent">{{((pieChartData[0].value/azcount)*100).toFixed(2)}}%</div>
              </div>
              <div class="status-item gz" style="color:rgb(229,179,47);">
                <div class="status-desc">故障</div>
                <div class="status-line">
                  <!-- <div class="status-val"  :style="'width:'+ pieChartData[1].value == 0 ? 0 : (azcount/pieChartData[1].value).toFixed(2) +'%;'"></div>-->
                    <div class="status-val" :style="'width:'+(100*(pieChartData[1].value/azcount)).toFixed(2) +'%;'"></div>

               </div>
               <div class="status-precent">{{(100*(pieChartData[1].value/azcount)) === Infinity ? 0 : (100*(pieChartData[1].value/azcount)).toFixed(2)}}%</div>
             </div>
             <div class="status-item bj" style="color:rgb(240,73,116)">
               <div class="status-desc">报警</div>
               <div class="status-line">
                 <div class="status-val" :style="'width:'+ ((pieChartData[3].value/azcount)*100).toFixed(2) +'%;'"></div>
               </div>
               <div class="status-precent">{{((pieChartData[3].value/azcount)*100) === Infinity ?0:((pieChartData[3].value/azcount)*100).toFixed(2)}}%</div>
             </div>
             <div class="status-item yj" style="color:rgb(157,86,246);">
               <div class="status-desc">预警</div>
               <div class="status-line">
                 <div class="status-val" :style="'width:'+ ((pieChartData[2].value/azcount)*100).toFixed(2) +'%;'"></div>
               </div>
                <div class="status-precent">{{((pieChartData[2].value/azcount)*100) === Infinity ?0:((pieChartData[2].value/azcount)*100).toFixed(2)}}%</div>
              </div>
            </div>

          </div>
        </div>
        <div class="grid-content right-2">
          <div class="title">
            系统运行状态图
          </div>
          <div class="content-main">
            <div class="pop-status">
              <div class="pop-type">
                <div class="type-item" v-bind:class="{ 'clk': this.seleType ==0 }" @click="handleSetLineChartData(0)">大气电场仪监测系统</div>
                <div class="type-item " v-bind:class="{ 'clk': this.seleType ==1 }" @click="handleSetLineChartData(1)">电涌保护器监测系统</div>
                <div class="type-item" v-bind:class="{ 'clk': this.seleType ==2 }" @click="handleSetLineChartData(2)">接地电阻仪监测系统</div>
             </div>
             <div class="pop-show">
                <!-- <pop-chart :chartData="barChart" /> -->
                 <div class="type-item-val zc" >{{barChart[0]}}</div>
                <div class="type-item-val bj">{{barChart[1]}}</div>
                <div class="type-item-val gz" >{{barChart[2]}}</div>
              </div>
            </div>

          </div>
        </div>
        <div class="grid-content right-3">
          <div class="title">
            电涌保护器监测信息
          </div>
          <div class="content-main"  @click="tolist('dy')">
            <marquee  direction="up" align="absmiddle" style="padding:5px" behavior="scroll" height="140" hspace="0" vspace="0" loop="-1" scrollamount="6" scrolldelay="200" onMouseOut="this.start()" onMouseOver="this.stop()">

              <template v-for="x in lyxzztList">
                <el-row class="info-line" :gutter="5" >
                  <el-col :span="8">{{x.inTime}}</el-col>
                  <el-col :span="3">{{x.name}}</el-col>
                  <el-col :span="3">{{x.addr}}</el-col>
                  <el-col :span="6">{{x.InstallPos}}</el-col>
                  <el-col :span="2" v-if="x.ErrLeihuaStatusName == '正常'" class="status on"></el-col>
                  <el-col :span="2" v-if="x.ErrLeihuaStatusName == '报警'" class="status off"></el-col>
                  <el-col :span="2" v-if="x.ErrLeihuaStatusName == '故障'" class="status gz"></el-col>
                  <el-col :span="2" v-if="x.ErrLeihuaStatusName == '预警'" class="status yj"></el-col>
                </el-row>
              </template>

            </marquee>
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
import PopChart from './components/MonitorPopChart'
import RealChart from './components/MonitorRealChart'
import {parseTime} from "@/utils";
import store from "@/store";
import {fetchEvent} from "@/api/article";
export default {
  name: 'monitors',
  components: {
    RealChart,
    LineChart,
  },
  data () {
    return {
      timer: "",//定义一个定时器的变量
      curHour: '', // 当前小时分钟
      curDay:'',
      curWeek: '',
      weekDay:["周日","周一","周二","周三","周四","周五","周六"],
      realWeatherData:{}, // 实况
      weekWeatherData: {}, // 一周预报
      nowtem: '',

      loading: true,
      animate: false,
      serviceList: [
        { id: 1, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 2, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' },
        { id: 3, dma: '行政楼', reason: '管段腐蚀严重', service: '更换管段', time: '2020-02-02' }
      ],
      lineChartData : {
        zcData: [0, 0, 0, 0, 0, 0, 0],
        expectedData: [0, 0, 0, 0, 0, 0, 0],
        actualData: [0, 0, 0, 0, 0, 0, 0]
      },
      zcData: [0, 0, 0, 0, 0, 0, 0],
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
      barChart: [
        [0, 0, 0]
      ],
      barChart222: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
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
      historyData: [],
      TimeTj: {
        zc: [], //[0, 0, 0, 0, 0, 0, 0, 0, 0],
        gz: [], //[0, 0, 0, 0, 0, 0, 0, 0, 0],
        yj: [], //[0, 0, 0, 0, 0, 0, 0, 0, 0],
        bj: [] //[0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      // 图表高度适配
      lineChartH: 0,
      barChartH: 0,
      pieChartH: 0,
      xzztList: [],
      jdxzztList: [],
      lyxzztList: [],
      seleType: 1,
      FLHHTIME: '20',
      nowTimeIndex: 0,
      pageIndex: 0,
      dataResonCout:0
    }
  },
  computed: { //          监听词条
    getRealData(){
      return this.$store.state.app.reals
    },
    getNewData(){
      return this.$store.state.app.newData
    }
  },
  watch: {
    getRealData: {
      handler(newValue,oldValue){ //当词条改变时执行事件
         //console.log('new-sy-monitors',newValue)
        // console.log('old',oldValue)
        //this.reals = newValue;
        //this.appendData(newValue);
      },
      deep: true
    },
    getNewData: {
      handler(newValue,oldValue){
       // console.log('new',newValue)
        this.setNewData(newValue);
      },
      deep: true
    }
  },
  mounted() {

  // window.WIDGET = {CONFIG: {
  //   "layout": "1",
  //   "width": "450",
  //   "height": "260",
  //   "background": "1",
  //   "borderRadius": "5",
  //   "dataColor": "FFFFFF",
  //   "key": "9c2da304bda3442bbc00e48e259facad"
  // }}
  //   var script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
  //   document.getElementsByTagName('head')[0].appendChild(script);
  },
  created () {
    this.searchWeather()
    var day = null;
    for(let i=6;i>=0;i--){
      day = this.getWeek(-i);
      this.dataweek.push(day);
      this.weeks.push("星期"+parseTime(day, '{a}'));
      //this.statusChart[i].date=day;
    }
    this.dataspppd();
      this.setIntervalData();
    /**
    //时间
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      //修改数据date
      _this.curHour =
        _this.doHandleMonth(new Date().getHours()) +
        ":" +
        _this.doHandleMonth(new Date().getMinutes());
      _this.curWeek = new Date().getDay();
      _this.curDay =
        _this.doHandleMonth(new Date().getMonth()+1) +
        "/"+
        _this.doHandleMonth(new Date().getDate())

      var beginIndex = _this.pageIndex*8;
      var endIndex = (_this.pageIndex+1)*8;
      if(_this.xzztList){
        if(_this.reals.length <= beginIndex) {
          _this.pageIndex =0;
          beginIndex = _this.pageIndex*8;
          endIndex = (_this.pageIndex+1)*8;
        }
        _this.xzztList = _this.reals.slice(beginIndex,endIndex);
        _this.pageIndex++;
      }
    }, 2000);
**/
  },
  methods: {
    setIntervalData(){
      var t=this;
      this.timer=setInterval((function(){
        t.curHour=t.doHandleMonth((new Date).getHours())+":"+t.doHandleMonth((new Date).getMinutes()),
          t.curWeek=(new Date).getDay(),
          t.curDay=t.doHandleMonth((new Date).getMonth()+1)+"/"+t.doHandleMonth((new Date).getDate());
        var a=8*t.pageIndex,
          e=8*(t.pageIndex+1);
        t.xzztList&&(t.reals.length<=a&&(t.pageIndex=0,a=8*t.pageIndex,e=8*(t.pageIndex+1)),
          t.xzztList=t.reals.slice(a,e),t.pageIndex++),
          t.dataResonCout++,
        t.dataResonCout>5&&(t.dataResonCout=0,t.getAllReals()),
          clearInterval(t.timer),
          t.setIntervalData()
      }),2000)
    },
    dataspppd(){
      var t=this,
        a={url:"uc/getRealsData",data:{}};
      fetchEvent(a).then((function(a){
          var e=a.responseBody;
          console.log(e),
            t.setNewData(e)
        }
        ))
    },
    getAllReals(){
      this.loading = true
      var obj = {
        url: 'uc/getAllReals',
        data: {
        }
      }
      var context = this;
      fetchEvent(obj).then(response => {
        var e=response.responseBody;
        console.log("主动请求"),
          context.dataResonCout =0 ,
          context.appendRealData(e)
      });
    },

    tolist(ppame){
      this.$nextTick(() => {
        this.$router.push({ name: 'device-list-tab', params: { ppame: ppame }})
      })
    },
    refreshWeather(){
      this.searchWeather();
    },
    searchWeather:async function(){//注意：这里有 async 用来完成异步操作
      let that = this
      // 天气实况
      let httpUrl = `http://tianqiapi.com/free/day?appid=98755174&appsecret=3dJbM7Vk&vue=1`
      let res = await fetch(httpUrl)
      let dayResult = await res.json()
      console.log(dayResult)
      that.realWeatherData = dayResult;

      //7日预报
      let httpUrl1 = `http://tianqiapi.com/free/week?appid=98755174&appsecret=3dJbM7Vk&vue=1`
      let res1 = await fetch(httpUrl1)
      let weekResult = await res1.json()
      console.log(weekResult)
      for (let i = 0; i < weekResult.data.length; i++) {
        var weekObj = weekResult.data[i];
        var aTime = new Date(Date.parse(weekObj.date));
        weekObj.week = aTime.getDay()
      }
      that.weekWeatherData = weekResult;
    },
    dataInit(){
      this.pieChartData=null,
      this.expectedData=null,
      this.actualData=null,
      this.zcData=null,
      this.barChart=null,
      this.barChart222=null,
      this.expectedData=[0,0,0,0,0,0,0],
      this.actualData=[0,0,0,0,0,0,0],
      this.zcData=[0,0,0,0,0,0,0],
      this.barChart=[0,0,0],
      this.barChart222=[[0,0,0],[0,0,0],[0,0,0]],
      this.pieChartData=[
        {value:0,name:"正常",itemStyle:{color:"#05FFFD"}},
        {value:0,name:"故障",itemStyle:{color:"#CF8336"}},
        {value:0,name:"预警",itemStyle:{color:"#9165F8"}},
        {value:0,name:"报警",itemStyle:{color:"#E8554B"}}],
      this.lineChartData={
        zcData:[0,0,0,0,0,0,0],
        expectedData:[0,0,0,0,0,0,0],
        actualData:[0,0,0,0,0,0,0]},
      this.lineChartData.expectedData=this.expectedData
    },
    async getReals(){
      this.relas = await store.dispatch('app/getReals',{reload:true} );
      await store.dispatch('app/setReals', this.relas);
     // this.appendData(this.relas);
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
      this.barChart = this.barChart222[type];
      this.seleType = type;
    },
    getTTimeCount(item){ //获取雷击数
      //本年月份的雷击次数
      var i=6;

      if(item.TTime){
        this.actualData[i] += parseInt(item.TTime);
      }
          //故障标志位，T有警报，F无故障，D离线故障
          if(item.ErrFlag == 'F'){
            this.barChart222[item.PID][0]++;
            this.zcData[i]++;
          }
          if(item.ErrFlag == 'D'){
            this.barChart222[item.PID][2]++;
          }else{

          if(item.PID ==1) {//langyong
            if(item.ErrFlag == 'T') {
              //01预警
              if (item.ErrThunder == '01' || item.ErrLeihua == '01' || item.ErrLC1 == '01' || item.ErrLC2 == '01' ||
                item.ErrTemp == '01' || item.ErrLC3 == '01'
              ) {
                this.barChart222[item.PID][1]++;
                this.expectedData[i]++;
              }

              //10报警
              if (item.ErrThunder == '10' || item.ErrLeihua == '10' || item.ErrLC1 == '10' || item.ErrLC2 == '10' ||
                item.ErrTemp == '10' || item.ErrLC3 == '10' || item.Switch1 == '1' || item.Switch2 == '1' || item.Switch3 == '1' || item.Switch4 == '1'
              ) {
                this.barChart222[item.PID][1]++;
                this.expectedData[i]++;
              }
            }
          }else{
            if(item.ErrFlag == 'T') {
              this.barChart222[item.PID][1]++;
              this.expectedData[i]++;
            }
         }
       }
       this.lineChartData.actualData[i] = this.actualData[i];
       this.lineChartData.expectedData[i] = this.expectedData[i];
       this.lineChartData.zcData[i] = this.zcData[i];
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
    setNewData(t){
      this.dataResonCout=0,
        console.log(t),
        this.dataInit(),
        this.appendRealData(t.RealData),
        this.setTJData(t.data),
        this.getTimeTJ(t.HHData),
        this.hisData(t.hisData)
    },
    setTJData(t){
      this.pieChartData[0].value=t.zccountr+t.zccountl,
        this.pieChartData[1].value=t.gzcountr+t.gzcountl,
        this.pieChartData[2].value=t.yjcountl,
        this.pieChartData[3].value=t.bjcountl+t.bjcountr,
        this.azcount=t.zccountr+t.zccountl+t.gzcountr+t.gzcountl+t.bjcountl+t.bjcountr+t.yjcountl,
        this.barChart222[1][0]=t.zccountl,
        this.barChart222[1][2]=t.gzcountl,
        this.barChart222[1][1]=t.bjcountl,
        this.barChart222[2][0]=t.zccountr,
        this.barChart222[2][2]=t.gzcountr,
        this.barChart222[2][1]=t.bjcountr,
        this.actualData[6]=t.TTime,
        this.expectedData[6]=this.pieChartData[2].value+this.pieChartData[3].value,
        this.zcData[6]=this.pieChartData[0].value,
        this.barChart=this.barChart222[this.seleType]
    },
    appendRealData(t){
      var a=this;
      this.xzztList=[],
        this.lyxzztList=[],
        this.jdxzztList=[],
        this.reals=t.lyList.map((function(t){
          return t.inTime=a.getDayByTime(t.In_Time),
          "T"==t.ErrFlag&&("01"!=t.ErrThunder&&"01"!=t.ErrLeihua&&"01"!=t.ErrLC1&&"01"!=t.ErrLC2&&"01"!=t.ErrTemp&&"01"!=t.ErrLC3||(t.YJ="01"),
          "10"!=t.ErrThunder&&"10"!=t.ErrLeihua&&"10"!=t.ErrLC1&&"10"!=t.ErrLC2&&"10"!=t.ErrTemp&&"10"!=t.ErrLC3&&"1"!=t.Switch1&&"1"!=t.Switch2&&"1"!=t.Switch3&&"1"!=t.Switch4||(t.YJ="10")),
            t.colorss=a.getStateColor(t.ErrFlag,t.YJ),
            t.ErrLeihuaStatusName=a.getStatusName(t.ErrFlag,t.YJ),
            a.lyxzztList.push(t),t})),
        t.resList.map((function(t){
          t.inTime=a.getDayByTime(t.In_Time),
          "T"==t.ErrFlag&&"1"==t.ErrR&&(t.YJ="10"),
            t.colorss=a.getStateColor(t.ErrFlag,t.YJ),
            t.ErrLeihuaStatusName=a.getStatusName(t.ErrFlag,t.YJ),
            a.jdxzztList.push(t),
            a.reals.push(t)})),
        this.xzztList=this.reals.slice(0,8)
    },
    appendData(data){//近一周状况
      this.dataInit()
      this.getTimeTJ()
      this.xzztList = [];
      this.lyxzztList = [];
      this.jdxzztList = [];

      var indexxzztList =0;
      var context = this;
      context.azcount= this.reals.length;

      this.reals = this.reals.map((item)=>{

        item.inTime = context.getDayByTime(item.In_Time);
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

        // if(indexxzztList < 4){
        if(indexxzztList < 8){
          this.xzztList.push(item);
          indexxzztList ++;
        }
        // context.timeTJ.zc[context.nowTimeIndex] = context.pieChartData[0].value;
        // context.timeTJ.gz[context.nowTimeIndex] = context.pieChartData[1].value;
        // context.timeTJ.yj[context.nowTimeIndex] = context.pieChartData[2].value;
        // context.timeTJ.bj[context.nowTimeIndex] = context.pieChartData[3].value;

        if(item.PID === 1){
          this.lyxzztList.push(item)
        }else{
          this.jdxzztList.push(item)
        }

        return item;
      });
      this.getHistory();
      this.barChart = this.barChart222[this.seleType];
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
          url: 'uc/get/history/tj/count',
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
      var cthis = this;
     // var barChart=
     //   [
     //    [0, 0, 0,0, 0, 0, this.barChart[0][6]],//正常
     //    [0, 0, 0,0, 0, 0, this.barChart[1][6]],//故障
     //    [0, 0, 0,0, 0, 0, this.barChart[2][6]],//预警
     //    [0, 0, 0,0, 0, 0, this.barChart[3][6]]//报警
     //  ];
      hisData.map((e)=>{
        for(var i=0;i<this.dataweek.length-1;i++) {
          var days = this.dataweek[i];
          if (days == e.In_Time) {
            cthis.actualData[i] = e.TTime;
            // barChart[0][i] = e.zccount;
            // barChart[3][i]=e.gzcount;
            // barChart[1][i]=e.yjcount;
            // barChart[2][i]=e.bjcount;
            cthis.zcData[i] = e.zccount;
            cthis.expectedData[i] +=e.yjcount;
            cthis.expectedData[i] +=e.bjcount;
          }
        }
      });

      // this.actualData[6] = this.lineChartData.actualData[6];
      // this.expectedData[6] = this.lineChartData.expectedData[6];
      // this.zcData[6] = this.lineChartData.zcData[6];

      var a = {
        actualData: cthis.actualData,
        expectedData: cthis.expectedData,
        zcData: cthis.zcData
      };
      this.lineChartData = a;
    },
    getTimeTJ(t){
      var a=new Date,
        e=a.getHours();
      this.FLHHTIME=e+"",
        this.loading=!0;
      var i=this,
        s={
        zc:[0,0,0,0,0,0,0,0,0],
          gz:[0,0,0,0,0,0,0,0,0],
          yj:[0,0,0,0,0,0,0,0,0],
          bj:[0,0,0,0,0,0,0,0,0]
        },
        r=t,n=0;
      r.map((function(t){
        parseInt(t.HH)===e?
          (i.nowTimeIndex=n,s.zc[i.nowTimeIndex]=i.pieChartData[0].value,s.gz[i.nowTimeIndex]=i.pieChartData[1].value,s.yj[i.nowTimeIndex]=i.pieChartData[2].value,s.bj[i.nowTimeIndex]=i.pieChartData[3].value)
          :(s.zc[n]=t.zccount,s.gz[n]=t.gzcount,s.yj[n]=t.yjcount,s.bj[n]=t.bjcount),n++})),
        this.TimeTj=s
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
<style lang="scss">
 @import "~@/styles/flexible.scss";
.monitor-container{
  position: relative;
  padding: rem(20);
  display: flex;
  flex-direction:row;
  justify-content: space-around;
  align-content: flex-start;
  font-size: 0;
  // .el-row {
  //   margin-bottom: 10px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  // .el-col {
  //   border-radius: 4px;
  // }
  .div-col{
    // display: inline-block;
    // vertical-align: top;
    // box-sizing: border-box;
    // margin-right: rem(12);
    &.left{
      width: rem(441);
    }
    &.center{
      width: rem(674);
    }
    &.right{
      width: rem(459);
      margin-right: 0;
    }
  }
  .grid-content {
    // min-height: 270px;
    margin-bottom: rem(12);
    // border: 1px solid #036ad2;
    // background: rgba(3, 50, 91, 0.8);
    // box-shadow: inset 0 0 10px #6267ab;
    background-repeat: no-repeat;
    background-size: 100%;
    &.left-1{
      height: rem(393);
      background-image: url(~@/assets/images/left-1.png);
    }
    &.left-2{
      height: rem(274);
      background-image: url(~@/assets/images/left-2.png);
    }
    &.left-3{
      height: rem(273);
      background-image: url(~@/assets/images/left-3.png);
    }
    &.center-1{
      height: rem(393);
      color:#FFFFFF;
      background-image: url(~@/assets/images/center-1.png);
    }
    &.center-2{
      height: rem(560);
      background-image: url(~@/assets/images/center-2.png);
    }
    &.right-1{
      height: rem(393);
      background-image: url(~@/assets/images/right-1.png);
    }
    &.right-2{
      height: rem(274);
      background-image: url(~@/assets/images/right-2.png);
    }
    &.right-3{
      height: rem(273);
      background-image: url(~@/assets/images/right-3.png);
    }
    .title{
      height: rem(34);
      line-height: rem(34);
      font-size: rem(16);
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #FFFFFF;
      text-shadow: 0px 2px 5px rgba(5, 50, 73, 0.76);
      padding-top: rem(12);
      text-align: center;
      i{
        color: #9ddeff;
        display: none;
      }
    }
    .weather-main{
      position: relative;
      height: 100%;
      .real-img{
        position: absolute;
        left: rem(40);
        top: rem(30);
        width: rem(130);
      }
      .wea{
        position: absolute;
        left: rem(180);
        top: rem(98);
        font-size: rem(24);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
      .tem{
        position: absolute;
        width: rem(200);
        left: rem(40);
        top: rem(160);
        text-align: center;
        font-size: rem(72);
        font-family: Arial;
        font-weight: 400;
        color: #FFFFFF;
      }
      .time-hour{
        position: absolute;
        width: rem(200);
        right: rem(43);
        top: rem(43);
        height: rem(53);
        text-align: right;
        font-size: rem(72);
        letter-spacing: rem(5);
      }
      .time-date,.time-week{
        position: absolute;
        top: rem(130);
        right: rem(130);
        width: 80px;
        font-size: rem(18);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
      .time-week{
        width: rem(60);
        right: rem(30)
      }
      .tem-range{
        position: absolute;
        top: rem(165);
        right: rem(40);
        width: rem(200);
        text-align: right;
        font-size: rem(20);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
      .week-data{
        position: absolute;
        top: rem(240);
        left: rem(40);
        right: rem(30);
        height: rem(80);
        flex-direction:row;
        display: flex;
        justify-content: space-between;
        .weekObj{
         position: relative;
          width: rem(160);
          .week-img{
            position: absolute;
            left: 0;
            top: 0;
            width: rem(80);
          }
          .week-day,.week-temrange{
            position: absolute;
            top: rem(10);
            left: rem(80);
            width: rem(80);
            font-size: rem(18);
            font-family: Microsoft YaHei;
            font-weight: 400;
            text-align: center;
          }
          .week-temrange{
            top:50px;
          }
        }
      }
      .city{
        position: absolute;
        bottom: rem(15);
        left: rem(40);
        height: rem(40);
        line-height: rem(38);
        font-size: rem(18);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #E2E2E8;
        background: url(~@/assets/images/location.png) no-repeat;
        background-size: rem(20) rem(24);
        background-position: left center;
        padding-left: rem(24);
      }
      .update-time{
        position: absolute;
        bottom: rem(15);
        right: rem(40);
        height: rem(40);
        line-height: rem(38);
        font-size: rem(18);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #E2E2E8;
        background: url(~@/assets/images/refresh.png) no-repeat;
        background-position: right center;
        background-size: rem(27) rem(23);
        padding-right: rem(35);
      }
    }
    .content-main{
      position:relative;
      margin: rem(10);
      margin-top: rem(38);
      marquee{
        height: rem(136);
      }
      .info-line{
          height: rem(34);
          line-height: rem(34);
          font-size: 0;
          background-color: rgb(12,47,81);
          position: relative;
          padding-left: rem(13);
          border-bottom: 1px solid rgb(7,26,52);
          margin-bottom: 0;
          z-index: 2;
          &>div{
            height: rem(34);
            vertical-align: bottom;
            display: inline-block;
            font-size: rem(12);
            color: #ffffff;
            margin-right: rem(5);
          }
          &>div:last-child{
            margin-right: 0;
          }
          &::before{
            content: '';
            position: absolute;
            left: rem(4);
            top: rem(14);
            width: rem(6);
            height: rem(6);
            background: #F01970;
            border-radius: 100%;
            box-shadow: 0 0 rem(15) #F01970;
            z-index: 2;
          }
          // &::after{
          //   content: '';
          //   position: absolute;
          //   left: rem(2);
          //   top: 0px;
          //   width: 1px;
          //   bottom: 0;
          //   background: rgba(255,255,255,.3);
          //   z-index: 1;
          //   display: block;
          // }
          &:first-child::after{
            top: rem(15);
          }
          &:last-child::after{
            bottom: rem(17);
          }
          .status{
            &.on::before{
              content: "";
              position:absolute;
              top: rem(12);
              width: rem(12);
              height: rem(12);
              background: #3AFC3B;
              border-radius: 100%;
              z-index: 2;
            }
            &.off::before{
              content: "";
              position:absolute;
              top: rem(12);
              width: rem(12);
              height: rem(12);
              background:  #F01970;
              border-radius: 100%;
              z-index: 2;
            }
            &.gz::before{
              content: "";
              position:absolute;
              top: rem(12);
              width: rem(12);
              height: rem(12);
              background: rgb(229,179,47);
              border-radius: 100%;
              z-index: 2;
            }
            &.yj::before{
              content: "";
              position:absolute;
              top: rem(12);
              width: rem(12);
              height: rem(12);
              background:  #9165F8;
              border-radius: 100%;
              z-index: 2;
            }

          }

      }
      // 实时数据总数
      .data-row{
        height: rem(51);
       //background: url(~@/assets/images/real-row.png) no-repeat;
        width: rem(393);
        margin:rem(10) auto;
        font-size: 0;
        &>div{
          width: 50%;
          height: rem(52);
          line-height: rem(52);
          display: inline-block;
          position: relative;
          vertical-align: bottom;
          text-align: right;
        }
        .normal{
          font-size: rem(32);
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #20F8FF;
          padding-right: rem(40);
          width: 45%;
          &::after{
            content: "正常";
            position: absolute;
            color: #FFFFFF;
            right: 0;
            top: 0;
            bottom: 0;
            line-height: rem(52);
            width: rem(50);
            font-size: rem(14);
          }
        }
        .percent{
          display: inline-block;
          vertical-align: middle;
          // width: 55%;
          color: #FFFFFF;
          font-size: 14px;
          .per-val{
            height: rem(52);
            line-height: rem(52);
            font-size: rem(30);
            font-family: Microsoft YaHei;
            font-weight: bold;

            display: inline-block;
            // letter-spacing:-3px;
            // word-spacing:-3px;
            i{
              font-size: rem(26);
            }
          }
          &::before{
            content: "同比";
            position: absolute;
            color: #FFFFFF;
            left: rem(15);
            top: 0;
            bottom: 0;
            line-height: rem(52);
            width: rem(50);
            font-size: rem(14);
          }
          .per-val.up{
            color:rgb(119, 240, 63);
          }
          .per-val.down{
            color: #F01970;
          }
        }
      }
      .ul{
        margin:0px;
        padding:0px;
        height:200px;
        width: 100%;

        -moz-column-gap: 0;
        -moz-column-count: 1;
        // -moz-column-rule: 1px solid #d8d8d8;
        -webkit-column-gap: 0;
        -webkit-column-count: 1;
        //-webkit-column-rule: 1px solid #d8d8d8;
        column-gap: 0;
        column-count: 1;
        //column-rule: 1px solid #d8d8d8;
        .li{
          list-style: none;
          height:40px;
          line-height:40px;
          .row{
            width: 100%;
            &>div{
              height: 40px;
              vertical-align: bottom;
              display: inline-block;
              font-size: 13px;
              color: #ffffff;
              text-align: center;
            }
            &>div:last-child{
              margin-right: 0;
            }
            .no{
              margin-top: 14px;
                width: 20px;
                height: 15px;
                line-height: 15px;
                font-weight: bold;
                font-size: 13px;
                text-align: center;
                background: #3dbef6;
                color: #0c0f2f;
                vertical-align: middle;
                /* box-sizing: border-box; */
                border-radius: 3px;
            }
          }
          &:nth-child(1) .no{
              background: #fd900a;
            }
            &:nth-child(2) .no{
              background: #2bff2b;
            }
            &:nth-child(3) .no{
              background: #58d49a;
            }
        }
      }

      .devices{
        font-size: 0;
        margin-top: rem(-8);
        .device-blk{
          width: 50%;
          height: rem(200);
          display: inline-block;
          background: url(~@/assets/images/table-line.png) no-repeat;
          background-size: rem(1) rem(178);
          background-position: right center;
          &:last-child{
            background: none;
          }

          .device-row{
            height: rem(50);
            line-height:  rem(50);
            width: 100%;
            background: url(~@/assets/images/table-row-split.png) no-repeat;
            background-size: rem(177) rem(1);
            background-position: bottom;
            margin-bottom: 0;
            padding-left: rem(5);
            &:last-child{
              background: none;
            }
            &>div{
              height: rem(50);
              vertical-align: bottom;
              display: inline-block;
              font-size: rem(12);
              color: #ffffff;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &>div:last-child{
              padding-left: rem(5);
              margin-right: 0;
            }
            .no{
                margin-top: rem(17);
                width: rem(16);
                height: rem(16);
                line-height: rem(16);
                font-weight: bold;
                font-size: rem(12);
                text-align: center;
                background: #3dbef6;
                color: #0c0f2f;
                vertical-align: middle;
                /* box-sizing: border-box; */
                border-radius: rem(10);

            }
            .position{

            }
            /*&.left-data:nth-child(1) .no{
            /*  background: #fd900a;
            /*}
            /*&.left-data:nth-child(2) .no{
            /*  background: #2bff2b;
            /*}
            /*&.left-data:nth-child(3) .no{
            /*  background: #58d49a;
            /*}*/
            .zc{
              background: rgb(67,248,72);
            }
            .gz{
              background: rgb(229,179,47);
            }
            .bj{
              background: rgb(240,73,116);
            }
            .yj{
              background: rgb(157,86,246);
            }
          }
        }

      }

      .sys-status{
        width: rem(428);
        height: rem(301);
        margin: rem(10) auto;
        // margin: 20px 10px 0 10px;
        padding: 30px 10px 20px 10px;
        background: url(~@/assets/images/right-1-bak.png) no-repeat;
        background-size: 100%;
      }
      .status-item{
        margin-bottom: rem(40);
        &>div{
          display: inline-block;
        }
        .status-desc{
          width: rem(80);
          font-size: rem(14);
          font-family: Microsoft YaHei;
          font-weight: 400;
          padding-left: rem(10);
          text-align: left;
          color:#FFFFFF!important;
        }
        .status-line{
         width: 59%;
          background: rgba(255, 255, 255, 0.3);
          height: rem(15);
         border-radius: rem(15);
          .status-val{
            width: 0;
            height: rem(15);
            border-radius: rem(15)
            // background: #0a72e9;
            // background: -moz-linear-gradient(left,  #0a72e9 0%, #2ae6b7 100%);
            // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0a72e9), color-stop(100%,#2ae6b7));
            // background: -webkit-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            // background: -o-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            // background: -ms-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            // background: linear-gradient(to right,  #0a72e9 0%,#2ae6b7 100%);
            // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0a72e9', endColorstr='#2ae6b7',GradientType=0 );
          }
        }
        &.zc .status-val{
          background: rgb(67,248,72);
        }
        &.gz .status-val{
          background: rgb(229,179,47);
        }
        &.bj .status-val{
          background: rgb(240,73,116);
        }

        &.yj .status-val{
          background: rgb(157,86,246);
        }
        .status-precent{
          width: 20%;
          font-size: rem(20);
          font-family: Microsoft YaHei;
          font-weight: bold;
          text-align: center;
        }
      }
      .pop-status {
        margin: rem(-14) rem(18) 0 rem(18);
        font-size: 0;
        &>div{
          display: inline-block;
          height: 100%;
          vertical-align: middle;

        }
        .pop-type{
          width: rem(203);
          .type-item{
            width: rem(195);
            height: rem(45);
            font-size: rem(14);
            text-align: center;
            margin-bottom: rem(10);
            line-height: rem(40);
            color: #ffffff;
            position: relative;
            background-image: url(~@/assets/images/type-item.png);
            background-size: 100%;
            &.clk{
              width: rem(203);
              background-image: url(~@/assets/images/type-item-clk.png);
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
        .pop-show{
          margin-left: rem(40);
          width: rem(157);
          .type-item-val{
            width: rem(157);
            height: rem(63);
            line-height: rem(64);
            font-size: rem(30);
            padding-left: rem(10);
            box-sizing: border-box;
            margin-bottom: rem(5);
            &.zc{
              color: rgb(67,248,72);
               background: url(~@/assets/images/type-zc.png) no-repeat;
               background-size: 100%;
            }
            &.bj{
              color: rgb(240,68,112);
               background: url(~@/assets/images/type-bj.png) no-repeat;
               background-size: 100%;
            }
            &.gz{
              color: rgb(228,176,44);
               background: url(~@/assets/images/type-gz.png) no-repeat;
               background-size: 100%;
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
      .real-chart-area{
        height: rem(240);
      }
      .week-chart-area{
        height: rem(450);
      }
    }

  }
}

</style>

</style>
