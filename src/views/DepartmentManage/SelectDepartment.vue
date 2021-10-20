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
                :selected="[value]"
                select-mode="single"
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
            type: Number,
            default: null,
        },
    },

    model: {
        prop: 'value',
        event: 'change',
    },

    computed: {
        // {{{ current

        current() {
            if (null === this.value) {
                return null;
            }
            else {
                const map = this.$store.getters['departments/map'];
                return map[this.value] || null;
            }
        },

        // }}}
        // {{{ selectedFullname

        selectedFullname() {
            if (0 < this.selected.length) {
                const {name, pathName} = this.selected[0];
                return `${pathName}${name}`;
            }
            else {
                return '';
            }
        },

        // }}}
        // {{{ text

        text() {
            if (this.current) {
                const {name, pathName} = this.current;
                return `${pathName}${name}`;
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
        if (null !== this.value) {
            if (0 === this.$store.state.departments.tree.length) {
                await this.$store.dispatch('departments/load');
            }

            const map = this.$store.getters['departments/map'];
            const department = map[this.value];

            if (department) {
                this.selected = [department];
            }
        }
    },

    methods: {
        onClickConfirm() {
            if (0 < this.selected.length) {
                const selected = this.selected[0];
                this.$emit('select', selected);
                this.$emit('change', selected.id);
            }
            else {
                this.$emit('select', null);
                this.$emit('change', null);
            }

            this.$refs.popup.close();
        },
    },
}
</script>
