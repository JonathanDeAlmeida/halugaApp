import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'
import router from './routes'
import BootstrapVue from  'bootstrap-vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
// import jquery from 'jquery'

Vue.config.productionTip = false

Vue.prototype.moment = moment
moment.locale('pt-BR')

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(vue2Dropzone)


const store = new Vuex.Store({
  state: {
    user: null,
    spinner: false,
    addressType: "city",
    city: "",
    district: "",
    street: "",
    intent: "rent",
    search: false,
    modalFilterShow: false,
    alert: {
      status: false,
      title: "",
      type: "",
      message: ""
    },
    types: [
      {value: ''},
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
    },
    setSpinner(state, data) {
      state.spinner = data
    },
    setAlertDanger(state, message) {
      state.alert.type = 'danger'
      state.alert.title = 'Erro'
      state.alert.message = message
      state.alert.status = true
      setTimeout(() => {
        state.alert.status = false
        state.alert.type = ""
        state.alert.title = ""
        state.alert.message = ""
      }, 7000)
    },
    setAlertSuccess(state, message) {
      state.alert.type = 'success'
      state.alert.title = 'Sucesso'
      state.alert.message = message
      state.alert.status = true
      setTimeout(() => {
        state.alert.status = false
        state.alert.type = ""
        state.alert.title = ""
        state.alert.message = ""
      }, 7000)
    },
    setIntent(state, data) {
      state.intent = data
    },
    setModalFilterShow(state, data) {
      state.modalFilterShow = data
    },
    setSearch(state, data) {
      state.search = data
    }
  },
  actions: {
    getUser(context, params) {
      context.commit('setUser', params)    
    },
    getAlertDanger(context, message) {
      context.commit('setAlertDanger', message)    
    },
    getAlertSuccess(context, message) {
      context.commit('setAlertSuccess', message)    
    },
    getSpinner(context, data) {
      context.commit('setSpinner', data)    
    },
    getIntent(context, data) {
      context.commit('setIntent', data)    
    },
    getModalFilterShow(context, data) {
      context.commit('setModalFilterShow', data)    
    },
    getSearch(context, data) {
      context.commit('setSearch', data)    
    },
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
