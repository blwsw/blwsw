export default {
    props: {
        group: {
            type: Object,
        },
    },

    computed: {
        dataset() {
            if (this.group.dict) {
                return this.group.dict.map(
                    ([code, name]) => ({code, name})
                );
            }
            else {
                return [];
            }
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
}
