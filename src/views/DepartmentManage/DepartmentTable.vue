<template>
    <div shrink="1">
      <div class="filter-container">
        <el-form
          inline
        >
                <el-input
                    v-model="name"
                    placeholder="输入名称过滤"
                    size="small"
                    clearable
                />
        </el-form>
        </div>
        <div shrink="1">
            <el-table
              :data="treedata"
                v-on="$listeners"
                row-key="id"
                ref="table"
            >
                <el-table-column
                    label="名称"
                    prop="name"
                    min-width="200"
                />
                <el-table-column
                    label="备注"
                    prop="path"
                />
                <el-table-column
                    label="其他"
                    prop="pathName"
                />
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selected: {
            type: Array,
            default: () => [],
        },
      treedata: {
        type: Array,
        default: () => [],
      }
    },

    data() {
        return {
            name: '',
        };
    },

    mounted() {
        if (0 < this.selected.length) {
            this.$refs.table.select(({id}) => this.selected.includes(id));
        }
      const {table} = this.$refs;

        table.data = this.treedata;
    },

    watch: {
        name(value) {
            const {table} = this.$refs;
            if (value) {
                this.treedata.filter(({name}) => {
                    const re = new RegExp(value);
                    return re.test(name);
                });
            }
            else {
                this.treedata.filter(() => true);
            }
        },
    },
}
</script>
