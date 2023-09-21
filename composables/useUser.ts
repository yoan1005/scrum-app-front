import { reactive } from 'vue'

const user = reactive<User>({ id: 0, pseudo: 'unknow' })
  
export const useUser = () => {
    
    const setUser = (newUser: User) => {
      Object.assign(user, newUser)
    }
    
    const clearUser = () => {
      Object.assign(user, null)
    }
    
    const getUser = () => {
      return user
    }
    
    return {
      setUser,
      clearUser,
      getUser
    }
}
