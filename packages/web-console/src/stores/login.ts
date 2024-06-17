import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const token = ref(localStorage.getItem('book.token'))
  function setToken(_token: string) {
    token.value = _token
  }

  const username = ref(localStorage.getItem('book.username'))
  function setUsername(_username: string) {
    username.value = _username
  }

  const loginType = ref();
  function setLoginType(_logintype: string) {
    loginType.value = _logintype;
  }
  return { token, setToken, username, setUsername,loginType,setLoginType }
})
