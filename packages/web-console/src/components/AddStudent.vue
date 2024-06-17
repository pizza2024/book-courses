<script setup lang="ts">
import { apiPostStudent } from '@/api';
import type { FormStudentType } from 'common';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const emit = defineEmits(['addSuccess'])
const dialogFormVisible = ref(false)
const DEFUALT_FORM_STUDENT:FormStudentType = {
  username: '',
  password: '',
  nickname: undefined,
  email: undefined,
  phone: undefined,
}
const formStudent = reactive<FormStudentType>(DEFUALT_FORM_STUDENT)
const formStudentRules = reactive<FormRules<typeof formStudent>>({
  username: [{ required: true, min: 6, message: '用户名需要6个字符以上', trigger: 'change' }],
  password: [{ required: true, min: 6, message: '密码需要6个字符以上', trigger: 'change' }],
})
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const addStudent = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    console.log(formStudent)
    apiPostStudent(formStudent).then(res => {
      if (res.data.success) {
        dialogFormVisible.value = false;
        emit('addSuccess')
      }
    })
  }
}
</script>
<template>
<ElButton @click="dialogFormVisible = true">New Student</ElButton>
<ElDialog v-model="dialogFormVisible" title="New student" @close="resetForm(formRef)">
  <ElForm :model="formStudent" ref="formRef" label-width="100px" :rules="formStudentRules">
    <ElFormItem v-for="(val, key) in formStudent" :key="key" :prop="key" :label="key">
      <ElInput :type="key === 'password' ? 'password' : ''" :placeholder="key" v-model="formStudent[key]"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="addStudent(formRef)">Submit</ElButton>
      <ElButton @click="resetForm(formRef)">reset</ElButton>
    </ElFormItem>
  </ElForm>
</ElDialog>
</template>import type { User } from '@element-plus/icons-vue';
, FormRules