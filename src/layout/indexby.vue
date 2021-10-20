<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar/>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main/>
      <right-panel v-if="showSettings">
        <settings/>
      </right-panel>
    </div>
  </div>
</template>

<script>
  import RightPanel from '@/components/RightPanel'
  import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'
  import store from '@/store'
  import { MessageBox } from 'element-ui'

  export default {
    name: 'Layout',
    components: {
      AppMain,
      Navbar,
      RightPanel,
      Settings,
      Sidebar,
      TagsView
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView,
        fixedHeader: state => state.settings.fixedHeader
      }),
      classObj() {
        return {
          // hideSidebar: !this.sidebar.opened,
          // openSidebar: this.sidebar.opened,
          hideSidebar: false,
          openSidebar: true,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    mounted() {
      // WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket(process.env.VUE_APP_WS_URS + this.$store.state.user.userId) //+ this.userName
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    beforeDestroy() {
      this.onbeforeunload()
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      },
      initWebSocket() {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage() {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage() {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage(event) {
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
        if (event.data) {
          var redata = event.data
          redata = JSON.parse(redata)
          if (redata.type == 'real') {
            //  var newData = redata.data;
            //  store.dispatch('app/setReals',newData)
            /**
             newData.In_Time = this.parseTime1(newData.In_Time);
             //新数据追加进去
             this.relas = this.$store.state.app.reals;
             if(!this.relas || this.relas.length ==0){
            this.relas = store.dispatch('app/getReals',{reload:true} )
          }else{
            this.relas.some((item, i) => {
              console.log("item.id="+item.id);
              console.log("newData.id="+newData.Id);
              if (item.id == newData.Id){
                newData["pdcNo"]=item.pdcNo;
                newData["InstallPos"] =item.InstallPos;
                newData["NodeType"] = item.NodeType;
                newData["name"]=item.name;
                newData["PID"]=item.PID;
                newData["addr"]=item.addr;
                newData["id"]=item.id;
               // this.relas.splice(i,1,newData);
                this.relas.splice(i,1);
                this.relas.unshift(newData)
                // 在数组的some方法中，如果return true，就会立即终止这个数组的后续循环,所以相比较foreach，如果想要终止循环，那么建议使用some
                return true
              }
            })
            //
          }
             //store.dispatch('app/setReals',null)
             store.dispatch('app/setReals',this.relas)
             // store.dispatch('app/setNewData', newData)
             **/
          } else if (redata.type == 'nsservece') {
            var newData = redata.data
            if (newData) {
              MessageBox.alert('采集服务连接超时，后台已触发服务初始化接口，请确认采集服务是否正常运行!', '采集服务连接超时', {
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
                type: 'warning'
              })
            }
          } else if (redata.type == 'serveceReturn') {
            this.$router.go(0)
          } else {
            var newData = redata.data
            //console.log(newData)
            store.dispatch('app/setNodes', newData)
          }

        }

      },

      parseTime1(dateobj) {
        var datestr = dateobj.year + '-' + dateobj.monthValue + '-' + dateobj.dayOfMonth + ' ' + dateobj.hour + ':' + dateobj.minute + ':' + dateobj.second
        return datestr
      },
      setOncloseMessage() {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload() {
        this.closeWebSocket()
      },
      closeWebSocket() {
        this.websocket.close()
      }
    }
  }

  initWebSocket:function() {
    this.websocket.onerror = this.setErrorMessage,
      this.websocket.onopen = this.setOnopenMessage,
      this.websocket.onmessage = this.setOnmessageMessage,
      this.websocket.onclose = this.setOncloseMessage,
      window.onbeforeunload = this.onbeforeunload
  }
  ,
  setErrorMessage:function() {
    console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState), this.reconnect()
  }
  ,
  setOnopenMessage:function() {
    console.log('WebSocket连接成功    状态码：' + this.websocket.readyState), this.reset(), this.start()
  }
  ,
  setOnmessageMessage:function(e) {
    if (this.reset(), this.start(), console.log('服务端返回：' + e.data.length), 'ping' != e.data && e.data) {
      var t = e.data
      if (t = JSON.parse(t), 'real' == t.type) {
        var n = t.data
        jt['a'].dispatch('app/setReals', n)
      } else if ('nsservece' == t.type) {
        n = t.data
        n && Ut['MessageBox'].alert('采集服务连接超时，后台已触发服务初始化接口，请确认采集服务是否正常运行!', '采集服务连接超时', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭',
          type: 'warning'
        })
      } else if ('serveceReturn' == t.type) {
        this.$router.go(0)
      } else if ('TJDATA' == t.type) {
        jt['a'].dispatch('app/setNewData', t)
      } else {
        n = t.data
        jt['a'].dispatch('app/setNodes', n)
      }
    }
  }
  ,
  parseTime1:function(e) {
    var t = e.year + '-' + e.monthValue + '-' + e.dayOfMonth + ' ' + e.hour + ':' + e.minute + ':' + e.second
    return t
  }
  ,
  setOncloseMessage:function(e) {
    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean), console.log(e), console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState), this.reconnect()
  }
  ,
  onbeforeunload:function() {
    this.closeWebSocket()
  }
  ,
  closeWebSocket:function() {
    this.websocket.close()
  }
  ,
  reconnect:function(e) {
    var t = this
    this.lockReconnect || (this.lockReconnect = !0, setTimeout((function() {
      t.websocket = new WebSocket('ws://101.200.162.47:18762/websocket/' + t.$store.state.user.userId), t.initWebSocket(), t.lockReconnect = !1
    }), 2e3))
  }
  ,
  reset:function() {
    clearTimeout(this.timeoutObj), clearTimeout(this.serverTimeoutObj)
  }
  ,
  start:function() {
    var e = this
    this.timeoutObj = setTimeout((function() {
      e.websocket.send('ping'), console.log('ping! 后端websocket 验证是否中断'), e.serverTimeoutObj = setTimeout((function() {
        e.websocket.close()
      }), e.timeout)
    }), this.timeout)
  }
  }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  @import "~@/styles/flexible.scss";

  #app .main-container {
    // background: -webkit-linear-gradient(left, red , blue)
    // background: linear-gradient(left, #294390, #1d3068);
    background: #182655; // #294390;
    background: -moz-linear-gradient(left, #182655 0%, #1d3068 100%);
    // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#182655), color-stop(100%,#1d3068));
    background: -webkit-linear-gradient(left, #182655 0%, #1d3068 100%);
    background: -o-linear-gradient(left, #182655 0%, #1d3068 100%);
    background: -ms-linear-gradient(left, #182655 0%, #1d3068 100%);
    background: linear-gradient(left, #182655 0%, #1d3068 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#182655', endColorstr='#1d3068', GradientType=0);
    //background: url('~@/assets/images/main-bak.png') no-repeat;
    background-size: cover;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    // height: rem(70);
    // width: calc(100% - #{$sideBarWidth});
    // width: 100%;
    // transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 69px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
