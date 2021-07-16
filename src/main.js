import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
// import VCalendar from 'v-calendar'
import moment from 'moment'
import router from './routes'
import BootstrapVue from  'bootstrap-vue'
// import VueDatetime from 'vue-datetime'
// import 'vue-datetime/dist/vue-datetime.css'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
// import VueLazyload from 'vue-lazyload'
// import UploadImage from 'vue-upload-image';
import vue2Dropzone from 'vue2-dropzone'
// import materialize from 'materialize-css'
import slick from 'slick-carousel'
// import jquery from 'jquery'
import VueSlickCarousel from 'vue-slick-carousel'

Vue.config.productionTip = false

Vue.prototype.moment = moment
moment.locale('pt-BR')

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(vue2Dropzone)
Vue.use(VueSlickCarousel)
Vue.use(slick)

const store = new Vuex.Store({
  state: {
    user: null,
    types: [
      {value: 'Apartamento'},
      {value: 'Casa'},
      {value: 'Casa de condomínio'},
      {value: 'Casa de Vila'},
      {value: 'Cobertura'},
      {value: 'Fazenda/Sítio/Chácara'},
      {value: 'Flat'},
      {value: 'Lote/Terreno'},
      {value: 'Sobrado'},
      {value: 'Consultório'},
      {value: 'Galpão/Depósito/Armazém'},
      {value: 'Garagem'},
      {value: 'Hotel/Motel/Pousada'},
      {value: 'Ponto comercial/Loja/Box'},
      {value: 'Prédio/Edifício inteiro'},
      {value: 'Sala/Conjunto'},
    ]
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
