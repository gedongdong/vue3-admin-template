import { defineStore } from 'pinia'
import { getCookies, setCookies, removeCookies } from '@/utils/storage'
import { resetRouter } from '@/router/index'
import { useTagsViewStore } from '@/store/tagsView'

const TokenKey = 'Fanqie-Token'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getCookies(TokenKey), // 登录信息
      userInfo: getCookies('userInfo'), // 用户信息
      roles: [] // 路由权限
    }
  },
  actions: {
    setToken(token) {
      this.token = token
      setCookies(TokenKey, token)
    },

    setUserInfo(userInfo) {
      this.userInfo = userInfo
      setCookies('userInfo', userInfo)
    },
    getRoles() {
      this.roles = ['admin'].concat(this.userInfo.roles)
      return this.roles
    },

    logout() {
      const tagsViewStore = useTagsViewStore()
      return new Promise((resolve) => {
        this.token = ''
        this.roles = []
        removeCookies(TokenKey)
        resetRouter()
        tagsViewStore.delAllViews()
        resolve()
      })
    }
  }
})
