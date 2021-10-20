<template>
    <div ref="popup">
        <el-form
                class="hd-page"
                label-width="8em"
                :model="form"
                :rules="rules"
                ref="form"
                :disabled="busy"
        >
            <el-form-item
                    label="字典类型"
            >
                <el-select v-model="form.typeCode" :disabled="true">
                    <el-option v-for="option in dictTypes" v-bind:value="option.code">
                        {{ option.name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                    label="字典明细"
            >

                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="代码"
                            prop="code">
                        <template slot-scope="scope">
                            <el-input
                                    v-model.trim="scope.row.code"
                                    placeholder="请输入代码"
                                    maxlength="10"
                                    show-word-limit
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="名称"
                            prop="name">
                        <template slot-scope="scope">
                            <el-input
                                    v-model.trim="scope.row.name"
                                    placeholder="请输入名称"
                                    maxlength="10"
                                    show-word-limit
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="排序"
                            prop="sortSeq">
                        <template slot-scope="scope">
                            <el-input type="number"
                                    v-model.trim="scope.row.sortSeq"
                                    placeholder="请输入序号"
                                      maxlength="9"
                                      show-word-limit
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="tableAdd(scope.$index, scope.row)">新增</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="tableDel(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>


        </el-form>

        <template #foot>
            <el-button
                    type="primary"
                    :loading="busy"
                    @click="onClickSave"
                    size="small"
            >保存
            </el-button>
            <el-button
                    :loading="busy"
                    @click="onClickCancel"
                    size="small"
            >取消
            </el-button>
        </template>
    </div>
</template>

<script src="./DictUpdatePopup.js"></script>

<style scoped>
    .div-overlay>>>.div {
        width: 80vw;
        height: 80vh;
        overflow:auto;

    }
</style>
