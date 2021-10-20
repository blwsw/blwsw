export default {
    data() {
        return {
            form: {},
            rules: {},
            busy: false,
            modules: [],
        };
    },

    methods: {
        open() {
            this.$refs.popup.open({isModal: true});
            this.form = {};
            this.$refs.form.resetFields();
            return new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            });
        },

        onClickCancel() {
            this.$refs.popup.close();
            this._resolve(null);
        },

        onClickSave() {
            const save = (data) => {
                return this.$hd.runAsync(async (options) => {
                    options.loadingMsg = '正在保存，请稍候...';
                    options.showOk = true;
                    options.okMsg = '保存成功！';
                    options.errorMsg = ({message}) => `保存失败: ${message}`;

                    return await this.$hd.api.post({
                        url: 'uc/permissions',
                        body: data,
                    });
                });
            };

            this.$refs.form.validate(async (isValid) => {
                if (isValid) {
                    this.busy = true;

                    try {
                        this.form.id = await save(this.form);
                        this.$refs.popup.close();
                        this._resolve(this.form);
                    }
                    finally {
                        this.busy = false;
                    }
                }
                else {
                    return false;
                }
            });
        },
    },
};
