 import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {}
    }
  },
  getters: {
    getUser (): User {
      const user = process.client && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : this.user
      return user as User
    }
  },
  actions: {
    setUser (newUser: User) {
      Object.assign(this.user, newUser)
      if(process.client) localStorage.setItem('user', JSON.stringify(newUser))
    },
    clearUser () {
      Object.assign(this.user, null)
      if(process.client) localStorage.removeItem('user')
    }
  }
})