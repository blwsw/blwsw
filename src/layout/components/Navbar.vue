<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <div class="logo-img"></div>
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->
<!-- 
        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" /> -->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div  v-if="device!=='mobile'" class="time" style="">{{currentTime}}</div>
          <img src="~@/assets/images/user-head.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link> -->
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
// import TagsView from '../components'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  data() {
    return {
      timer: "",//定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
    };
  },
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        _this.doHandleMonth((new Date().getMonth() + 1)) +
        "-" +
        _this.doHandleMonth((new Date().getDate())) +
        " " +
        _this.doHandleMonth(new Date().getHours()) +
        ":" +
        _this.doHandleMonth(new Date().getMinutes()) +
        ":" +
        _this.doHandleMonth(new Date().getSeconds());
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
  }
}
</script>

<style lang="scss" scoped>
 @import "~@/styles/flexible.scss";
.navbar {
  height: rem(69);
  overflow: hidden;
  position: relative;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // border-bottom:1px solid #849FEE;
  background: url('~@/assets/images/top.png') no-repeat;
  background-position: center;
  background-size: 100%;
  .logo-img{
    margin-top: rem(8);
    margin-left: rem(122);
    width: rem(178);
    height: rem(53);
    background: url('~@/assets/images/full-logo.png') no-repeat;
    background-size: cover;
    display: inline-block;
  }
  .hamburger-container {
    line-height: 60px;
    width: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    border-right: 1px solid #849FEE;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: rem(50);
    margin-right: rem(60);
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: rem(18);
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: rem(30);
      font-family: Helvetica;
      font-size: rem(30);
      color: rgb(30,185,220);
      .avatar-wrapper {
        position: relative;
        .time{
          font-size: rem(14);
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #84DBFC;
          display:inline-block;
          line-height: rem(40);
          height: rem(40); 
          vertical-align: text-bottom;
           margin-right:rem(20);
        }
        .user-avatar {
          cursor: pointer;
          width: rem(44);
          height: rem(44);
          border-radius: rem(22);
          margin-top: rem(12);
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: rem(-20);
          top: rem(25);
          font-size: rem(16);
        }
      }
    }
  }
}
</style>
