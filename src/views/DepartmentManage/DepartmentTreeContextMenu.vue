<template>
    <div>
        <hd-context-menu ref="contextMenu" />
        <DepartmentCreatePopup ref="createPopup" />
    </div>
</template>

<script>
import DepartmentCreatePopup from './DepartmentCreatePopup.vue';

export default {
    components: {
        DepartmentCreatePopup,
    },

    inject: ['deleteDepartment'],

    methods: {
        open(event, data) {
            const menu = [
                [
                    {
                        name: '新建子部门',
                        onClick: () => {
                            this.$refs.createPopup.open('append', data);
                        },
                    },
                    {
                        name: '新建同级部门',
                        onClick: () => {
                            this.$refs.createPopup.open('insertBefore', data);
                        },
                    },
                ],
                [
                    {
                        name: '删除',
                        onClick: () => {
                            this.deleteDepartment(data.id);
                        },
                    },
                ],
            ];

            this.$refs.contextMenu.open(event, menu);
        },
    },
}
</script>
