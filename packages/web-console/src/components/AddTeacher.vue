<script setup lang="ts">
import { apiPostTeacher } from '@/api';
import type { FormTeacherType } from 'common';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const emit = defineEmits(['addSuccess'])
const dialogFormVisible = ref(false)
const DEFAULT_FORM_TEACHER:FormTeacherType = {
  username: '',
  password: '',
  nickname: undefined,
  email: undefined,
  phone: undefined,
}
const formTeacher = reactive<FormTeacherType>(DEFAULT_FORM_TEACHER)
const formTeacherRules = reactive<FormRules<typeof formTeacher>>({
  username: [{ required: true, min: 6, message: '用户名需要6个字符以上', trigger: 'change' }],
  password: [{ required: true, min: 6, message: '密码需要6个字符以上', trigger: 'change' }],
})
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const addTeacher = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    console.log(formTeacher)
    apiPostTeacher(formTeacher).then(res => {
      if (res.data.success) {
        dialogFormVisible.value = false;
        emit('addSuccess')
      }
    })
  }
}
</script>
<template>
<ElButton @click="dialogFormVisible = true">New Teacher</ElButton>
<ElDialog v-model="dialogFormVisible" title="New Teacher" @close="resetForm(formRef)">
  <ElForm :model="formTeacher" ref="formRef" label-width="100px" :rules="formTeacherRules">
    <ElFormItem v-for="(val, key) in formTeacher" :key="key" :prop="key" :label="key">
      <ElInput :type="key === 'password' ? 'password' : ''" :placeholder="key" v-model="formTeacher[key]"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="addTeacher(formRef)">Submit</ElButton>
      <ElButton @click="resetForm(formRef)">reset</ElButton>
    </ElFormItem>
  </ElForm>
</ElDialog>
</template>