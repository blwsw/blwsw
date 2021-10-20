<template>
  <div class="monitor-container">
    <el-row :gutter="10">
      <el-col :span="7">
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-s-order"></i>
            实时运行情况
          </div>
          <div class="content-main">
            <div class="data-row">
              <div class="normal">{{pieChartData[0].value}}</div>
              <div class="percent">同比<div class="per-val down"><i class="el-icon-bottom"></i> {{(azcount/pieChartData[0].value).toFixed(2)}}</div> %</div>
              <!-- <div class="percent">同比<div class="per-val up"><i class="el-icon-top"></i>22</div>%</div> -->
            </div>
            <real-chart :chart-data="TimeTj" :FLHHTIME="FLHHTIME" />
          </div>
        </div>
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-s-data"></i>
            设备巡检状态
          </div>
          <div class="content-main">
            <el-row class="device-row" :xs="24" :sm="24" :lg="12" v-bind:key="n.ID" v-for="(n,index) in xzztList">
              <!-- <el-col class="li" :xs="24" :sm="24" :lg="12" v-bind:key="n.ID" v-for="(n,index) in xzztList">
                <el-row class="row"> -->
                  <el-col :span="4" class="no">{{ index+1 }}</el-col>
                  <el-col :span="5">{{ n.name }}</el-col>
                  <el-col :span="4">{{ n.ID }}</el-col>
                  <el-col :span="8">{{ n.InstallPos }}</el-col>
                  <el-col :span="4">{{ n.ErrLeihuaStatusName }}</el-col>
                  <!-- <el-col :span="20">{{ n.name }}  {{ n.ID }} {{ n.InstallPos }}  {{ n.ErrLeihuaStatusName }}</el-col> -->
                </el-row>
              <!-- </el-col>
            </el-row> -->
          </div>
        </div>
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-video-camera-solid"></i>
            接地电阻监测信息
          </div>
          <div class="content-main" style="margin: 10px 5px">
            <marquee direction="up" align="absmiddle" style="padding:5px" behavior="scroll" height="140" hspace="0" vspace="0" loop="-1" scrollamount="6" scrolldelay="200" onMouseOut="this.start()" onMouseOver="this.stop()">
              <template v-for="x in jdxzztList">
                <el-row class="info-line" :gutter="5" >
                  <el-col :span="8">{{x.inTime}}</el-col>
                  <el-col :span="3">{{x.name}}</el-col>
                  <el-col :span="3">{{x.ID}}</el-col>
                  <el-col :span="6">{{x.InstallPos}}</el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'F'" class="status on"></el-col>
                  <el-col :span="2" v-if="x.ErrFlag != 'F'" class="status off"></el-col>
                </el-row>
              </template>
            </marquee>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
            <!-- <div id="weather-v2-plugin-standard"></div> -->
            <div id="he-plugin-standard" style="height: 170px;"></div>
            <div>{{nowtem}}</div>
        </div>
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-monitor"></i>
            近七日雷击报警折线图
          </div>
          <div class="content-main">
            <line-chart :chart-data="lineChartData" :weeks="weeks" />
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-menu"></i>
            系统运行状态良率指标
          </div>
          <div class="content-main">
            <div class="status-item" style="color:#3bff3b;">
              <div class="status-desc">正常</div>
              <div class="status-line">
                <div class="status-val" :style="'width:'+(azcount/pieChartData[0].value).toFixed(2)+'%;'"></div>
              </div>
              <div class="status-precent">{{(azcount/pieChartData[0].value).toFixed(2)}}%</div>
            </div>
             <div class="status-item" style="color:#f5f416;">
              <div class="status-desc">故障</div>
              <div class="status-line">
                <div class="status-val" style="width:20%"></div>
              </div>
              <div class="status-precent">{{(azcount/pieChartData[3].value) === Infinity ?0:(azcount/pieChartData[3].value).toFixed(2)}}%</div>
            </div>
             <div class="status-item" style="color:#f11c43;">
              <div class="status-desc">报警</div>
              <div class="status-line">
                <div class="status-val" style="width:10%"></div>
              </div>
              <div class="status-precent">{{(azcount/pieChartData[1].value) === Infinity ?0:(azcount/pieChartData[1].value).toFixed(2)}}%</div>
            </div>
             <div class="status-item" style="color:#e828ff;">
              <div class="status-desc">预警</div>
              <div class="status-line">
                <div class="status-val" style="width:10%"></div>
              </div>
              <div class="status-precent">{{(azcount/pieChartData[2].value) === Infinity ?0:(azcount/pieChartData[2].value).toFixed(2)}}%</div>
            </div>
          </div>
        </div>
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-odometer"></i>
            系统运行状态图
          </div>
          <div class="content-main">
            <div class="pop-status">
              <div class="pop-type">
                <div class="type-item" v-bind:class="{ 'clk': this.seleType ==0 }" @click="handleSetLineChartData(0)">大气电场仪监测系统</div>
                <div class="type-item " v-bind:class="{ 'clk': this.seleType ==1 }" @click="handleSetLineChartData(1)">电泳保护器监测系统</div>
                <div class="type-item" v-bind:class="{ 'clk': this.seleType ==2 }" @click="handleSetLineChartData(2)">接地电阻仪监测系统</div>
              </div>
              <div class="pop-show">
                 <pop-chart :chartData="barChart" />
              </div>
            </div>

          </div>
        </div>
        <div class="grid-content">
          <div class="title">
            <i class="el-icon-s-marketing"></i>
            电泳保护器监测告警信息
          </div>
          <div class="content-main" style="margin:10px 5px">
            <marquee direction="up" align="absmiddle" style="padding:5px" behavior="scroll" height="140" hspace="0" vspace="0" loop="-1" scrollamount="6" scrolldelay="200" onMouseOut="this.start()" onMouseOver="this.stop()">

              <template v-for="x in lyxzztList">
                <el-row class="info-line" :gutter="5">
                  <el-col :span="8">{{x.inTime}}</el-col>
                  <el-col :span="3">{{x.name}}</el-col>
                  <el-col :span="3">{{x.ID}}</el-col>
                  <el-col :span="6">{{x.InstallPos}}</el-col>
                  <el-col :span="2" v-if="x.ErrFlag == 'F'" class="status on"></el-col>
                  <el-col :span="2" v-if="x.ErrFlag != 'F'" class="status off"></el-col>
                </el-row>
              </template>

            </marquee>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
      </el-col>
    </el-row>
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
    PopChart,
    LineChart,
    PieChart
  },
  data () {
    return {
      city:"南京",
      nowtem: '',
      loading: true,
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
      FLHHTIME: "20"
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

  window.WIDGET = {CONFIG: {
    "layout": "1",
    "width": "450",
    "height": "260",
    "background": "1",
    "borderRadius": "5",
    "dataColor": "FFFFFF",
    "key": "9c2da304bda3442bbc00e48e259facad"
  }}
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);
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
    this.reals = this.$store.state.app.reals;
    if(!this.relas || this.relas.length ==0){
      this.getReals();
    }

  },
  methods: {
    searchWeather:async function(){//注意：这里有 async 用来完成异步操作
      //由于调用api是异步操作
      //在请求的时候需要用async+await让它同步，否则数据不好取出
      //如果没有await返回的是一个Promise 对象，我学术短浅，暂时没学到，不会取

      let key = "64c17251bcdf49c9b8055fdbfccf758a"//引号中放入前面保存的key
      //方法二：新的API
      //获取城市的ID
      let httpUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${this.city}&key=${key}`
      let res = await fetch(httpUrl)
      let result = await res.json()
      let id = result.location[0].id
      //根据城市id获取具体的天气
      let httpUrl1 = `https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`
      let res1 = await fetch(httpUrl1)
      let result1 = await res1.json()
      debugger
      console.log(result1)
      let now = result1.now
      this.nowtem =now.temp
    },
    dataInit(){
      this.pieChartData=[
        { value: 0, name: '正常' ,itemStyle:{color:"#05FFFD"}},
        { value: 0, name: '故障',itemStyle:{color:"#CF8336"} },
        { value: 0, name: '预警' ,itemStyle:{color:"#9165F8"}},
        { value: 0, name: '报警' ,itemStyle:{color:"#E8554B"}},
      ];
      this.lineChartData.expectedData =this.expectedData;
      this.lineChartData ={
        expectedData:[0, 0, 0, 0, 0, 0, 0],
          actualData:[0, 0, 0, 0, 0, 0, 0]
      },
        this.expectedData=[0, 0, 0, 0, 0, 0, 0],
        this.actualData=[0, 0, 0, 0, 0, 0, 0],

        this.barChart = [0, 0, 0 ], this.barChart222 = [[0, 0, 0 ], [0, 0, 0 ], [0, 0, 0 ]];
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
            this.barChart222[item.NodeType][0]++;
          }
          if(item.ErrFlag == 'D'){
            this.barChart222[item.NodeType][1]++;
          }else{

          if(item.NodeType ==1) {//langyong
            if(item.ErrFlag == 'T') {
              //01预警
              if (item.ErrThunder == '01' || item.ErrLeihua == '01' || item.ErrLC1 == '01' || item.ErrLC2 == '01' ||
                item.ErrTemp == '01' || item.ErrLC3 == '01'
              ) {
                this.barChart222[item.NodeType][2]++;
                this.expectedData[i]++;
              }

              //10报警
              if (item.ErrThunder == '10' || item.ErrLeihua == '10' || item.ErrLC1 == '10' || item.ErrLC2 == '10' ||
                item.ErrTemp == '10' || item.ErrLC3 == '10' || item.Switch1 == '1' || item.Switch2 == '1' || item.Switch3 == '1' || item.Switch4 == '1'
              ) {
                this.barChart222[item.NodeType][2]++;
                this.expectedData[i]++;
              }
            }
          }else{
            this.barChart222[item.NodeType][2]++;
            this.expectedData[i]++;
         }
       }
      this.lineChartData.actualData =this.actualData;
      this.lineChartData.expectedData =this.expectedData;
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
      this.dataInit()
      this.getTimeTJ()
      this.xzztList = [];
      this.lyxzztList = [];
      this.jdxzztList = [];

      var indexxzztList =0;
      var context = this;
      context.azcount= this.reals.length;
      this.reals = this.reals.map((item)=>{
        item.addr = item.id;
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

        if(indexxzztList < 4){
          this.xzztList.push(item);
          indexxzztList ++;
        }

        if(item.NodeType ==1){
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
     // var barChart=
     //   [
     //    [0, 0, 0,0, 0, 0, this.barChart[0][6]],//正常
     //    [0, 0, 0,0, 0, 0, this.barChart[1][6]],//故障
     //    [0, 0, 0,0, 0, 0, this.barChart[2][6]],//预警
     //    [0, 0, 0,0, 0, 0, this.barChart[3][6]]//报警
     //  ];
      hisData.map((e)=>{
        for(var i=0;i<this.dataweek.length;i++) {
          var days = this.dataweek[i];
          if (days == e.In_Time) {
            this.actualData[i] = e.TTime;
            // barChart[0][i] = e.zccount;
            // barChart[3][i]=e.gzcount;
            // barChart[1][i]=e.yjcount;
            // barChart[2][i]=e.bjcount;
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
    },
    getTimeTJ(){
      var now = new Date();
      var hour = now.getHours();//得到小时
      this.FLHHTIME = hour;
        this.loading = true
        var obj = {
          url: 'core/getTimeTJ',
          data: {
          }
        }
        var context = this;

      var timeChartData = {
        zc: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          gz: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          yj: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          bj: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      };

        fetchEvent(obj).then(response => {
          let tjc = response.responseBody;
          let index = 0;
          tjc.map(v => {
            if(parseInt(v.HH) < hour) {
              timeChartData.zc[index] = v.zccount;
              timeChartData.gz[index] = v.gzcount;
              timeChartData.yj[index] = v.yjcount;
              timeChartData.bj[index] = v.bjcount;
              index ++;
            }

          });
          if(index ==0){
            timeChartData.zc[index] = 0;
            timeChartData.gz[index] = 0;
            timeChartData.yj[index] = 0;
            timeChartData.bj[index] = 0;
          }
          this.TimeTj = timeChartData;
        })

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
  padding: 10px;
  background: url(~@/assets/images/monitor.jpeg) no-repeat;
  background-size: cover;
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    // min-height: 270px;
    margin-bottom: 10px;
    border: 1px solid #036ad2;
    background: rgba(3, 50, 91, 0.8);
    box-shadow: inset 0 0 10px #6267ab;
    .title{
      height: 36px;
      line-height: 36px;
      font-size:16px;
      color: #FFFFFF;
      margin: 0 14px;
      border-bottom: 1px solid #036ad2;
      i{
        color: #9ddeff;
      }
    }
    .content-main{
      margin: 10px;
      .info-line{
          height: 36px;
          line-height: 36px;
          font-size: 0;
          position: relative;
          padding-left: 13px;
          margin-bottom: 0;
          z-index: 2;
          &>div{
            height: 36px;
            vertical-align: bottom;
            display: inline-block;
            font-size: 14px;
            color: #ffffff;
            margin-right: 5px;
          }
          &>div:last-child{
            margin-right: 0;
          }
          &::before{
            content: '';
            position: absolute;
            left: 0px;
            top: 14px;
            width:6px;
            height: 6px;
            background: rgb(210,80,70);
            border-radius: 100%;
            box-shadow: 0 0 15px  rgb(210,80,70);
            z-index: 2;
          }
          &::after{
            content: '';
            position: absolute;
            left: 2px;
            top: 0px;
            width: 1px;
            bottom: 0;
            background: rgba(255,255,255,.3);
            z-index: 1;
            display: block;
          }
          &:first-child::after{
            top: 15px;
          }
          &:last-child::after{
            bottom: 17px;
          }
          .status{
            &.on::before{
              content: "";
              position:absolute;
              top: 12px;
              width: 12px;
              height: 12px;
              background: #1bfd00;
              border-radius: 100%;
              z-index: 2;
            }
            &.off::before{
              content: "";
              position:absolute;
              top: 12px;
              width: 12px;
              height: 12px;
              background:  #fb6106;
              border-radius: 100%;
              z-index: 2;
            }
          }

      }
      // 实时数据总数
      .data-row{
        height: 36px;
        margin:10px 10px 20px 10px;

        font-size: 0;
        &>div{
          width: 50%;
          height: 36px;
          display: inline-block;
          position: relative;
          vertical-align: bottom;
          text-align: right;
        }
        .normal{
          font-size: 32px;
          color: #9ddeff;
          padding-right: 40px;
          width: 45%;
          &::after{
            content: "正常";
            position: absolute;
            right: 0;
            bottom: 2px;
            width: 50px;
            font-size: 14px;
          }
        }
        .percent{
          width: 55%;
          color: #9ddeff;
          font-size: 14px;
          .per-val{
            font-size: 32px;
            display: inline-block;
            letter-spacing:-3px;
            word-spacing:-3px;
            i{
              font-size: 26px;
            }
          }
          .per-val.up{
            color:rgb(119, 240, 63);
          }
          .per-val.down{
            color:#ff5d4a;
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
      .device-row{
        height: 30px;
        line-height: 30px;
        width: 100%;
        margin-bottom: 0;
        &>div{
          height: 30px;
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
          margin-top: 7.5px;
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
      .status-item{
        margin-bottom: 10px;
        &>div{
          display: inline-block;
        }
        .status-desc{
          display: block;
          font-size: 20px;
          padding-left: 10px;
        }
        .status-line{
         width: 80%;
          background: rgba(255, 255, 255, 0.3);
          height: 15px;
          border-radius: 10px;
          .status-val{
            height: 15px;
            border-radius: 10px;
            background: #0a72e9;
            background: -moz-linear-gradient(left,  #0a72e9 0%, #2ae6b7 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0a72e9), color-stop(100%,#2ae6b7));
            background: -webkit-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            background: -o-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            background: -ms-linear-gradient(left,  #0a72e9 0%,#2ae6b7 100%);
            background: linear-gradient(to right,  #0a72e9 0%,#2ae6b7 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0a72e9', endColorstr='#2ae6b7',GradientType=0 );
          }
        }
        .status-precent{
          width: 20%;
          font-size: 18px;
          text-align: center;
        }
      }
      .pop-status {
        margin:0 -10px 10px 0;
        font-size: 0;
        &>div{
          display: inline-block;
          height: 100%;
          vertical-align: bottom;
        }
        .pop-type{
          width: 45%;
          // padding: 40px 20px;
          .type-item{
            height: 40px;
            border: 2px solid #80b5ff;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
            line-height: 40px;
            color: #ffffff;
            position: relative;
          }
          .type-item:nth-child(1){
            border-radius: 20px 20px 10px 10px;
          }
          .type-item:nth-child(3){
            border-radius: 10px 10px 20px 20px;
          }
          .type-item.clk::before{
            content:"";
            position: absolute;
            left: -10px;
            top: 15px;
            width: 0;
            height: 0;
            border-top: 4px solid transparent;
            border-left: 8px solid #80b5ff;
            border-bottom: 4px solid transparent;
          }
          .type-item.clk::after{
            content:"";
            position: absolute;
            right: -10px;
            top: 15px;
            width: 0;
            height: 0;
            border-top: 4px solid transparent;
            border-right: 8px solid #80b5ff;
            border-bottom: 4px solid transparent;
          }
        }
        .pop-show{
          margin-left: 5%;
          width: 50%;
        }
      }
    }
  }
}

</style>
