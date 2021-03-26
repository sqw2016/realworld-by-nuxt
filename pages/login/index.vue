<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input required v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input required v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input required minlength="8" v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
// 仅在客户端加载包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex',
  middleware: 'notauthenticated',
  data() {
    return {
      user: {
        username: '',
        // {"username":"wsq","email":"wsq@realworld.com","password":"12345678"}
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit() {
      const fn = this.isLogin ? login : register
      try {
        // 验证登录
        const { data } = await fn({user: this.user})

        // 保存用户数据 vuex 和 cookie
        this.$store.commit('saveUser', data.user)
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')

      } catch(e) {
        this.errors = e.response.data.errors
      }
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  }
}
</script>

<style>

</style>