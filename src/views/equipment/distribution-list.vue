<template>
  <div class="mixin-components-container">

    <el-row :gutter="20" class="panel-group">
      <el-col v-for="node in pageData" :xs="6" :sm="6" :md="6" :lg="4" class="card-panel-col">
        <el-card class="box-card" body-style="padding:0" :class="{ 'bicon-people': node.ErrFlag=='F','bicon-message': node.ErrFlag=='D' ,'bicon-money': node.YJ=='01','bicon-shopping': node.YJ=='10' }">
          <div slot="header" class="clearfix spanaa">
            <i class="el-icon-warning-outline" /> &nbsp;&nbsp;
            <span>{{ node.addr }}</span> &nbsp;&nbsp; &nbsp;&nbsp;
            <span>{{ node.pdcNo }}</span>
          </div>
          <div class="component-item">
            <div class="card-panel">
              <div v-if="node.ErrFlag =='F'" class="card-panel-icon-wrapper icon-people">
                <i class="card-level0 card-panel-icon" />
              </div>
              <div v-if="node.ErrFlag =='D'" class="card-panel-icon-wrapper icon-message">
                <i class="card-level1 card-panel-icon" />
              </div>
              <div v-if="node.YJ =='01'" class="card-panel-icon-wrapper icon-money">
                <i class="card-level2 card-panel-icon" />
              </div>
              <div v-if="node.YJ =='10'" class="card-panel-icon-wrapper icon-shopping">
                <i class="card-level3 card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  温度:{{ node.OTemp }}℃
                </div>
                <div class="card-panel-text">
                  雷击数:{{ node.TTime }}
                </div>
                <div class="card-panel-text">
                  设备状态:{{ node.ErrLeihuaStatusName }}
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <pagination v-show="total>0" :total="total" :page.sync="currentPage" :limit.sync="pageSize" @pagination="getSubList" />
    <!-- <el-row :gutter="1" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" >
        <div @click="handleSetNewData1">
        <el-row :gutter="1" >
          <el-col :xs="12" :sm="12" :lg="12">
            <el-card class="box-card btmtj btmtjbgcolor" >
              在线台数
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-card class="box-card btmtj"  >
              {{zxcount}}台
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="0" >
          <el-col :xs="12" :sm="12" :lg="12">
            <el-card class="box-card btmtj btmtjbgcolor" >
              安装台数
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" >
            <el-card class="box-card btmtj">
              {{azcount}}台
            </el-card>
          </el-col>
        </el-row>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col" v-for="t in totalList">
        <el-card class="box-card" body-style="padding:5px;"  >
          <div class="component-item" @click="handleSetNewData(t.code,t.YJ)">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-people" v-if="t.icon =='card-level0'">
                <i class="card-level0 card-panel-icon" />
              </div>
              <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-message" v-if="t.icon =='card-level1'">
                <i class="card-level1 card-panel-icon" />
              </div>
              <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-money" v-if="t.icon =='card-level2'">
                <i class="card-level2 card-panel-icon" />
              </div>
              <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-shopping" v-if="t.icon =='card-level3'">
                <i class="card-level3 card-panel-icon" />
              </div>
              <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-outling" v-if="t.icon =='el-icon-circle-close'">
              <i class="el-icon-circle-close card-panel-icon" />
            </div>

              <div class="card-panel-description card-panel-description1" style="vertical-align: center;">
                <div class="card-panel-text">
                  {{t.count}}台&nbsp;
                </div>
                <div class="card-panel-text">
                  {{t.lable}}
                </div>

              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>-->
    <el-row :gutter="20" class="panel-group total-group">
      <el-col :xs="6" :sm="6" :md="6" :lg="4" class="card-panel-col">
        <div @click="handleSetNewData1">
          <el-card class="box-card" body-style="padding:0;">
            <div class="component-item" @click="handleSetNewData(t.code,t.YJ)">
              <div class="card-panel">
                <div class="total t-text all">安装台数</div>
                <div class="total t-num">{{ azcount }}台</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4" class="card-panel-col">
        <div @click="handleSetNewData1">
          <el-card class="box-card " body-style="padding:0;">
            <div class="component-item" @click="handleSetNewData(t.code,t.YJ)">
              <div class="card-panel">
                <div class="total t-text">在线台数</div>
                <div class="total t-num">{{ zxcount }}台</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col v-for="t in totalList" :xs="6" :sm="6" :md="6" :lg="4" class="card-panel-col">
        <el-card class="box-card" body-style="padding:0;">
          <div class="component-item" @click="handleSetNewData(t.code,t.YJ)">
            <div class="card-panel total-card">
              <div v-if="t.icon =='card-level0'" class="card-panel-icon-wrapper card-panel-icon-wrapper1">
                <i class="card-level0 card-panel-icon" />
              </div>
              <div v-if="t.icon =='card-level1'" class="card-panel-icon-wrapper card-panel-icon-wrapper1">
                <i class="card-level1 card-panel-icon" />
              </div>
              <div v-if="t.icon =='card-level2'" class="card-panel-icon-wrapper card-panel-icon-wrapper1">
                <i class="card-level2 card-panel-icon" />
              </div>
              <div v-if="t.icon =='card-level3'" class="card-panel-icon-wrapper card-panel-icon-wrapper1">
                <i class="card-level3 card-panel-icon" />
              </div>
              <!-- <div class="card-panel-icon-wrapper card-panel-icon-wrapper1 bicon-outling" v-if="t.icon =='el-icon-circle-close'">
              <i class="el-icon-circle-close card-panel-icon" />
            </div> -->

              <div class="card-panel-description card-panel-description1" style="vertical-align: center;">
                <div class="card-panel-text">
                  <span>{{ t.count }}</span>&nbsp;台&nbsp;
                </div>
                <div class="card-panel-text">
                  {{ t.lable }}
                </div>

              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/DropdownMenu'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { fetchEvent } from '@/api/article'
