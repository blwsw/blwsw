<template>
    <div ref="popup" title="修改" modal>
        <div
            shrink="1"
            scroll
            style="padding: 10px;"
        >
            <DepartmentForm
                :data="$attrs.data"
                :disabled="busy"
                ref="form"
            />
        </div>

        <template >
            <div style="text-align: center">
                <el-button
                        type="primary"
                        :disabled="busy"
                        @click="onClickSave"
                        size="small"
                >保存</el-button>
                <el-button
                        :disabled="busy"
                        @click="$refs.popup.close()"
                        size="small"
                >取消</el-button>
            </div>
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
            this.$refs.popup.open({isModal: true});
        },

        async onClickSave() {
            const [isValid, data] = await this.$refs.form.validate();

            if (isValid) {
                this.busy = true;

                try {
                    await this.$hd.runAsync(async (options) => {
                        options.loadingMsg = '正在更新，请稍候...';
                        options.showOk = true;
                        options.okMsg = '更新成功！';
                        options.errorMsg = ({message}) => `更新失败: ${message}`;

                        await this.$store.dispatch('departments/update', data);
                        this.$refs.popup.close();

                        // 强制刷新表格数据
                        this.$store.commit(
                            'departments/set',
                            this.$store.state.departments.tree.slice()
                        );

                    });
                }
                finally {
                    this.busy = false;
                }
            }
        },
    },
}
</script>
