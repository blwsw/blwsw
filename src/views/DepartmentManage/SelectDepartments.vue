<template>
    <span>
        <el-button
            type="text"
            @click="$refs.popup.open({isModal: true})"
        >{{ text }}</el-button>

        <div
            ref="popup" title="选择部门" modal
        >
            <div
                direction="row"
                align-items="center"
                justify-content="space-between"
            >
                <div>{{ selectedFullname }}</div>
            </div>
            <DepartmentTable
                :data="$store.state.departments.tree"
                :selected="value"
                select-mode="multiple"
                @change-selection="selected = $event"
            />
            <div
                direction="row"
                align-items="center"
                justify-content="center"
            >
                <div>
                    <el-button
                        type="primary"
                        @click="onClickConfirm"
                        size="small"
                    >确定</el-button>
                </div>
                <div>
                    <el-button
                        @click="$refs.popup.close()"
                        size="small"
                    >取消</el-button>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import DepartmentTable from './DepartmentTable.vue';

export default {
    components: {
        DepartmentTable,
    },

    props: {
        placeholder: {
            type: String,
            default: '请选择...',
        },
        value: {
            type: Array,
            default: () => [],
        },
    },

    model: {
        prop: 'value',
        event: 'change',
    },

    computed: {
        // {{{ current

        current() {
            const map = this.$store.getters['departments/map'];
            return this.value.map((id) => map[id]).filter((e) => e);
        },

        // }}}
        // {{{ selectedFullname

        selectedFullname() {
            if (0 < this.selected.length) {
                return this.selected.map(({name}) => name).join();
            }
            else {
                return '';
            }
        },

        // }}}
        // {{{ text

        text() {
            if (0 < this.current.length) {
                return this.current.map(({name}) => name).join();
            }
            else {
                return this.placeholder;
            }
        },

        // }}}
    },

    data() {
        return {
            selected: [],
        };
    },

    async created() {
        if (0 === this.$store.state.departments.tree.length) {
            await this.$store.dispatch('departments/load');
        }

        const map = this.$store.getters['departments/map'];
        this.selected = this.value.map((id) => map[id]).filter((e) => e);
    },

    methods: {
        onClickConfirm() {
            const ids = this.selected.map(({id}) => id);
            this.$emit('select', this.selected);
            this.$emit('change', ids);
            this.$refs.popup.close();
        },
    },
}
</script>