import Pagination from '@/components/Pagination/index'
import store from '@/store'
export default {
  name: 'DistributionList',
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu,
    Pagination
  },
  directives: {
    waves
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dataList: [],
      list: [],
      newData: [],
      pageData: [],
      yjData: [],
      zxcount: 0,
      azcount: 0,
      totalList: [
        { count: 0, lable: '正常台数', icon: 'card-level0', code: 'F' },
        { count: 0, lable: '故障台数', icon: 'card-level1', code: 'D' },
        { count: 0, lable: '预警台数', icon: 'card-level2', code: 'T', YJ: '01' },
        { count: 0, lable: '报警台数', icon: 'card-level3', code: 'T', YJ: '10' }
        // {count:0,lable:"离线台数",icon:"el-icon-circle-close"},
      ],
      // 00正常01预警10报警
      status: [
        { code: '', value: '未知' },
        { code: '00', value: '正常' },
        { code: '01', value: '预警' },
        { code: '10', value: '报警' }
      ],
      total: 0,
      currentPage: 1,
      pageSize: 30
    }
  },
  computed: { //          监听词条
    getReals() {
      return this.$store.state.app.reals
    }
  },
  watch: {
    getReals: {
      handler(newValue, oldValue) { // 当词条改变时执行事件
        this.list = newValue
        this.getList()
      },
      deep: true
    }
  },
  created() {
    // this.getList()

  },
  mounted() {
    this.list = this.$store.state.app.reals
    if (!this.list || this.list.length == 0) {
      this.list = store.dispatch('app/getReals', { reload: true })
      this.list = []
    }
    this.getList()
  },
  methods: {
    getSubList() {
      console.log(this.currentPage)
      console.log(this.pageSize)
      var startIndex = (this.currentPage - 1) * this.pageSize
      var endIndex = this.currentPage * this.pageSize
      this.pageData = this.newData.slice(startIndex, endIndex)
    },
    getList() {
      this.loading = true
      this.newData = [],
      this.pageData = [],
      this.zxcount = 0,
      this.azcount = 0,
      this.yjData = [],
      this.totalList = [
        { count: 0, lable: '正常台数', icon: 'card-level0', code: 'F' },
        { count: 0, lable: '故障台数', icon: 'card-level1', code: 'D' },
        { count: 0, lable: '预警台数', icon: 'card-level2', code: 'T', YJ: '01' },
        { count: 0, lable: '报警台数', icon: 'card-level3', code: 'T', YJ: '10' }
        // {count:0,lable:"离线台数",icon:"el-icon-circle-close"},
      ],
      // this.$emit('create') // for test
      // var obj = {
      //   url: 'get/reals',
      //   data: {
      //     currentPage:1,
      //     pageSize:10000
      //   }
      // }
      // fetchEvent(obj).then(response => {
      this.dataList = this.list.map((e) => {
        e.ErrLeihuaStatusName = this.getStatusName(e.ErrLeihua)
        // totalList计算total
        // 故障标志位，T有故障，F无故障，D离线
        if (e.ErrFlag == 'F') {
          this.totalList[0].count++
        }
        if (e.ErrFlag == 'D') {
          this.totalList[1].count++
        } else {
          this.zxcount++
        }
        if (e.ErrFlag == 'T') {
          // 01预警
          if (e.ErrThunder == '01' || e.ErrLeihua == '01' || e.ErrLC1 == '01' || e.ErrLC2 == '01' ||
              e.ErrTemp == '01' || e.ErrLC3 == '01'
          ) {
            this.totalList[2].count++
            e.YJ = '01'
            e.ErrLeihuaStatusName = this.getStatusName(e.ErrFlag, e.YJ)
            this.yjData.push(e)
          }
          // 10报警
          if (e.ErrThunder == '10' || e.ErrLeihua == '10' || e.ErrLC1 == '10' || e.ErrLC2 == '10' ||
              e.ErrTemp == '10' || e.ErrLC3 == '10' ||
              e.Switch1 == '1' || e.Switch2 == '1' || e.Switch3 == '1' || e.Switch4 == '1'
          ) {
            this.totalList[3].count++
            e.YJ = '10'
          }
        }
        this.azcount++
        e.ErrLeihuaStatusName = this.getStatusName(e.ErrFlag, e.YJ)
        return e
      })
      this.newData = this.dataList
      this.loading = false
      this.total = this.newData.length
      this.getSubList()
      // })
    },
    getStatusName(code, yj) {
      if (!code) {
        return '未知'
      }
      const statusName = code
      if (code == 'F') {
        return '正常'
      }
      if (code == 'D') {
        return '故障'
      }
      if (code == 'T') {
        if (yj == '01') {
          return '预警'
        }
        if (yj == '10') {
          return '报警'
        }
      }
      return statusName
    },
    handleSetNewData1() {
      this.newData = this.dataList
      this.total = this.newData.length
      this.getSubList()
    },
    //   handleSetNewData(code,yj) {
    //     console.log(code);
    //     this.newData = new Array();
    //     this.dataList.map((e)=>{
    //       if(code == "T"){
    //         if(e.YJ == yj && yj == "10"){
    //           this.newData.push(e);
    //         }else{
    //           this.newData = this.yjData;
    //         }
    //       }else{
    //         if(e.ErrFlag == code){
    //           this.newData.push(e);
    //         }
    //       }
    //     });
    //     this.total = this.newData.length;
    //     this.getSubList();
    //   },
    // },
    handleSetNewData(code, yj) {
      console.log(code)
      this.newData = new Array()
      if (code == 'T' && yj == '01') {
        this.yjData.map(e => {
          this.newData.push(e)
        })
      } else {
        this.dataList.map((e) => {
          if (code == 'T') {
            if (e.YJ == yj && yj == '10') {
              this.newData.push(e)
            }
          } else {
            if (e.ErrFlag == code) {
              this.newData.push(e)
            }
          }
        })
      }
      this.total = this.newData.length
      this.getSubList()
    }
  }
}
</script>

