<template>
  <div class="tab-container blw divice-param" style="padding:0">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <TabPane v-if="'L1'==item.key" :type="item.key" :data-list="dataListLY" @getDataList="getList" @create="showCreatedTimes" />
          <TabPane v-if="'L2'==item.key" :type="item.key" :data-list="dataListP" @getDataList="getList" @create="showCreatedTimes" />
          <TabPane v-if="'L3'==item.key" :type="item.key" :data-list="dataList" @getDataList="getList" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './device-params.vue'
import { fetchEvent } from '@/api/article'
export default {
  name: 'DeviceTab',
  components: { TabPane },
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
      dataListLY: [],
      dataListP: [],
      listQuery: {
        currentPage: 1,
        pageSize: 5,
        sort: '-in_Time',
        queryString: {
          nodeType: 'ly'
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
      if (ppame === 'dy') {
        this.activeName = 'L1'
      } else
      if (ppame === 'jd') {
        this.activeName = 'L2'
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
        // if(val == 'L1'){
        this.dataList.map((item, i) => {
          if (item.PID == 1) {
            this.dataListLY.push(item)
          } else {
            this.dataListP.push(item)
          }
        })
        // }
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
