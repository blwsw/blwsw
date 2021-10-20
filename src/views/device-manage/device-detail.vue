<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px" class="form-container">
      <div class="createPost-main-container">
        <div class="paramscontainer">
          <div class="title">基础信息</div>
          <el-row :gutter="80">
            <el-col :span="12">
              <el-form-item label="节点ID" label-width="140px" name="ID" :maxlength="100" :disabled="action1" class="postInfo-container-item">
                <el-input v-model="postForm.ID" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节点编号" label-width="140px" name="addr" :maxlength="100" :disabled="action1" class="postInfo-container-item">
                <el-input v-model="postForm.addr" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80">
            <el-col :span="12">
              <el-form-item label="配电箱号" label-width="140px" name="name" :maxlength="100" :disabled="action" class="postInfo-container-item">
                <el-input v-model="postForm.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品ID" label-width="140px" name="PID" :maxlength="100" :disabled="action" class="postInfo-container-item">
                <el-input v-model="postForm.PID" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80">
            <el-col :span="12">
              <el-form-item label="节点类型" label-width="140px" name="NodeType" :maxlength="100" :disabled="action" class="postInfo-container-item">
                <el-input v-model="postForm.NodeType" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="说明" label-width="140px" name="descript" :maxlength="100" :disabled="action" class="postInfo-container-item">
                <el-input v-model="postForm.descript" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80">
            <el-col :span="12">
              <el-form-item label="安装位置" label-width="140px" prop="InstallPos" class="postInfo-container-item">
                <el-input v-model="postForm.InstallPos" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="串口服务器IP" label-width="140px" prop="serialserver_ip" class="postInfo-container-item">
                <el-input v-model="postForm.serialserver_ip" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80">
            <el-col :span="12">
              <el-form-item label="串口服务器端口" label-width="140px" prop="serialserver_port" class="postInfo-container-item">
                <el-input v-model="postForm.serialserver_port" placeholder="port 88 or 80" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" label-width="140px" class="postInfo-container-item">
                <el-input v-model="postForm.delete" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <!--
        <div class="paramscontainer">
          <div class="title">基础信息</div>
          <el-row :gutter="60">
            <el-col :span="24">
              <el-form-item label="节点编号" name="addr" :maxlength="100" required :disabled="action" class="postInfo-container-item">
                <el-input v-model="postForm.addr" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="6">
              <el-form-item label="名称" label-width="70px" prop="name" class="postInfo-container-item">
                <el-input v-model="postForm.name" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="状态" label-width="70px" class="postInfo-container-item">
                <el-select v-model="postForm.delete" class="filter-item" placeholder="Please select">
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="串口服务器IP" label-width="140px" prop="serialserver_ip" class="postInfo-container-item">
                <el-input v-model="postForm.serialserver_ip" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="串口服务器端口" label-width="140px" prop="serialserver_port" class="postInfo-container-item">
                <el-input v-model="postForm.serialserver_port" placeholder="port 88 or 80" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="说明" label-width="70px" prop="descript" class="postInfo-container-item">
                <el-input v-model="postForm.descript" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="140px" label="安装位置" prop="InstallPos" class="postInfo-container-item">
                <el-input v-model="postForm.InstallPos" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="paramscontainer">
          <div class="title">设备参数</div>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="雷击电流报警设定值 (单位：KA)" label-width="300px" prop="TCurrentAlarm" class="postInfo-container-item">
                <el-input v-model="postForm.TCurrentAlarm" placeholder="雷击电流报警设定值，单位：KA" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="温度报警设定值 (单位：摄氏度)" label-width="300px" prop="TAlarm" class="postInfo-container-item">
                <el-input v-model="postForm.TAlarm" placeholder="温度报警设定值，单位：摄氏度" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <el-form-item label="温升限值设定值 (单位：摄氏度)" label-width="300px" prop="TRiseMax" class="postInfo-container-item">
                <el-input v-model="postForm.TRiseMax" placeholder="温升限值设定值，单位：摄氏度" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="漏电流限值 (单位：mA)" label-width="300px" prop="LCurrentMax" class="postInfo-container-item">
                <el-input v-model="postForm.LCurrentMax" placeholder="漏电流限值，单位：mA" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="6">
              <el-form-item label="脱扣" prop="BOut" class="postInfo-container-item">
                <el-select v-model="postForm.BOut" class="filter-item" placeholder="脱扣，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开关量1" prop="Switch1" class="postInfo-container-item">
                <el-select v-model="postForm.Switch1" class="filter-item" placeholder="开关量1，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开关量2" prop="Switch2" class="postInfo-container-item">
                <el-select v-model="postForm.Switch2" class="filter-item" placeholder="开关量2，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开关量3" prop="Switch3" class="postInfo-container-item">
                <el-select v-model="postForm.Switch3" class="filter-item" placeholder="开关量3，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="6">
              <el-form-item label="开关量4" prop="Switch4" class="postInfo-container-item">
                <el-select v-model="postForm.Switch4" class="filter-item" placeholder="开关量4，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏电流1" prop="TCurrent1" class="postInfo-container-item">
                <el-select v-model="postForm.TCurrent1" class="filter-item" placeholder="漏电流1，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏电流2" prop="TCurrent2" class="postInfo-container-item">
                <el-select v-model="postForm.TCurrent2" class="filter-item" placeholder="漏电流2，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏电流3" prop="TCurrent3" class="postInfo-container-item">
                <el-select v-model="postForm.TCurrent3" class="filter-item" placeholder="漏电流3，E:开启 D:关闭">
                  <el-option v-for="item in kgSelect" :key="item.value" :label="item.lable" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        -->
        <!--el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item-->
        <!--<sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
            保存
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm">
            取消
          </el-button>
        </sticky>-->
        <div class="btn-area">
          <el-button v-loading="loading" class="" type="success" @click="submitForm">
            保存
          </el-button>
          <el-button v-loading="loading" class="table-btn orange" type="warning" @click="draftForm">
            取消
          </el-button>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle, fetchEvent } from '@/api/article'
