<template>
    <div>
        <div class="el-table-header">
            数据字典管理
            <div>

                <el-button
                    type="primary"
                    :disabled="1 !== selectedGroups.length"
                    @click="onClickEdit"
                    size="small"
                >修改</el-button>
                <hd-search-button
                    type="primary"
                    @search="onSearch"
                    @toggle="isAdvancedSearch = $event"
                    @reset="onResetSearch"
                />
            </div>
        </div>

        <el-form
            :class="{'el-table-filters-compact': ! isAdvancedSearch}"
            inline
            :model="filters"
        >
            <el-form-item label="代码">
                <el-input
                    v-model="filters.code"
                    lazy
                    clearable
                    size="small"
                />
            </el-form-item>
            <el-form-item label="名称">
                <el-input
                    v-model="filters.name"
                    lazy
                    clearable
                    size="small"
                />
            </el-form-item>
        </el-form>

        <hd-data-grid
            select-mode="single"
            :columns="columns"
            :dataset="dataset"
            @change-selection="onSelectGroups"
            @change-current="$emit('change-current', $event)"
        />



        <DictCreatePopup ref="popupUpdate" @search="onSearch"/>
        <!--<DataDictUpdatePopup ref="popupUpdate" />-->
    </div>
</template>

<script src="./ManageDictGroup.js"></script>
