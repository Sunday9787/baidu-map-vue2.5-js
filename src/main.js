import Vue from 'vue'
// import elementUI from 'element-ui'

import 'normalize.css'

// import 'element-ui/lib/theme-chalk/index.css'

import 'style/index.styl'

import store from './store'

import App from './App'

import _variable from 'style/export-js.styl'

console.log(_variable)

// Vue.use(elementUI)

Vue.config.productionTip = false

Vue.config.devtools = process.env.NODE_ENV == 'development'

/**
 * 初始化 vue 实例
 *
 * @param {import('vue').Component} Component
 * @param {string | HTMLElement} [el='#app']
 * @param {Omit<import('vue').ComponentOptions, 'render' | 'store'>} [options={}]
 */
export function createApp(Component, el = '#app', options = {}) {
  new Vue({
    render: h => h(App, [h(Component)]),
    store,
    ...options
  }).$mount(el)
}
