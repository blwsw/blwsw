<template>
  <div class="tab-container blw">
    <!--<el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />-->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <TabPane v-if="'L1'==item.key" :type="item.key" :data-list="dataList" @getDataList="getList" @create="showCreatedTimes" />
          <TabPane v-if="'L2'==item.key" :type="item.key" :data-list="dataList" @getDataList="getList" @create="showCreatedTimes" />
          <TabPane v-if="'L3'==item.key" :type="item.key" :data-list="dataList" @getDataList="getList" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './device-list'
import TabPaneL3 from './components/TabPaneL3'
import TabPaneL2 from './components/TabPaneL2'
import { fetchEvent } from '@/api/article'
export default {
  name: 'DeviceListTab',
  components: { TabPane, TabPaneL2, TabPaneL3 },
  data() {
    return {
      tabMapOptions: [
        { label: '电涌保护器', key: 'L1' },
        { label: '接地电阻保护', key: 'L2' },
        { label: '大气电场仪器', key: 'L3' }

      ],
      activeName: 'L1',
      createdTimes: 0,
      dataList: [],
      listQuery: {
        currentPage: 1,
        pageSize: 5,
        sort: '-in_Time',
        queryString:{
          nodeType:"ly"
        }
      }
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
     this.params = this.$route.params
    // console.log(this.params);
     if (this.params) {
    //   // const id = this.$route.params && this.$route.params.id
       var ppame = this.$route.params
       ppame = ppame['ppame']
       if(ppame === 'dy'){
         this.activeName = "L1";
       }else
       if(ppame === 'jd'){
         this.activeName = "L2";
    //   }else {
    //     this.listQuery.type = ['1', '2', '3']
       }
     }
    // this.$store.dispatch('departments/load');
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    getList() {
      this.loading = true
      // this.$emit('create') // for test
      var obj = {
        url: 'core/dlist',
        data: this.listQuery
      }
      fetchEvent(obj).then(response => {
        this.dataList = response.responseBody
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
  .tab-container {
    padding: rem(30) rem(60);
  }
  .el-tabs__content{
    padding: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
</style>
