import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VCalendar from 'v-calendar'
import moment from 'moment'
import BootstrapVue from  'bootstrap-vue'
import VueDatetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.config.productionTip = false

Vue.prototype.moment = moment
moment.locale('pt-BR')

Vue.use(VCalendar)
Vue.use(BootstrapVue)
Vue.use(VueDatetime)


new Vue({
  render: h => h(App),
}).$mount('#app')
