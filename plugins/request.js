import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取上下文对象（query，params，req，res，app，store，）
export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      // 在发送请求之前做些什么
      // 注入请求头token
      config.headers = {
        Authorization: `Token ${user.token}`
      }
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}