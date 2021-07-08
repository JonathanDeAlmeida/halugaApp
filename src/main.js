import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VCalendar from 'v-calendar'
import moment from 'moment'
import router from './routes'
import BootstrapVue from  'bootstrap-vue'
import VueDatetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import UploadImage from 'vue-upload-image';
import vue2Dropzone from 'vue2-dropzone'

Vue.config.productionTip = false

Vue.prototype.moment = moment
moment.locale('pt-BR')

Vue.use(VCalendar)
Vue.use(BootstrapVue)
Vue.use(VueDatetime)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueLazyload)
Vue.use(UploadImage)
Vue.use(vue2Dropzone)

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    getUser(context, params) {
      context.commit('setUser', params)    
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
