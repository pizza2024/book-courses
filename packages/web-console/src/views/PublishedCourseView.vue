<template>
  <ElRow>
    <ElCol :span="12">
      <ElForm>
        <ElFormItem>
          <ElInput></ElInput>
        </ElFormItem>
      </ElForm>
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
import { apiPublishedCourseList } from '@/api';
import type { TypePublishedCourse } from 'common';
import { ElForm, ElFormItem, ElInput, ElTable, ElTableColumn } from 'element-plus';
import { keys } from 'lodash';
import moment from 'moment';
import { computed, onMounted, reactive } from 'vue';
const state = reactive<{tableData: TypePublishedCourse[]}>({
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
onMounted(() => {
  apiPublishedCourseList().then(res => {
    if (res.data.success) {
      state.tableData = res.data.rows.map(x => {
        return {
          ...x,
          startTime: moment(x.startTime).format('yyyy-MM-DD HH:mm:ss'),
          endTime: moment(x.endTime).format('yyyy-MM-DD HH:mm:ss')
        }
      });
    }
  })
})
</script>