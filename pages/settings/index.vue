<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser()">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input  v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr />
          <!-- 登出 -->
          <button @click="loginOut()" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { updateUser } from '@/api/user'

export default {
  name: 'SettingsIndex',
  middleware: 'authenticated',
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async updateUser() {
      const { data } = await updateUser({user: this.user})
      this.$store.commit('saveUser', data.user)
      this.$router.push({
        name: 'profile',
        params: {
          username: data.user.username
        }
      })
    },
    loginOut() {
      // 删除 user 的 cookie，清空 store 中的 user 跳转到登录页
      Cookie.remove('user')
      this.$store.commit('saveUser', null)
      this.$router.push('/login')
    }
  },
  mounted() {
    this.user = {...this.$store.state.user}
  }
}
</script>

<style>

</style>