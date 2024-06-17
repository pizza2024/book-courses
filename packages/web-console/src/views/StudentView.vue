<template>
  <ElRow style="margin: 0 0px 10px">
    <ElCol gutter="10px">
      <ElButton @click="dialogFormVisible = true">Add Student</ElButton>
      <ElDialog v-model="dialogFormVisible" title="新建学生信息" @close="resetForm(formRef)">
        <ElForm :model="formStudent" ref="formRef" label-width="100px">
          <ElFormItem v-for="(val, key) in formStudent" :key="key" :prop="key" :label="key">
            <ElInput :type="key === 'password' ? 'password' : ''" :placeholder="key" v-model="formStudent[key]"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary">Submit</ElButton>
            <ElButton @click="resetForm(formRef)">reset</ElButton>
          </ElFormItem>
        </ElForm>
      </ElDialog>
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
import { apiStudentList } from '@/api';
import type { ModalStudent, User } from 'common';
import { ElButton, ElForm, ElFormItem, ElInput, ElTable, ElTableColumn, type FormInstance } from 'element-plus';
import { keys } from 'lodash';
import { computed, onMounted, reactive, ref } from 'vue';
type FormStudentType = Omit<User, 'id'> & { password: string };
const state = reactive<{tableData: ModalStudent[]}>({
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
  apiStudentList().then(res => {
    if (res.data.success) {
      state.tableData = res.data.rows;
    }
  })
})
const dialogFormVisible = ref(false)
const DEFUALT_FORM_STUDENT:FormStudentType = {
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
}
const formStudent = reactive<FormStudentType>(DEFUALT_FORM_STUDENT)
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>