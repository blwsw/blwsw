<template>
    <el-form
        label-width="5em"
        :model="form"
        :rules="rules"
        ref="form"
    >
        <el-form-item
            label="名称"
            prop="name"
        >
            <el-input
                v-model.trim="form.name"
                placeholder="请输入名称"
                clearable
                size="small"
            />
        </el-form-item>

        <el-form-item
                label="类型"
                prop="type"
        >
            <el-radio v-model="form.type" :label="te.code" v-for="te in types" :key="te.code">{{te.name}}</el-radio>
        </el-form-item>

        <el-form-item
            label="备注"
            prop="path"
        >
            <el-input
              v-model="form.path"
                size="small"
            />
        </el-form-item>

        <el-form-item
            label="其他"
            prop="pathName"
        >
            <el-input
              v-model="form.pathName"
                size="small"
            />
        </el-form-item>

        <el-form-item
            label="归属部门"
            prop="parentId"
        >
          <el-input
            v-model="form.parentName"
            size="small"
          />
          <el-input
            v-model="form.parentId"
            type="hidden"
            size="small"
          />
          <el-button @click="dialogSelectVisible = true">选择</el-button>
           <el-dialog title="选择上级" z-index="20" :visible.sync="dialogSelectVisible">

             <DepartmentTree
               :tree="$store.state.departments.tree"
               select-mode="single"
               @click-node="clickNode"
             />

           </el-dialog>
        </el-form-item>
    </el-form>
</template>

<script>
import DepartmentTree from './DepartmentTree.vue';
import { fetchEvent } from '@/api/article'

export default {
    components: {
      DepartmentTree,
    },

    props: {
        data: {
            type: Object,
            default: () => ({
                path: '',
                pathName: '',
                type:'NL',
            }),
        },
    },

    data() {
        return {
            form: (() => {
                const {id, name, parentId, path, pathName, type, factoryId} = this.data;
                return {id, name, parentId, path, pathName, type, factoryId};
            })(),
          checkStrictly: true,
            parent: null,
          defaultProps: {
            children: 'children',
            label: 'name'
          },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur',
                    },
                ],
              parentId: [
                {
                  required: true,
                  message: '请选择上级',
                  trigger: 'blur',
                },
              ],
            },

            types:[],
          dialogSelectVisible: false,
          seleNode:{}
        };
    },

    watch: {
        // {{{ parent
        //
        // parent(value) {
        //     if (value) {
        //         const {id, name, path, pathName} = value;
        //         this.form.path = `${path}${id}/`;
        //         this.form.pathName = `${pathName}${name}/`;
        //     }
        //     else {
        //         this.form.path = '';
        //         this.form.pathName = '';
        //     }
        // },

        // }}}
    },

    async created() {

      var obj = {
        url: 'uc/dicts',
        data: {
          typeCode: 'DEPT_TYPE'
        },
        params: {
          typeCode: 'DEPT_TYPE'
        }
      }
      var context = this;
      fetchEvent(obj).then(response => {
        const items = response.responseBody;
        const types = items.map(({code, name}) => {
          return {code, name};
        });

        this.types = types;
      })
    },

    methods: {
        // {{{ validate()
      clickNode(obj){
        this.dialogSelectVisible =false;
        this.form.parentId = obj.id;
        this.form.parentName = obj.name;
        this.form.factoryId = obj.factoryId;
        this.seleNode = obj;
        },
        validate() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate((isValid, errDetail) => {
                    if (isValid) {
                        resolve([true, {
                            ...this.form,
                            factoryId: this.$store.state.user.factoryId,
                        }]);
                    }
                    else {
                        resolve([false, errDetail]);
                    }
                });
            });
        },

        // }}}
    },
};
</script>
