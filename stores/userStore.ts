 import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: reactive({} as User),
      headerKey: new Date().getTime()
    }
  },
  getters: {
    getUser (state): User {
      const user = process.client && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : state.user
      return user as User
    },
    getHeaderKey (): number {
      return this.headerKey
    }
  },
  actions: {
    setUser (newUser: User) {
      Object.assign(this.user, newUser)      
      if(process.client) localStorage.setItem('user', JSON.stringify(newUser))
      this.headerKey = new Date().getTime()
    },
    clearUser () {
      Object.assign(this.user, {} as User)      
      if(process.client) localStorage.removeItem('user')
    }
  }
})