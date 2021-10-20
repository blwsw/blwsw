<template>
  <div class="tab-container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <TabPane v-if="'L1'==item.key" :type="item.key"  @create="showCreatedTimes" />
          <TabPane v-if="'L2'==item.key" :type="item.key"  @create="showCreatedTimes" />
          <TabPane v-if="'L3'==item.key" :type="item.key"  @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/TabPane'

export default {
  name: 'History',
  components: { TabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '电涌保护器', key: 'L1' },
        { label: '接地电阻保护', key: 'L2' },
        { label: '大气电场仪器', key: 'L3' }
      ],
      activeName: 'L1',
      createdTimes: 0
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
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
