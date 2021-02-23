import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false
Vue.use(VCalendar)

new Vue({
  render: h => h(App),
}).$mount('#app')
