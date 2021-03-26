const cookieparser = process.server ? require('cookieparser') : undefined;

export const store = () => {
  return {
    user: null
  }
}

export const mutations = {
  saveUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  // vuex 在 nuxt 中特有的 action 方法，该方法会在服务端渲染期间自动调用，并且只会在服务端调用
  // 方法的作用是初始化容器数据，然后传递给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      // 从 cookie 中获取保存的用户信息,使用cookieParser将cookie字符串转化为对象
      const parsed = cookieparser.parse(req.headers.cookie)
      if (parsed.user) {
        try {
          user = JSON.parse(parsed.user)
        } catch(e) {
        }
      }
    }
    // 将 user 信息保存到 vuex 中
    commit('saveUser', user)
  }
}