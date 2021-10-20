<template>
    <div class="hd-split-page">
        <ManageDictGroup
            class="hd-page-section"
            @change-current="group = $event"
        />
        <ManageDict
            class="hd-page-section"
            :group="group"
        />
    </div>
</template>

<script src="./DataDictManage.js"></script>
