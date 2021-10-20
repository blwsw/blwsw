<template>
    <div ref="popup" title="新增" modal>
        <div
            shrink="1"
            scroll
            style="padding: 10px;"
        >
            <DepartmentForm
                :disabled="busy"
                click-node="clicknode"
                ref="form"
            />
        </div>

        <template >
            <el-button
                    type="primary"
                    :disabled="busy"
                    @click="onClickSave"
                    size="small"
            >保存</el-button>
            <el-button
                    :disabled="busy"
                    @click="close()"
                    size="small"
            >取消</el-button>
        </template>
    </div>
</template>

<script>
import DepartmentForm from './DepartmentForm.vue';

export default {
    components: {
        DepartmentForm,
    },

    data() {
        return {
            busy: false,
        };
    },

    methods: {
        open() {
            return this.$refs.popup.open();
        },
        close(){
          this.$emit('handleSetLineChartData', "2")
        },
        clicknode(obj){
          debugger
       },
        async onClickSave() {
            const [isValid, data] = await this.$refs.form.validate();

            if (isValid) {
                this.busy = true;
                  this.$store.dispatch('departments/create', data);
                  this.busy = false;
                   this.close();

            };
        },
    },
};
</script>
