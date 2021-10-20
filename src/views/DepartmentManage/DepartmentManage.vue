<template>
  <div class="app-container">
    <div
        style="padding: 0"
        grow="1"
        shrink="1"
    >
        <div
            direction="row"
            align-items="center"
            justify-content="space-between"
        >
            <div class="el-table-header">组织机构</div>

              <div class="filter-container">
                <el-form
                  inline
                  :model="listQuery"
                >
                  <el-button class="filter-item" type="primary"
                        @click="dialogFormVisible = true"
                    >新增</el-button>

                    <el-button class="filter-item"
                        type="primary"
                        :disabled="! selected"
                        @click="deleteDepartment(selected)"
                    >删除</el-button>
                </el-form>
            </div>
        </div>

        <DepartmentTree
            :tree="$store.state.departments.tree"
            select-mode="single"
            @change-selection="changeSelection"
        />
      <el-dialog title="创建" :visible.sync="dialogFormVisible">
        <DepartmentCreatePopup @handleSetLineChartData="dozcz"
            ref="popupCreate"
        />
      </el-dialog>
      <el-dialog title="修改" :visible.sync="dialogFormVisible2">
        <DepartmentEditPopup @handleSetLineChartData="dozcz1"
            ref="popupEdit"
            :data="selected"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DepartmentCreatePopup from './DepartmentCreatePopup.vue';
import DepartmentEditPopup from './DepartmentEditPopup.vue';
import DepartmentTable from './DepartmentTable.vue';
import DepartmentTree from './DepartmentTree.vue';
import waves from '@/directive/waves'
import permission from '@/directive/permission' // waves directive
export default {
    name: 'department',
  directives: { waves, permission },
    components: {
      DepartmentTree,
        DepartmentTable,
        DepartmentCreatePopup,
        DepartmentEditPopup,
    },

    data() {
        return {
          selected: null,
          dialogFormVisible: false,
          dialogFormVisible2: false,
          listQuery:{}
        };
    },

    created() {

      this.$store.dispatch('departments/load');

    },

    methods: {
      changeSelection(obj){
        this.selected = obj;
      },
      dozcz1(){
        this.dialogFormVisible2 =false;
      },
      dozcz(){
        this.dialogFormVisible =false;
      },
        async deleteDepartment(department) {
            try {
                await this.$confirm(
                    `确定要删除${department[0].name}等相关内容吗？`,
                    '提示',
                    {type: 'warning'},
                );
            }
            catch {
                return;
            }

            var ids = "";
          department.forEach((d) => {
            if(ids ==""){
              ids = d.id;
            }else{
              ids+="," +d.id;
            }

          })
          ids = department[0].id;
          await this.$store.dispatch('departments/delete', ids);
          this.selected = null;
        },

        // }}}
    },
}
</script>
<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
  .el-table-header {
    // display: flex;
    // width: 100%;
    // padding-bottom: 5px;
    // color: #746121;
    // font-size: 14px;
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
  

  </style>
