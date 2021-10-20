<template>
    <div class="tree-key">
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            clearable
        />
        <el-tree
            ref="tree"
            draggable
            highlight-current
            :data="tree"
            :props="{label: 'name', children: 'children'}"
            :filter-node-method="filterNode" show-checkbox
            @node-click="$emit('click-node', $event)"
            @check-change="checkChange"


        />
    </div>
</template>

<script>
import DepartmentTreeContextMenu from './DepartmentTreeContextMenu.vue';

export default {
  name: 'departmenttree',
    components: {
    },

   // inject: ['updateDepartment'],

    props: {
      selected: {
        type: Array,
        default: () => [],
      },
        tree: {
            type: Array,
            required: true,
        },
    },
  created()  {

    this.$refs.tree;
  },
    data() {
        return {
            filterText: '',
        };
    },

    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
      checkChange(data,ischeck,chchecked) {
        this.selected = this.$refs.tree.getCheckedNodes();

        this.$emit('change-selection',this.selected);
      },
        onContextMenu(event, data, node,vm) {
            const menu = [
              [
                {
                  name: '新建子部门',
                  onClick: () => {
                   // this.$refs.createPopup.open('append', data);
                  },
                },
                {
                  name: '新建同级部门',
                  onClick: () => {
                  //  this.$refs.createPopup.open('insertBefore', data);
                  },
                },
              ],
              [
                {
                  name: '删除',
                  onClick: () => {
                   // this.deleteDepartment(data.id);
                  },
                },
              ],
            ];

          // this.$refs.contextMenu.open(event, menu);
        },

        onNodeDrop(src, dest, relation) {
            const data = {...src.data};

            if ('after' === relation || 'before' === relation) {
                if (data.parentId !== dest.data.parentId) {
                    data.parentId = dest.data.parentId;
                    this.updateDepartment(data);
                }
            }
            else if ('inner' === relation) {
                if (data.parentId !== dest.data.id) {
                    data.parentId = dest.data.id;
                    this.updateDepartment(data);
                }
            }
        },

        // {{{ filterNode()

        filterNode(value, data) {
            if (value) {
                value = value.toLowerCase();

                const {
                    id,
                    name,
                    path,
                    pathName,
                } = data;

                return `${id} ${name} ${path} ${pathName}`.toLowerCase().match(value);
            }
            else {
                return true;
            }
        },

        // }}}
    },
}
</script>
<style lang="scss" scoped>
@import "~@/styles/flexible.scss";
.tree-key::v-deep{
  .el-input__inner{
    background-color: #0a3965 !important;
    margin-bottom: rem(20);
  }
  .el-tree{
    color: #9cb2dc;
    background-color: #07233d !important;
    .el-tree-node__content{

      height: rem(40);
      
      .el-tree-node__expand-icon{
        color:#4696ff;
      }
      .el-checkbox__inner{
        border: 1px solid #4696ff;
        background-color: transparent;
      }
      .el-tree-node__label{
        font-size: rem(16);
      }
     
    }
     
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content,.el-tree-node__content:hover {
    background-color: #0d3b69;
  }
}
</style>