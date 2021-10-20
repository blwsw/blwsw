<template>
  <div class="createPost-container">
    <el-form ref="dataForm" :rules="rules" :model="logs" label-position="left" label-width="100px">
      <el-form-item label="请求编号">
        <span>{{ logs.seqNo }}</span>
      </el-form-item>
      <el-form-item label="请求内容">
        <el-input v-model="logs.requestBody" :autosize="{ minRows:8, maxRows:10}" type="textarea" placeholder="Please input" />
      </el-form-item>

      <el-form-item label="响应内容">
        <el-input v-model="logs.responseBody" :autosize="{ minRows:8, maxRows: 10}" type="textarea" placeholder="Please input" />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

const defaultForm = {

  requestBody: '', // requestBody
  responseBody: '' // responseBody

}

export default {
  name: 'LogsDetail',
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logs: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
      },
      tempRoute: {}

    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    const seqNo = this.$route.params && this.$route.params.seqNo
    const responseBody = this.$route.params && this.$route.params.responseBody
    const requestBody = this.$route.params && this.$route.params.requestBody
    this.logs = {
      seqNo,
      responseBody,
      requestBody
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$r:32;
 @import "~@/styles/flexible.scss";
.createPost-container {
  position: relative;
  padding: rem(30) rem(60);
  .createPost-main-container {
    padding: rem(40) rem(45) rem(20) rem(50);
  }
  span{
    font-size:rem(18);
    color:#FFFFFF;
  }
}
</style>
