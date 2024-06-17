<template>
  <ElRow style="margin: 0 0px 10px">
    <ElCol gutter="10px">
      <AddCourse @add-success="queryCourse"/>
    </ElCol>
  </ElRow>
  <ElRow>
    <ElCol :span="24">
      <ElTable border :data="state.tableData" stripe :size="'small'" highlight-current-row>
        <ElTableColumn :key="col.label" v-for="col in tableColumns" v-bind="col">
          <template v-if="col.prop === 'is_active'" #default="scope">
            <el-icon v-if="scope.row.is_active === 1"><Check /></el-icon>
            <el-icon v-else><Close /></el-icon>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCol>
  </ElRow>
</template>
<script setup lang="ts">
import { apiCourseList } from '@/api';
import AddCourse from '@/components/AddCourse.vue';
import type { ModalCourse } from 'common';
import { ElTable, ElTableColumn } from 'element-plus';
import { keys } from 'lodash';
import { computed, onMounted, reactive } from 'vue';
const state = reactive<{tableData: ModalCourse[]}>({
  tableData: []
})
const tableColumns = computed(() => {
  if (state.tableData.length === 0) return [];
  const obj = state.tableData[0]
  const col = keys(obj);
  return col.map(keyName => ({
    prop: keyName,
    label: keyName
  }))
})
const queryCourse = () => {
  apiCourseList().then(res => {
    if (res.data.success) {
      state.tableData = res.data.rows;
    }
  })
}
onMounted(() => {
  queryCourse()
})
</script>