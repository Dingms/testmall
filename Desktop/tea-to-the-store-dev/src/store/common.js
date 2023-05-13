import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  persist: {
    key: 'user',
    storage: window.sessionStorage,
    paths: ['user']
  },
  state: () => ({
    user:null
  }),
  actions: {
    setUser(user) {
      this.user = user
    }
  }
})

export default useUserStore
