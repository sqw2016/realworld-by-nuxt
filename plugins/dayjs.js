import Vue from 'vue'
import dayjs from 'dayjs'

// 使用插件的方式 确保filter在Vue实例化之前注册
Vue.filter('date', (val, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(val).format(format))