import { searchUser } from '@/api/remote-search'

const defaultForm = {
  status: 'draft',
  // title: '', // 文章题目
  // content: '', // 文章内容
  // content_short: '', // 文章摘要
  // source_uri: '', // 文章外链
  // image_uri: '', // 文章图片
  // display_time: undefined, // 前台展示时间
  // id: undefined,
  // platforms: ['a-platform'],
  // comment_disabled: false,
  // importance: 0
  addr: '',
  delete: '',
  name: '',
  descript: '',
  InstallPos: '',
  serialserver_ip: '',
  serialserver_port: '',
  TCurrentAlarm: '',
  TAlarm: '',
  TRiseMax: '',
  LCurrentMax: '',
  BOut: '',
  Switch1: '',
  Switch2: '',
  Switch3: '',
  Switch4: '',
  TCurrent1: '',
  TCurrent2: '',
  TCurrent3: ''
}

export default {
  name: 'DeviceDetail',
  components: { Tinymce, MDinput, Upload, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      action1: false,
      userListOptions: [],
      rules: {
        serialserver_ip: [{ validator: validateRequire }],
        addr: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      action: '',
      statusOptions: [{
        value: '0', lable: '禁用'
      }, {
        value: '1', lable: '启用'
      }],
      kgSelect: [{
        value: 'E', lable: '开启'
      }, {
        value: 'D', lable: '关闭'
      }]
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.addr.length
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
    this.action = this.$route.params.isEdit
    if (this.action) {
      // const id = this.$route.params && this.$route.params.id
      this.postForm = this.$route.params
      this.action1 = true
    } else {
      this.action1 = false
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          let methodpost = 'post'
          var url = 'uc/nodes'

          if (this.action) {
            methodpost = 'put'
            url = 'uc/nodes/' + this.postForm.addr
          }
          var query = {
            url: url,
            data: this.postForm,
            methods: methodpost
          }
          fetchEvent(query).then(response => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.draftForm()
            this.listLoading = false
            this.postForm.status = 'published'
          })

          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      //
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/flexible.scss";
$r:32;
.createPost-container {
  position: relative;
  padding: rem(80) rem(60);
  .createPost-main-container {
    // padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: rem(10);

      .postInfo-container-item {
        // float: left;
        // width: 100%;
      }
    }
    .paramscontainer{
      margin-bottom: rem(30);
      .title{
        //margin-top:30/$r+rem;
        margin-bottom:rem(30);
        height: rem(24);
        line-height: rem(24);
        font-family: SourceHanSansSC-Regular;
        font-size: rem(18);
        color: #FFFFFF;
        letter-spacing: 0;
        padding-left: rem(16);
        position: relative;
        &::before{
          content: '';
          position: absolute;
          left: 0px;
          top: 0;
          height: 100%;
          width: rem(4);
          background-color: #FFFFFF;
        }
      }
      &:first-child{
           border-bottom: 1px solid rgba(231,232,242,.21);
        }
    }
  }

  .word-counter {
    width: rem(40);
    position: absolute;
    right: rem(10);
    top: 0px;
  }
  .sub-navbar{
    background:transparent!important;
    &.draft{
      background:transparent!important;
    }
  }
}
.article-textarea ::v-deep {
  textarea {
    padding-right: rem(40);
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
