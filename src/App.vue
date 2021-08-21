<template>
  <section>
      <b-modal v-model="showModalHelp" hide-header hide-footer size="lg"> 
        <template>
          <div class="col-md-12 modal-border">
            <h4>Ajuda</h4>
          </div>
          <div class="col-md-12">
            <p style="font-size: 15px">Envie um email para <strong>haluga.imoveis@gmail.com</strong> ou preencha os campos abaixo que entraremos em contato.</p>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(formSubmit)">
                  <div class="row">
                      <div class="col-md-7">
                        <label class="label-line">Email</label>
                        <input v-model="form.email" class="input-line">   
                    </div>
                    <div class="col-md-4">
                        <label class="label-line">Contato</label>
                        <input v-model="form.phone" class="input-line">
                    </div>
                    <div v-if="showAlertDanger" class="col-md-12 mt-2">
                      <div class="alert alert-danger" role="alert">
                        Email ou contato devem ser preenchidos
                      </div>
                    </div>
                  </div>
                  <div class="mb-25">
                      <label class="label-line">Descrição</label>
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <textarea rows="7" style="border: 1px solid #9e9e9e" v-model="form.description" class="form-control"></textarea>
                        <span class="form-error">{{ errors[0] }}</span>
                      </ValidationProvider>
                  </div>
                    <div class="mb-25">
                      <button class="btn-general blue-light" type="submit">Enviar</button>
                    </div>
                </form>
            </ValidationObserver>
          </div>
          <hr>
          <div class="col-md-12">
              <div class="float-right">
                  <button class="btn-general blue" @click="closeModalHelp()"> Fechar </button>
              </div>
          </div>
        </template>
      </b-modal>

      <div v-if="$store.state.alert.status" :class="'alert-general ' + $store.state.alert.type">
          <!-- <div :class="'border-alert ' + $store.state.alert.type">
              <span>{{$store.state.alert.title}}</span>
          </div> -->
          <div>
              <img v-if="$store.state.alert.type === 'success'" height="27" width="27" src="./static/success.png">
              <img v-else height="27" width="27" src="./static/error.png">
              <span class="pl-1">{{$store.state.alert.message}}</span>
          </div>
      </div>
      
      <Menu/>
      <router-view></router-view>
      <div v-if="$store.state.spinner" class="load">
        <img height="400" src="./static/spinner.gif">
      </div>
      <template v-if="$route.name === 'CadastrarImovel' || $route.name === 'EditarImovel'">
        <div class="container mb-3">
          <div class="row">
            <div class="col-md-12">
              <button class="btn-contact float-right" @click.prevent="showModalHelp = true">
                <img height="27" width="27" src="./static/help.png">
              </button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div @click.prevent="showModalHelp = true" class="div-btn-contact">
          <button class="btn-contact" @click.prevent="showModalHelp = true">
            <img height="27" width="27" src="./static/help.png">
          </button>
        </div>
      </template>
  </section>
</template>

<script>
import Menu from './components/Menu.vue'
import './assets/style.css'
import { apiUrl } from './components/config'

export default {
  name: 'App',
  components: {
      ValidationObserver,
      ValidationProvider,
      Menu
  },
  data: () => ({
    showModalHelp: false,
    form: {
      email: null,
      phone: null,
      description: null
    },
    showAlertDanger: false
  }),
  methods: {
    closeModalHelp () {
      this.showModalHelp = false
      this.showAlertDanger = false
      this.form = {
        email: null,
        phone: null,
        description: null
      }
    },
    validateForm () {
      if (!this.form.email && !this.form.phone) {
        this.showAlertDanger = true
        return false
      }
      return true
    },
    formSubmit () {
      if (!this.validateForm()) {
        return false
      }
      this.showAlertDanger = true
      this.$store.dispatch('getSpinner', true)
      this.$http.post(apiUrl + 'help-create', this.form).then(() => {
        this.$store.dispatch('getAlertSuccess', 'Mensagem enviada com sucesso')
      }, error => {
        console.log(error)
        this.$store.dispatch('getAlertDanger', 'Não foi possível enviar a mensagem no momento')
      })
      this.closeModalHelp()
      this.$store.dispatch('getSpinner', false)
    }
  }
}
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Preenchimento obrigatório'
});

</script>
