<template>
    <div>
        <el-tabs
            v-if="group.dict"
            type="border-card"
        >
            <el-tab-pane :label="group.name">
                <hd-data-grid
                    select-mode="none"
                    :columns="columns"
                    :dataset="dataset"
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script src="./ManageDict.js"></script>
