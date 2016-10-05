import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuikit from 'vuikit'
import _ from 'lodash'

Vue.use(Vuikit) // or register individually
Vue.use(VueResource)
Vue.use(_)

var vue = new Vue({
    el: '#app',
    render: h => h(App)
})