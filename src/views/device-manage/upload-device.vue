<template>
  <div class="app-container">
    <upload-excel-component :on-handle-save="handleSave" :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div style="float: right;" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>

const calendarTypeOptions = [

  { key: '节点ID', display_name: 'ID' },
  { key: '节点编号', display_name: 'addr' },
  { key: '节点地址', display_name: 'addr' },
  { key: '状态', display_name: 'delete' },
  { key: '配电箱号', display_name: 'name' },
  { key: '产品ID', display_name: 'PID' },
  { key: '节点类型', display_name: 'NodeType' },
  { key: '设备类型', display_name: 'NodeType' },
  { key: '接地电阻', display_name: 'RAlarm' },
  { key: '设置电阻报警值', display_name: 'RAlarm' },
  { key: '备注', display_name: 'descript' },
  { key: '说明', display_name: 'descript' },
  { key: '安装位置', display_name: 'InstallPos' },
  { key: '串口服务器IP', display_name: 'serialserver_ip' },
  { key: '串口服务器端口', display_name: 'serialserver_port' },
  { key: '端口', display_name: 'serialserver_port' },
  { key: '雷击电流报警设定值', display_name: 'TCurrentAlarm' },
  { key: '温度报警设定值', display_name: 'TAlarm' },
  { key: '温升限值设定值', display_name: 'TRiseMax' },
  { key: '漏电流限值', display_name: 'LCurrentMax' },
  { key: '脱扣', display_name: 'BOut' },
  { key: '开关量1', display_name: 'Switch1' },
  { key: '开关量2', display_name: 'Switch2' },
  { key: '开关量3', display_name: 'Switch3' },
  { key: '开关量4', display_name: 'Switch4' },
  { key: '漏电流1', display_name: 'TCurrent1' },
  { key: '漏电流2', display_name: 'TCurrent2' },
  { key: '漏电流3', display_name: 'TCurrent3' },
  { key: '配电柜', display_name: 'PDC' }

]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { fetchEvent } from '@/api/article'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      type: 'node'
    }
  },
  created() {
    this.type = this.$route.params.type
    // if (this.action) {
    //   // const id = this.$route.params && this.$route.params.id
    //   this.postForm = this.$route.params
    // }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请上传小于1m的文件.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    handleSave({ results, header }) { // 保存数据库
      if (!results) {
        this.$message({
          message: '没有要保存的内容.',
          type: 'warning'
        })
        return false
      }
      this.listLoading = true

      // 转换json数据
      var dataList = results.map((item) => {
        const obj = {}
        header.map((key) => {
          obj[calendarTypeKeyValue[key]] = item[key]
        })
        obj.delete = 0
        return obj
      })
      console.log(dataList)

      var query = {
        url: 'uc/nodes/batch',
        data: {
          dataList,
          type: this.type
        },
        methods: 'post'
      }
      fetchEvent(query).then(response => {
        this.$message({
          message: '保存成功.',
          type: 'success'
        })
        this.$router.push({ name: 'deviceManage', params: { id: '' }}) //
      })
    }
  }
}
</script>
