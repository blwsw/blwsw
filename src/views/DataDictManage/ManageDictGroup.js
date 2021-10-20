import DictCreatePopup from './DictUpdatePopup.vue';

export default {
    components: {
        DictCreatePopup
    },
    async created() {

        this.onClickQuery();

    },
    computed: {
        dataset() {
           /* return this.$store.state.dicts.map(
                ([code, name, dict]) => ({code, name, dict})
            );*/
           return this.$data.dicts;

        },

        columns() {
            return [
                {
                    label: '代码',
                    prop: 'code',
                    align:"center",
                },
                {
                    label: '名称',
                    prop: 'name',
                    align:"left",
                },
            ];
        },
    },

    data() {
        return {
            filters: {hasDicts:true},
            isAdvancedSearch: false,
            selectedGroups: [],
            dicts:[]
        };
    },

    methods: {
        async onClickQuery() {
            const items = await this.$hd.api.get({
                url: '/uc/dictTypes',
                params: this.$data.filters
            });
            const dicts = items.map(({code, name, dicts}) => {
                dicts = dicts.map(({code, name}) => [code, name]);
                return [code, name, dicts];
            });

            this.$data.dicts=dicts.map(
                ([code, name, dicts]) => ({code, name, dict:dicts})
            );
        },
        async onClickDelete() {
            try {
                await this.$confirm(
                    '确定要删除吗？',
                    '提示',
                    {type: 'warning'},
                );

                await this.$hd.runAsync(async (options) => {
                    options.loadingMsg = '正在删除，请稍候...';
                    options.showOk = true;
                    options.okMsg = '删除成功！';
                    options.errorMsg = ({message}) => `删除失败: ${message}`;

                    const data = this.selectedGroups[0];

                    const del = () => this.$hd.api.delete({
                        url: 'uc/permissions/:id',
                        params: {id: data.id},
                    });

                    await del();
                    const i = this.dataset.indexOf(data);
                    this.dataset.splice(i, 1);
                });
            }
            catch {
                // 什么也不做
            }
        },

        async onClickNew() {
            const updatedData = await this.$refs.popupCreate.open();

            if (updatedData) {
                this.dataset.unshift(updatedData);
            }
        },

        async onClickEdit() {
            const data = this.selectedGroups[0];
            const updatedData = await this.$refs.popupUpdate.open(data);

            if (updatedData) {
                Object.assign(data, updatedData);
                this.$emit('change-current', {});
            }
        },

        onSearch() {
            this.onClickQuery();
        },

        onResetSearch() {
            this.filters = {hasDicts:true};
            this.onClickQuery();
        },

        onSelectGroups(groups) {
            this.selectedGroups = groups;
        },
    },
}
