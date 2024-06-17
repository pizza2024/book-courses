<template>
  <ElRow style="margin: 0 0px 10px">
    <ElCol :span="12">
      <AddTeacher @add-success="queryTeachers"/>
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
import { apiTeacherList } from '@/api';
import AddTeacher from '@/components/AddTeacher.vue';
import type { ModalTeacher } from 'common';
import { ElTable, ElTableColumn } from 'element-plus';
import { keys } from 'lodash';
import { computed, onMounted, reactive } from 'vue';
const state = reactive<{tableData: ModalTeacher[]}>({
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
const queryTeachers = () => {
  apiTeacherList().then(res => {
    if (res.data.success) {
      state.tableData = res.data.rows;
    }
  })
}
onMounted(() => {
  queryTeachers()
})
</script>