<style lang="scss" scoped>
$r:32;
.mixin-components-container {
  // background-color: #f0f2f5;
  padding: 30/$r+rem 60/$r+rem;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 80px;
  padding: 0;
}
.panel-group {
  margin-top: 15/$r+rem;

  .btmtjbgcolor{
    background: #3671ca;
    color: azure;
  }
  .btmtj{
    text-align: center;
  }
  .card-panel-col {
    margin-bottom: 15px;
  }

  .bicon-people{
    // background: #65d186;
    background: #1AD9E2;
  }

  .bicon-message{
    background: #e0d405;
  }

  .bicon-money{
    background: #F19433;
  }

  .bicon-shopping{
    background: #E93F33
  }
  .bicon-outling{
    background: #aaa4a4
  }
  .card-panel {
    min-height:80px;
    height: auto;
    cursor: pointer;
    font-size: 0;
    position: relative;
    overflow: hidden;
    // color: #666;
    // background: #fff;
   // box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    //border-color: rgba(0, 0, 0, .05);
    background: #4867C1;
    // box-shadow: 0 2px 4px 0 rgba(30,50,109,0.95);
    // &:hover {
    //   .card-panel-icon-wrapper {
    //     color: #fff;
    //   }

    //   .icon-people {
    //     background: #65d186;
    //   }

    //   .icon-message {
    //     background: #e0d405;
    //   }

    //   .icon-money {
    //     background: #F19433;
    //   }

    //   .icon-shopping {
    //     background: #E93F33
    //   }
    //   .icon-outling {
    //     background: #aaa4a4
    //   }
    // }
    &>div{
      display:inline-block;
      vertical-align: bottom;
      height: 100%;
    }
    // .icon-people {
    //   color: #40c9c6;
    // }

    // .icon-message {
    //   color: #f7d736;
    // }

    // .icon-money {
    //   color: #f4516c;
    // }

    // .icon-shopping {
    //   color: #f10606
    // }

    .card-panel-icon-wrapper {
      // float: left;
      padding: 0 2/$r+rem 20/$r+rem 0;
      // transition: all 0.38s ease-out;
    }
    .card-panel-icon-wrapper1 {
      // margin: 17px 0 15px 0;
    }

    .card-panel-icon {
      float: left;
      width: 48/$r+rem;
      font-size: 48/$r+rem;

    }

    .card-level0{
      background:url(~@/assets/images/level-icon-0.png);
      width: 64/$r+rem;
      height: 64/$r+rem;
      margin-left: 17/$r+rem;
      margin-top: 10/$r+rem;
      background-size: cover;
    }
    .card-level1{
      background:url(~@/assets/images/level-icon-1.png);
      width: 64/$r+rem;
      height: 64/$r+rem;
      margin-left: 17/$r+rem;
      margin-top: 10/$r+rem;
      background-size: cover;
    }
    .card-level2{
      background:url(~@/assets/images/level-icon-2.png);
      width: 66/$r+rem;
      height: 64/$r+rem;
      margin-left: 16/$r+rem;
      margin-top: 10/$r+rem;
      background-size: cover;
    }
    .card-level3{
      background:url(~@/assets/images/level-icon-3.png);
      width: 64/$r+rem;
      height: 64/$r+rem;
      margin-left: 17/$r+rem;
      margin-top: 10/$r+rem;
      background-size: cover;
    }

    .card-panel-description {
      // float: right;
      font-weight: 400;
      // margin: 5px 5px 5px 0px;
      margin:20/$r+rem 10/$r+rem 10/$r+rem 35/$r+rem;
      .card-panel-text {
        line-height: 18/$r+rem;
        font-family: SourceHanSansCN-Regular;
        font-size: 18/$r+rem;
        color: #FFFFFF;
        letter-spacing: 0;
        margin-bottom: 15/$r+rem;
        span{
          font-size: 30px;
        }
      }

      .card-panel-num {
        font-size: 20/$r+rem;
      }
    }
    .card-panel-description1 {
      // margin: 15/$r+rem 0 15/$r+rem -15/$r+rem;
      padding: 24/$r+rem 0 15/$r+rem 0;
      margin-left: 15/$r+rem;
      // float: left;
    }

  }

}
.total-group .card-panel{
    min-height:80px;
    height: 135/$r+rem;
    // padding:0 20/$r+rem;
    font-size: 0;
    &.total-card{
      padding:0 20/$r+rem;
    }
    .total {
      display: inline-block;
      width: 50%;
      height: 135/$r+rem;
      min-height:80px;
      line-height: 135/$r+rem;
      font-size: 18/$r+rem;
      text-align:center;
    }
    .t-text{
      color:#FFFFFF;
      background:#579435;
      &.all{
        background: #e49a11;
      }
    }
    .t-num{
      background:#FFFFFF;
      color:#000000;
    }
  }
.spanaa{
  width: 100%;
  display: inline-block;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .card-panel-icon {
      display: block;
      margin: 14/$r+rem auto !important;
      float: none !important;
    }
  }
}
</style>
