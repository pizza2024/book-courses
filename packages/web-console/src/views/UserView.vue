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
      <ElTable border :data="state.tableData">
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
import { apiUserList, type User } from '@/api';
import { ElForm, ElFormItem, ElInput, ElTable, ElTableColumn } from 'element-plus';
import { keys } from 'lodash';
import moment from 'moment';
import { computed, onMounted, reactive } from 'vue';
const state = reactive<{tableData: User[]}>({
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
  apiUserList().then(res => {
    if (res.data.success) {
      state.tableData = res.data.users.map(user => {
        return {
          ...user,
          birthdate: moment(user.birthdate).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
        }
      });
    }
  })
})
</script>